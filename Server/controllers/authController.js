const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getDB } = require('../config/db');
const User = require('../models/User');

async function registerUser(req, res) {
    const { firstname, lastname, email, phone, password, confirmPassword } = req.body;

    if (!firstname || !lastname || !email || !phone || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords must match' });
    }

    try {
        const db = getDB();
        const usersCollection = db.collection('users');
        
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User(firstname, lastname, email, phone, password);
        await user.hashPassword();
        const insertedUser = await usersCollection.insertOne(user);

        const token = jwt.sign({ id: insertedUser.insertedId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const db = getDB();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { registerUser, loginUser };

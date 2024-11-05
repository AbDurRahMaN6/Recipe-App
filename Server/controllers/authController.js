const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getDB } = require('../config/db');
const bcrypt = require('bcrypt');

// async function registerUser(req, res) {
//     const { firstname, lastname, email, password } = req.body;

//     if (!firstname || !lastname || !email || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         const db = getDB();
//         const usersCollection = db.collection('users');

//         // Check if user already exists
//         const existingUser = await usersCollection.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const user = new User(firstname, lastname, email, password);
//         await user.hashPassword(); // Hash the password
//         await usersCollection.insertOne(user); // Insert user into the collection

//         // Generate JWT token
//         const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         return res.status(201).json({ message: 'User registered successfully', token });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// async function loginUser(req, res) {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }

//     try {
//         const db = getDB();
//         const usersCollection = db.collection('users');
//         const user = await usersCollection.findOne({ email });

//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         return res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


async function registerUser(req, res) {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const db = getDB();
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User(firstname, lastname, email, password);
        await user.hashPassword();
        const insertedUser = await usersCollection.insertOne(user);

        // Generate JWT token with user _id
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

        // Generate JWT token with user _id
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Export the functions to use in your routes
module.exports = {
    registerUser,
    loginUser
};

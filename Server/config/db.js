const mongodb = require('mongodb');

let db;

async function connectDB() {
    const client = new mongodb.MongoClient(process.env.MONGO_URI, {  });
    
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
}

module.exports = { connectDB, getDB };

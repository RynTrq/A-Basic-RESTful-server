const mongoose = require('mongoose');

async function connectDB() {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('Set MONGO_URI before starting the notes API.');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB.');
}

module.exports = connectDB;

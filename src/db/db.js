const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect("mongodb+srv://RynTrq:d7d5thRpEwei52Br@cluster1.wk4stpc.mongodb.net/MyDatabase1")
    console.log("Connected to the database succefully.")
}

module.exports = connectDB;
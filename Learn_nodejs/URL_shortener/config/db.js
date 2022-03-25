const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error:", error.msg);
        process.exit(1);
    }
};

module.exports = connectDB;

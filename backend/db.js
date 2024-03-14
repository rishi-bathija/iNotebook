const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to mongo successfully");
    } catch (err) {
        console.error("Error connecting to mongo:", err);
    }
}

module.exports = connectToMongo;
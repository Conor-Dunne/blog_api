const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        mongoose.set("strictQuery", false);
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("database sucessfully connected", connect.connection.host)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;
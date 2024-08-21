const mongoose = require('mongoose');
const { MONGOODB_URI } = require('./config');

const connectDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(MONGOODB_URI);

        console.log(conn.connection.host);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;
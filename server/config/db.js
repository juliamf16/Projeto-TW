const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB conectado');
    } catch (err) {
        console.error('Erro ao conectar MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
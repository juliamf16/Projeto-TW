const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telemovel: { type: String, required: true },
    indicativo: { type: String, required: true },
    assunto: { type: String, required: true },
    mensagem: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
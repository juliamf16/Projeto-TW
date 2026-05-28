const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const router = express.Router();

router.post('/', async (req, res) => {
    const { nome, email, telemovel, indicativo, assunto, mensagem } = req.body;
    if (!nome || !email || !telemovel || !indicativo || !assunto || !mensagem) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        const newMessage = new ContactMessage({
            nome, email, telemovel, indicativo, assunto, mensagem
        });
        await newMessage.save();
        res.status(201).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao guardar a mensagem' });
    }
});

module.exports = router;
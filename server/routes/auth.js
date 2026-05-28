const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { nome, email, password } = req.body;
    if (!nome || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já registado!' });
        }

        const userCount = await User.countDocuments();
        const role = userCount === 0 ? 'admin' : 'user';

        const user = new User({ nome, email, password, role });
        await user.save();
        res.status(201).json({ message: 'Utilizador registado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor!' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Conta inexistente na base de dados!' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(401).json({ message: 'Credenciais inválidas!' });
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
        res.json({ token, user: { id: user._id, nome: user.nome, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

router.get('/me', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token não fornecido' });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Utilizador não encontrado' });
        res.json({ user });
    } catch (err) {
        res.status(401).json({ message: 'Token inválido' });
    }
});

module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para verificar se é admin
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') return res.status(403).json({ message: 'Acesso negado' });
        next();
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Listar todos os utilizadores (apenas admin)
router.get('/', authMiddleware, isAdmin, async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

// Ver o próprio perfil
router.get('/me', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

// Editar o próprio perfil
router.put('/me', authMiddleware, async (req, res) => {
    const { nome, email, password } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (nome) user.nome = nome;
        if (email) user.email = email;
        if (password) user.password = password; // será hasheado pelo pre-save
        await user.save();
        res.json({ message: 'Perfil atualizado', user: { id: user._id, nome: user.nome, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar perfil' });
    }
});

module.exports = router;
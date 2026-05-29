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

// VEr todos os utilizadores
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

// Atualizar utilizadores
router.put('/:id', authMiddleware, isAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'Utilizador não encontrado' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar' });
    }
});

// Remover utilizadores
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilizador não encontrado' });
        // Impedir que o admin remova a si próprio (opcional, mas recomendado)
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({ message: 'Não pode remover a sua própria conta' });
        }
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Utilizador removido com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao remover utilizador' });
    }
});

module.exports = router;
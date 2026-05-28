require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db.js');
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contact', require('./routes/contact'));

app.get('/', (req, res) => {
    res.send('API do CACA a correr. React na porta 3000.');
});

app.listen(PORT, () => console.log(`Servidor backend na porta ${PORT}`));
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Registo() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(nome, email, password);
            alert('Registo bem-sucedido! Faça login.');
            navigate('/login');
        } catch (err) {
            alert('Erro no registo: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '100px auto' }}>
            <h2>Registo</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required /><br />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
                <button type="submit">Registar</button>
            </form>
            <p>Já tem conta? <Link to="/login">Faça login</Link></p>
        </div>
    );
}
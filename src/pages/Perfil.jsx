import "./styles.css";

import mediaLogo from "../components/Header/media/logo.png"
import Footer from "../components/Footer";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Perfil() {
    const { user, updateProfile } = useAuth();
    const [nome, setNome] = useState(user?.nome || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};
        if (nome !== user.nome) data.nome = nome;
        if (email !== user.email) data.email = email;
        if (password) data.password = password;
        await updateProfile(data);
        alert('Perfil atualizado');
        navigate('/');
    };

    return (
        <>
        
        <header className="login-header">
            <div className="logo">
                <Link to="/"><img src={mediaLogo} alt="Centro Académico Clínico dos Açores" /></Link>
            </div>
        </header>

        <div className="perfil-page">
            <div className="perfil-box">
                <h2>Atualizar Perfil</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={nome} 
                        onChange={e => setNome(e.target.value)} 
                        placeholder="Nome completo" 
                        required
                    />
                    <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder="Email" 
                        required
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Nova password (deixar vazio para manter)" 
                    />
                    <button type="submit">Guardar alterações</button>
                </form>
            </div>
        </div>


        <Footer />
        </>
    );
}
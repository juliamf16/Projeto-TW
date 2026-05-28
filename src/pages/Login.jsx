import "./Login_Registo.css";
import mediaLogo from "../components/Header/media/logo.png"
import Footer from "../components/Footer";


import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert('Erro no login. Verifique as credenciais.');
    }
  };

return (
    <>
        <header className="login-header">
            <div className="logo">
                <img src={mediaLogo} alt="Centro Académico Clínico dos Açores" />
            </div>
        </header>

        <div className="login-page">
            <div className="login-box">
                <h2>Iniciar Sessão</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button type="submit">Entrar</button>
                </form>
                <p>Não tem conta? <Link to="/registo">Registe-se</Link></p>
            </div>
        </div>

        <Footer />
    </>
  );
}
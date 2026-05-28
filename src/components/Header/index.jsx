import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import mediaLogo from "./media/logo.png";
import userLogo from "./media/user_logo.png";
import React, { useEffect, useRef } from "react";

export default function Header() {
    const { user, logout } = useAuth();
    const menuToggleRef = useRef(null);

    // Fechar o menu hamburger ao clicar num link
    useEffect(() => {
        const closeMenu = () => {
            if (menuToggleRef.current) {
                menuToggleRef.current.checked = false;
            }
        };

        const links = document.querySelectorAll('.navbar a, .navbar .btn-login, .navbar button');
        links.forEach(link => link.addEventListener('click', closeMenu));
        
        return () => {
            links.forEach(link => link.removeEventListener('click', closeMenu));
        };
    }, []);

    return (
        <header>
            <div className="logo">
                <a href="/">
                    <img src={mediaLogo} alt="Centro Académico Clínico dos Açores" />
                </a>
            </div>

            <input
                type="checkbox"
                id="menu-toggle"
                className="menu-toggle"
                aria-label="Abrir menu de navegação"
                ref={menuToggleRef}
            />

            <label htmlFor="menu-toggle" className="hamburger">
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
            </label>

            <nav className="navbar" aria-label="Menu principal">
                <a href="#apresentacao">Apresentação</a>
                <a href="#noticias">Notícias</a>
                <a href="#investigacao">Investigação</a>
                <a href="#eventos">Eventos</a>
                <a href="#parceiros">Parceiros</a>
                <a href="#oportunidades">Oportunidades</a>
                <a href="#contactos">Contactos</a>
                
                {user ? (
                    <>
                        <span className="user-welcome">Olá, {user.nome}</span>
                        <Link to="/perfil">Perfil</Link>
                        {user.role === 'admin' && <Link to="/utilizadores">Gerir Utilizadores</Link>}
                        <button className="btn-login" onClick={logout}>
                            <img src={userLogo} alt="Sair" /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn-login">
                            <img src={userLogo} alt="Login" /> Iniciar sessão
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}
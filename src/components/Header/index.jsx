import "./Header.css"
import { useEffect } from "react"
import mediaLogo from "./media/logo.png"
import userLogo from "./media/user_logo.png"

export default function Header() {
    useEffect(() => {
        fecharMenuHamburger();
    }, []);
  
    function fecharMenuHamburger() {
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', function () {
                document.getElementById('menu-toggle').checked = false;
            });
        });
    }
    return (
        <header>
            <div className="logo">
                <a href="#apresentacao"><img src={mediaLogo} alt="Centro Académico Clínico dos Açores" /></a>
            </div>

            <input type="checkbox" id="menu-toggle" className="menu-toggle" aria-label="Abrir menu de navegação"></input>

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
                <button className="btn-login">
                    <img src={userLogo} alt="Logo de utilizador"></img>Iniciar sessão
                </button>
            </nav>
        </header>
    );
}
import "./Header.css"

import mediaLogo from "./media/logo.png"

export default function Header(){
    return(
        <header>
            <div className="logo">
                <a href="#apresentacao"><img src={mediaLogo} alt="Centro Académico Clínico dos Açores"/></a>
            </div>

            <input type="checkbox" id="menu-toggle" className="menu-toggle" aria-label="Abrir menu de navegação"></input>

            <label for="menu-toggle" className="hamburger">
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
            </nav>
        </header>
    );
}
import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Apresentacao from "./components/Apresentacao";
import Noticias from "./components/Noticias";
import Investigacao from "./components/Investigacao";
import Eventos from "./components/Eventos";
import Oportunidades from "./components/Oportunidades";
import Parceiros from "./components/Parceiros";
import Contactos from "./components/Contactos";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { db } from "./js/indexeddb";

function App() {
    useEffect(() => {
        db.iniciarBD()
    });

    return (
        <div className="container">
            <ScrollToTop />
            <Header />
            <main>
                <Apresentacao />
                <hr className="linebreak" />
                <Noticias />
                <hr className="linebreak" />
                <Investigacao />
                <hr className="linebreak" />
                <Eventos />
                <hr className="linebreak" />
                <Parceiros />
                <hr className="linebreak" />
                <Oportunidades />
                <hr className="linebreak" />
                <Contactos />
            </main>
            <Footer />
        </div>
    );
}

export default App;
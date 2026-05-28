// App.js
import React, { useState, useEffect } from "react";
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
import { db } from "./js/indexeddb"; // ajuste o caminho

function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    db.iniciarBD()
      .then(() => {
        console.log("Base de dados pronta");
        setDbReady(true);
      })
      .catch((err) => {
        console.error("Erro ao iniciar BD:", err);
        // Mesmo com erro, pode mostrar a app mas a newsletter não funcionará
        setDbReady(true);
      });
  }, []);

  if (!dbReady) {
    return <div>A carregar...</div>; // ou um spinner
  }

  return (
    <div className="container">
      <Header />
      <main>
        <button id="toTop" className="to-top" aria-label="Voltar ao topo da página" hidden>↑</button>
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
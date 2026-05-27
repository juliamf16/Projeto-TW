import "./App.css"

import mediaLogo from "./media/logo.png"

import uac from "./media/UAc-2.png"
import hdes from "./media/HDES-2.png"
import usism from "./media/USISM-2.png"
import inova from "./media/INOVA-2.png"
import oportunidadeFoto from "./media/oportunidades.jpg"


import Header from "./components/Header"
import Apresentacao from "./components/Apresentacao"
import Noticias from "./components/Noticias"
//import Investigacao from "./components/Investigacao"
import Footer from "./components/Footer"


function App() {
  return (
    <body>
      <div class="container">
        <Header/>
        <main>
          <button id="toTop" className="to-top" aria-label="Voltar ao topo da página" hidden>↑</button>
          <Apresentacao/>
          <hr className="linebreak"></hr>
          <Noticias/>
        </main>
        <Footer/>  
      </div>
    </body>
  );
}

export default App;

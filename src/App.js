import "./App.css"

import mediaLogo from "./media/logo.png"
import uniFoto from "./media/universidade.png"
import palestrante from "./media/palestrante-2.png"
import palestra from "./media/palestra-2.png"
import poster from "./media/Poster-2.png"
import uac from "./media/UAc-2.png"
import hdes from "./media/HDES-2.png"
import usism from "./media/USISM-2.png"
import inova from "./media/INOVA-2.png"
import oportunidadeFoto from "./media/oportunidades.jpg"


import Header from "./components/Header"
import Apresentacao from "./components/Apresentacao"
import Footer from "./components/Footer"


function App() {
  return (
    <body>
      <div class="container">
        <main>
          <Header/>
        </main>
        <Footer/>  
      </div>
    </body>
  );
}

export default App;

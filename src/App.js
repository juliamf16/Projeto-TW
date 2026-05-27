import "./App.css"
import Header from "./components/Header"
import Apresentacao from "./components/Apresentacao"
import Noticias from "./components/Noticias"
import Investigacao from "./components/Investigacao"
import Eventos from "./components/Eventos"
import Oportunidades from "./components/Oportunidades"
import Parceiros from "./components/Parceiros"
import Contactos from "./components/Contactos"
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
          <hr className="linebreak"></hr>
          <Investigacao/>
          <hr className="linebreak"></hr>
          <Eventos/>
          <hr className="linebreak"></hr>
          <Parceiros/>
          <hr className="linebreak"></hr>
          <Oportunidades/>
          <hr className="linebreak"></hr>
          <Contactos/>
        </main>
        <Footer/>  
      </div>
    </body>
  );
}

export default App;

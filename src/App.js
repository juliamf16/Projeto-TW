import "./App.css"
import Header from "./components/Header"
import Eventos from "./components/Eventos"
import Oportunidades from "./components/Oportunidades"
import Parceiros from "./components/Parceiros"
import Contactos from "./components/Contactos"

function App() {
  return (
    <div>
    <Header/>
    <Eventos/>
    <Parceiros/>
    <Oportunidades/>
    <Contactos/>
    </div>
  );
}

export default App;

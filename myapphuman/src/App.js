
import './App.css'
import TablaPrincipal from './Components/TablaPrincipal/TablaPrincipal';
import TablaDerecha from './Components/TablaDerecha/TablaDerecha';
import Sidebar from './Components/Sidebar/Sidebar';
import TablaUsers from './Components/TablaUsers/TablaUsers';
import TablaProductos from "./Components/TablaProductos/TablaProductos";
import { Route, Routes} from "react-router-dom";

function App() {
  return (

   
    <div className="App">
      <div className="AppHuman">

        <Sidebar/>

        <Routes>
          <Route path="/" element= {  <TablaPrincipal/> }/>
          <Route path="/actualizaciones" element= {  <TablaDerecha/>   }/>
          <Route path="/users" element= {  <TablaUsers/>   }/>
          <Route path="/products" element= {  <TablaProductos/>   }/>
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
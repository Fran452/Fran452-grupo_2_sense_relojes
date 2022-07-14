
import './App.css'
import TablaPrincipal from './Components/TablaPrincipal/TablaPrincipal';
import TablaDerecha from './Components/TablaDerecha/TablaDerecha';
import Sidebar from './Components/Sidebar/Sidebar';
import TablaUsers from './Components/TablaUsers/TablaUsers';
import Tabla from "./Components/Tabla/Tabla";
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
          <Route path="/products" element= {  <Tabla/>   }/>
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
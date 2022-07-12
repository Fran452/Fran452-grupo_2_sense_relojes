
import './App.css'
import TablaPrincipal from './Components/TablaPrincipal/TablaPrincipal';
import TablaDerecha from './Components/TablaDerecha/TablaDerecha';
import Sidebar from './Components/Sidebar/Sidebar';
import TablaUsers from './Components/TablaUsers/TablaUsers';
import Tabla from "./Components/Tabla/Tabla"

function App() {
  return (
    <div className="App">
      <div className="AppHuman">
        <Sidebar/>
        <TablaPrincipal/>
        <TablaDerecha/>
        <TablaUsers/>
        <Tabla/>
      </div>
    </div>
  );
}

export default App;
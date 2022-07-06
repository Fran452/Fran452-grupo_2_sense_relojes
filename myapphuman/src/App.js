
import './App.css'
import TablaPrincipal from './Components/TablaPrincipal/TablaPrincipal';
import TablaDerecha from './Components/TablaDerecha/TablaDerecha';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="AppHuman">
        <Sidebar/>
        <TablaPrincipal/>
        <TablaDerecha/>
      </div>
    </div>
  );
}

export default App;
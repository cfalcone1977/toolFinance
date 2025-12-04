import Menu from './components/Menu';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Calculo from '../pages/calculo';
import Consulta from '../pages/Consulta';
import Denunciados from '../pages/Denunciados';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Calculo/>}/>
      <Route path='/Consulta' element={<Consulta/>}/>
      <Route path='/Denunciados' element={<Denunciados/>}/>
    </Routes>
  );
}

export default App




import Menu from './components/Menu';
import './App.css';
import FormCheques from './components/calculo/FormCheques';
import FormTasas from './components/calculo/FormTasas';
import {TasasProvider} from './context/TasasContext';

function App() {

  return (
    <>
      <Menu/>
      <TasasProvider>
       <FormTasas/>
       <FormCheques/>
      </TasasProvider>

    </>
  )
}

export default App

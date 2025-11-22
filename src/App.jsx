import Menu from './components/Menu';
import './App.css';
import FormCheques from './components/calculo/FormCheques';
import FormTasas from './components/calculo/FormTasas';
import SideCheques from './components/calculo/SideCheques';
import {TasasProvider} from './context/TasasContext';
import { ResultadosProvider } from './context/SideContext';

function App() {

  return (
    <>
      <Menu/>
      <TasasProvider>
       <FormTasas/>
       <section id='contenedorChequesCalculo'>
         <ResultadosProvider>
          <FormCheques/>
          <SideCheques/>
         </ResultadosProvider> 
       </section>
      </TasasProvider>

    </>
  )
}

export default App

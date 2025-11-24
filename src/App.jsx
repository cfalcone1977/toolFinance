import Menu from './components/Menu';
import './App.css';
import FormCheques from './components/calculo/FormCheques';
import FormTasas from './components/calculo/FormTasas';
import SideCheques from './components/calculo/SideCheques';
import ResultadoCheques from './components/calculo/ResultadoCheques';
import { TasasProvider } from './context/TasasContext';
import { ResultadosProvider } from './context/SideContext';
import { ChequesProvider } from './context/ChequesContext';
import { TotalesContext, TotalesProvider } from './context/TotalesContext';

function App() {

  return (
    <>
      <Menu/>
      <TasasProvider>
        <FormTasas/>
        <ResultadosProvider>
        <ChequesProvider>
        <TotalesProvider>
        <section id='contenedorChequesCalculo'>
           <FormCheques/>
           <SideCheques/>
        </section>
           <ResultadoCheques/>
        </TotalesProvider>
        </ChequesProvider>   
       </ResultadosProvider>        
      </TasasProvider>
    </>
  )
}

export default App

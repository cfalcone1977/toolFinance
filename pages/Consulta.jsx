import Menu from '../src/components/Menu';
import Footer from '../src/components/Footer';
import Datoscuit from '../src/components/consulta/Datoscuit';
import Datoscliente from '../src/components/consulta/Datoscliente';
import Situacionbancos from '../src/components/consulta/Situacionbancos';
import Detallecheques from '../src/components/consulta/Detallecheques';
import { DatosClienteProvider } from '../src/context/DatosClienteContext';

import "./consulta.css";



function Consulta() {
  return (
    <>
      <Menu/>
      <DatosClienteProvider>
      <section id='contenedorDatos'>
        <Datoscuit />
        <Datoscliente />
      </section>
      <section id='situacionBancosCheques'>
        <Situacionbancos/>
        <Detallecheques/>
      </section>
      </DatosClienteProvider>
      <Footer/>
    </>  
  )
}

export default Consulta
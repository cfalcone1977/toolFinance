import React from 'react'
import Menu from '../src/components/Menu';
import Datoscheque from '../src/components/denunciados/Datoscheque';
import Footer from '../src/components/Footer';

function Denunciados() {
  return (
    <>
      <Menu/>
        <Datoscheque/>
      <Footer/>
    </>  
  )
}

export default Denunciados
import React from 'react'
import "./footer.css"

function Footer() {
  return (
    <>
     <article id='contenedorFooter'>
       <section id='footerIzquierda'>
          <img src="/public/twitter-x.svg" alt="twitterX" className='iconos'/>
          <img src="../public/youtube.svg" alt="youTube" className='iconos'/>
          <img src="../public/instagram.svg" alt="instagram" className='iconos'/>
          <img src="../public/facebook.svg" alt="facebook" className='iconos'/>          
       </section>   
       <section id='footerCentral'>
          <pre>Diseñado, pensado y construido por: Cristian Falcone.</pre>
          <pre>© Noviembre 2025.</pre>        
       </section>   
       <section id='footerDerecha'>
          <img src="../public/linkedin.svg" alt="linkedin" className='iconos'/>                
          <img src="../public/whatsapp.svg" alt="whatsapp" className='iconos'/>        
       </section>                
     </article>
    </>
  )
}

export default Footer
import React from 'react'
import './Menu.css'
import { Link } from 'react-router-dom'
function Menu() {
  return (
    <>
      <nav id='menuPrincipal'>
            <ul id='listadoMenu'>
                <li><Link to="/">Calculo</Link></li>
                <li><Link to="/Consulta">Consulta</Link></li>
                <li><Link to="/Denunciados">DENUNCIADOS</Link></li>
                <li id='donar'><Link>DONAR</Link></li>
            </ul>
      </nav>
    </>
  )
}

export default Menu
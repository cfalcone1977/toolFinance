import React from 'react'
import "./sideCheques.css";
import { useContext } from 'react';
import { SideContext } from '../../context/SideContext';

function SideCheques() {
  const { calculos, setCalculos } = useContext(SideContext);
  console.log("Calculos", calculos);
  return (
    <>
     <div id='sideCheques'>
        <header id='encabezadoSide'>
            <div id='dias'>Días</div>
            <div id='porc'>Porc%</div>
            <div id='desc'>Desc$</div>
            <div id='liquidar'>Liquidar$</div>
        </header>
        <article id='calculosSide'>
            {calculos.map((c,index)=>{
                 return (
                    <div id='contenedorCalculosCheques' key={index} >
                       <div id='contDiasCobro'>{c.diasCobro.toLocaleString().padStart(3)}</div>
                       <div id='contPorcentaje'>{c.porcentaje===""? "":`${c.porcentaje.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(6)}%`}</div>
                       <div id='contDescuento'>{c.descuento===""? "": `$ ${c.descuento.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(12)}`}</div>
                       <div id='contLiquidar'>{c.liquidar===""? "":`$ ${c.liquidar.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(12)}`}</div>
                    </div>
                    )
            })}
       </article>
     </div>
    </>
  )
}

export default SideCheques

/*

export default function ProductList({ products, setCart }) {
    return (
        <Row as={"section"}>
            {products?.map((p) => <ProductItem key={p.id} product={p} setCart={setCart} />)}
        </Row>
    );
}

<div id='contDescuento'>$ {c.descuento.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(12)}</div>

*/
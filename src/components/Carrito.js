import React from 'react'
import '../styles/Carrito.css'

export const Carrito = ({ setActiveHeaderComponent }) => {
  return (
    <div className='container-carrito'>
        <h3>Los elementos de tu carrito se verán acá</h3>
        <br />
        <button onClick={() => setActiveHeaderComponent(null)}>Volver</button>
    </div>
  )
}

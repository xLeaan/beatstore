import React from 'react'
import '../styles/Ayuda.css'

export const Ayuda = ({ setActiveHeaderComponent }) => {
  return (
    <div className='container-ayuda'>
      <h1>Ayuda</h1>
      <button onClick={() => setActiveHeaderComponent(null)}>Volver</button>
    </div>
  )
}

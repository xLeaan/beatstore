import React from 'react'
import '../styles/Ayuda.css'
import { LuArrowLeft } from 'react-icons/lu'

export const Ayuda = ({ setActiveHeaderComponent }) => {
  return (
    <div className='page container-ayuda'>
      <div className='page-head'>
        <button className='volver-link' onClick={() => setActiveHeaderComponent(null)}>
          <LuArrowLeft /> Volver
        </button>
        <div className='eyebrow' style={{ marginTop: 24 }}><b>[?]</b> Soporte</div>
        <h1 className='display'>Ayuda.</h1>
      </div>
    </div>
  )
}

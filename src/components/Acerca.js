import React from 'react'
import "../styles/Acerca.css"

export const Acerca = () => {
  return (
    <div className='page container-acerca'>
      <div className='page-head'>
        <div className='eyebrow'><b>[03]</b> Acerca de</div>
        <h1 className='display'>La música es un proceso.<br /><span className='resaltado'>No un archivo.</span></h1>
      </div>
      <div className='acerca-grid'>
        {[
          ["01", "Producción original", "Cada beat se hace desde cero, pensado para que tu voz tenga espacio."],
          ["02", "Entrega inmediata", "Paga y descarga. Sin esperas, sin correos de ida y vuelta."],
          ["03", "Hecho para artistas", "Escucha, compara y elige el sonido que encaja con tu proyecto."],
        ].map(([n, titulo, texto]) => (
          <div className='card acerca-item' key={n}>
            <span className='eyebrow'><b>{n}</b></span>
            <h3>{titulo}</h3>
            <p>{texto}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

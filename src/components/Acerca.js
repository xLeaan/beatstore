import React, { useEffect, useState } from 'react'
import "../styles/Acerca.css"
import { getAcerca } from '../services/acercaService'

const pad = (n) => String(n).padStart(2, "0");

export const Acerca = () => {
  const [contenido, setContenido] = useState(null);

  useEffect(() => {
    getAcerca().then(setContenido);
  }, []);

  return (
    <div className={`page container-acerca ${contenido ? "" : "acerca-cargando"}`}>
      <div className='page-head'>
        <div className='eyebrow'><b>[03]</b> Acerca de</div>
        {contenido && (
          <h1 className='display'>
            {contenido.titulo}
            {contenido.resaltado && (<><br /><span className='resaltado'>{contenido.resaltado}</span></>)}
          </h1>
        )}
      </div>
      {contenido && (
        <div className='acerca-grid'>
          {contenido.items.map((item, i) => (
            <div className='card acerca-item' key={i}>
              <span className='eyebrow'><b>{pad(i + 1)}</b></span>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

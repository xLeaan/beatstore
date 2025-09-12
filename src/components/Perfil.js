import React from 'react'

export const Perfil = ({ setActiveHeaderComponent  }) => {
  return (
    <div>
        <h1>Hello world</h1>
        <button onClick={() => setActiveHeaderComponent(null)}>Volver a comprar</button>
    </div>
  )
}

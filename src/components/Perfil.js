import React from 'react'
import '../styles/Perfil.css'
import { IoIosArrowRoundBack } from 'react-icons/io'

export const Perfil = ({ setActiveHeaderComponent  }) => {
  return (
    <div className='container'>
        <div className='loginSection'>
          <h2>Iniciar Sesión</h2>
          <div className='inputsLogin'>
            <p>Email</p>
            <input />
          </div>

          <div className='inputsLogin'>
            <p>Constraseña</p>
            <input />
          </div>
          <a href='./SideBar.js'>¿Olvidaste la contraseña?</a>
          <br />
          <button className='botonNext'>Iniciar</button> 
          <br />
          <div className='botonAtras' onClick={() => setActiveHeaderComponent(null)}>
            <IoIosArrowRoundBack className='icon-login' />
            <span>Volver a comprar</span>
          </div>
          
        </div>

        <div>
          <hr className='linea'></hr>

        </div>

        <div className='registerSection'>
          <h2>Registrarse</h2>

          <div className='inputsRegister'>
            <p>Nombre(s)</p>
            <input />
          </div>
          

          <div className='inputsRegister'>
            <p>Apellido(s)</p>
            <input />
          </div>

          <div className='inputsRegister'>
            <p>Email</p>
            <input />
          </div>

          <div className='inputsRegister'>
            <p>Contraseña</p>
            <input />
          </div>

          <br />
          <button className='botonNext'>Crear</button>

        </div>
        
    </div>
  )
}

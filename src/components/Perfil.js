import React, { useState } from 'react'
import '../styles/Perfil.css'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { login, register } from "../services/authService"

export const Perfil = ({ setActiveHeaderComponent  }) => {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [admin, setAdmin] = useState(false)
  const [contrasena, setContrasena] = useState("")

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { user } = await login(email, contrasena)
      console.log("Usuario logueado:", user)
      setLoading(false)
      setSuccess("Login exitoso!")
    } catch (err) {
      setError(err.message)
    }
  }

  const handleRegister = async () => {
    try {
      setError(null)
      setLoading(true)  
      setAdmin(false)
      const data = await register(nombre, apellido, email, contrasena, admin)
      setLoading(false)
      console.log("usuario creado correctamente", data.user)
      setSuccess("Registro exitoso!")
    } catch (err) {
      setError(err.message)
    }
  }



  return (
    <div className='container'>
        <div className='loginSection'>
          <h2>Iniciar Sesión</h2>
          <div className='inputsLogin'>
            <p>Email</p>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='inputsLogin'>
            <p>Constraseña</p>
            <input
              type='password'
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <a href='./SideBar.js'>¿Olvidaste la contraseña?</a>
          <br />
          <button className='botonNext' onClick={handleLogin} disabled={loading}>
            {loading ? "Cargando..." : "Iniciar"}
          </button> 
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
            <input value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          </div>
          

          <div className='inputsRegister'>
            <p>Apellido(s)</p>
            <input value={apellido} onChange={(e) => setApellido(e.target.value)}/>
          </div>

          <div className='inputsRegister'>
            <p>Email</p>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='inputsRegister'>
            <p>Contraseña</p>
            <input
              type='password'
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <br />
          <button className='botonNext' onClick={handleRegister}>Crear</button>

        </div>
        
    </div>
  )
}

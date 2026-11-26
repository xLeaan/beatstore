import React, { useState } from 'react'
import '../styles/Perfil.css'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { login, register } from "../services/authService"
import { esErrorEmailNoConfirmado } from "../services/authErrors"
import { useUser } from '../context/UserContext'

export const Perfil = ({ setActiveHeaderComponent, irAlInicio }) => {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [loginemail, setLoginEmail] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [logincontrasena, setLoginContrasena] = useState("")

  const [loading, setLoading] = useState(false);
  const [loadingRegistro, setLoadingRegistro] = useState(false);
  const [errorLogin, setErrorLogin] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [successlogin, setSuccessLogin] = useState("");

  const { setUser } = useUser();

  const emailValido = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())

  // Lleva al inicio (sección Beats) tras autenticarse
  const entrar = (user) => {
    setUser(user)
    if (irAlInicio) irAlInicio()
    else setActiveHeaderComponent(null)
  }

  const handleLogin = async () => {
    setErrorLogin(null)
    setSuccessLogin("")

    if (!loginemail.trim() || !logincontrasena) {
      setErrorLogin("Ingresa tu correo y tu contraseña.")
      return
    }
    if (!emailValido(loginemail)) {
      setErrorLogin("El formato del correo no es válido.")
      return
    }

    try {
      setLoading(true)
      const { user } = await login(loginemail.trim(), logincontrasena)
      setLoginEmail("")
      setLoginContrasena("")
      entrar(user)
    } catch (err) {
      setErrorLogin(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    setError(null)
    setSuccess("")

    if (!nombre.trim() || !apellido.trim() || !email.trim() || !contrasena) {
      setError("Completa todos los campos para crear tu cuenta.")
      return
    }
    if (!emailValido(email)) {
      setError("El formato del correo no es válido.")
      return
    }
    if (contrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.")
      return
    }

    try {
      setLoadingRegistro(true)
      await register(nombre.trim(), apellido.trim(), email.trim(), contrasena)
    } catch (err) {
      setError(err.message)
      setLoadingRegistro(false)
      return
    }

    // Cuenta creada: iniciar sesión automáticamente para obtener los datos completos del usuario
    try {
      const { user } = await login(email.trim(), contrasena)
      entrar(user)
    } catch (err) {
      if (esErrorEmailNoConfirmado(err.message)) {
        setSuccess("¡Cuenta creada! Revisa tu correo para confirmarla y luego inicia sesión.")
      } else {
        setSuccess("¡Cuenta creada! Ya puedes iniciar sesión.")
      }
    } finally {
      setLoadingRegistro(false)
    }
  }

  return (
    <div className='page perfil-page'>
      <div className='page-head'>
        <button className='volver-link' onClick={() => setActiveHeaderComponent(null)}>
          <IoIosArrowRoundBack className='icon-login' /> Volver a comprar
        </button>
        <div className='eyebrow' style={{ marginTop: 24 }}><b>[00]</b> Cuenta</div>
        <h1 className='display'>Entra al estudio.</h1>
      </div>

      <div className='perfil-grid'>
        <section className='card loginSection'>
          <div className='eyebrow'><b>A</b> · Ya tengo cuenta</div>
          <h2>Iniciar sesión</h2>

          <div className='field'>
            <label>Email</label>
            <input
              type='email'
              value={loginemail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>

          <div className='field'>
            <label>Contraseña</label>
            <input
              type='password'
              value={logincontrasena}
              onChange={(e) => setLoginContrasena(e.target.value)}
            />
          </div>

          {errorLogin && <p className='msg-error'>{errorLogin}</p>}
          {successlogin && <p className='msg-ok'>{successlogin}</p>}
          <a className='olvido' href='./SideBar.js'>¿Olvidaste la contraseña?</a>

          <button className='btn btn-primary btn-block botonNext' onClick={handleLogin} disabled={loading} >
            {loading ? "Cargando..." : "Iniciar →"}
          </button>
        </section>

        <section className='card registerSection'>
          <div className='eyebrow'><b>B</b> · Soy nuevo</div>
          <h2>Registrarse</h2>

          <div className='perfil-dos-col'>
            <div className='field'>
              <label>Nombre(s)</label>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            </div>

            <div className='field'>
              <label>Apellido(s)</label>
              <input value={apellido} onChange={(e) => setApellido(e.target.value)}/>
            </div>
          </div>

          <div className='field'>
            <label>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='field'>
            <label>Contraseña</label>
            <input
              type='password'
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          {error && <p className='msg-error'>{error}</p>}
          {success && <p className='msg-ok'>{success}</p>}

          <button className='btn btn-block botonNext' onClick={handleRegister} disabled={loadingRegistro}>
            {loadingRegistro ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </section>
      </div>
    </div>
  )
}

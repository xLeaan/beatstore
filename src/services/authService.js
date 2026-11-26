import { traducirErrorAuth } from "./authErrors"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

// Hace la petición y convierte cualquier error (de red o del backend) en un mensaje en español
async function peticionAuth(ruta, body, contexto) {
    let res
    try {
        res = await fetch(`${API_URL}${ruta}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
    } catch (err) {
        throw new Error(traducirErrorAuth(err.message, contexto))
    }

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
        throw new Error(traducirErrorAuth(data.error, contexto))
    }

    return data
}

export async function login(loginemail, logincontrasena) {
    return peticionAuth("/api/login", { loginemail, logincontrasena }, "login")
}

export async function register(nombre, apellido, email, contrasena) {
    return peticionAuth("/api/register", { nombre, apellido, email, contrasena }, "registro")
}

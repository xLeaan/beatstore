const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

export async function login(email, contrasena) {
    const res =  await fetch (`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email, contrasena})
    })

    if(!res.ok){
        const {error} = await res.json()
        throw new Error(error)
    }

    return await res.json()
}

export async function register(nombre, apellido, email, contrasena, admin = false) {
  const res = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, apellido, email, contrasena, admin }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || "Error en el registro")
  }

  return await res.json()
}
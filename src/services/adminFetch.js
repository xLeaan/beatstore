const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Token de la sesión guardada al iniciar sesión (ver UserContext)
const tokenActual = () => {
  try {
    return JSON.parse(localStorage.getItem("user"))?.session?.access_token || null;
  } catch {
    return null;
  }
};

// fetch al backend con el token de admin; lanza Error con el mensaje del servidor
export async function adminFetch(ruta, { method = "GET", body } = {}) {
  const headers = {};
  const token = tokenActual();
  if (token) headers.Authorization = `Bearer ${token}`;
  // FormData se envía tal cual (el navegador pone el Content-Type multipart)
  const esFormData = body instanceof FormData;
  if (body !== undefined && !esFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_URL}${ruta}`, {
    method,
    headers,
    body: body === undefined ? undefined : esFormData ? body : JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
  return data;
}

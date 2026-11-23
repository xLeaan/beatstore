// Traduce los mensajes de error de Supabase / backend a español.
// El backend reenvía `error.message` de Supabase tal cual (en inglés).

const TRADUCCIONES = [
  ["invalid login credentials", "Correo o contraseña incorrectos."],
  ["email not confirmed", "Debes confirmar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada."],
  ["user already registered", "Ya existe una cuenta con este correo."],
  ["already been registered", "Ya existe una cuenta con este correo."],
  ["duplicate key", "Ya existe una cuenta con este correo."],
  ["password should be at least", "La contraseña debe tener al menos 6 caracteres."],
  ["password should contain", "La contraseña debe combinar letras mayúsculas, minúsculas y números."],
  ["weak password", "La contraseña es demasiado débil."],
  ["signup requires a valid password", "Ingresa una contraseña válida."],
  ["unable to validate email address", "El formato del correo no es válido."],
  ["is invalid", "El correo no es válido."],
  ["missing email", "Ingresa tu correo."],
  ["anonymous sign-ins are disabled", "Completa el correo y la contraseña."],
  ["rate limit", "Demasiados intentos. Espera unos minutos e inténtalo de nuevo."],
  ["for security purposes", "Por seguridad, espera unos segundos antes de intentarlo de nuevo."],
  ["signups not allowed", "El registro de nuevas cuentas está deshabilitado."],
  ["user not found", "No existe una cuenta con este correo."],
  ["multiple (or no) rows", "No encontramos los datos de tu cuenta. Contacta al soporte."],
  ["cannot coerce the result to a single json object", "No encontramos los datos de tu cuenta. Contacta al soporte."],
  ["failed to fetch", "No se pudo conectar con el servidor. Revisa tu conexión."],
  ["networkerror", "No se pudo conectar con el servidor. Revisa tu conexión."],
];

const GENERICO = {
  login: "No se pudo iniciar sesión. Inténtalo de nuevo.",
  registro: "No se pudo crear la cuenta. Inténtalo de nuevo.",
};

export function traducirErrorAuth(mensaje, contexto = "login") {
  const texto = String(mensaje || "").toLowerCase();
  const encontrado = TRADUCCIONES.find(([clave]) => texto.includes(clave));
  if (encontrado) return encontrado[1];

  // Mensaje no reconocido: se registra el original y se muestra uno genérico
  if (mensaje) console.warn("Error de autenticación sin traducir:", mensaje);
  return GENERICO[contexto] || GENERICO.login;
}

export const esErrorEmailNoConfirmado = (mensaje) =>
  String(mensaje || "").toLowerCase().includes("confirmar tu correo");

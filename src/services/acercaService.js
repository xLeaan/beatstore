import { supabase } from "./supabaseClient";
import { adminFetch } from "./adminFetch";

// Contenido por defecto (se usa si la tabla aún no existe o está vacía)
export const ACERCA_DEFAULT = {
  titulo: "La música es un proceso.",
  resaltado: "No un archivo.",
  items: [
    { titulo: "Producción original", texto: "Cada beat se hace desde cero, pensado para que tu voz tenga espacio." },
    { titulo: "Entrega inmediata", texto: "Paga y descarga. Sin esperas, sin correos de ida y vuelta." },
    { titulo: "Hecho para artistas", texto: "Escucha, compara y elige el sonido que encaja con tu proyecto." },
  ],
};

export async function getAcerca() {
  const { data, error } = await supabase
    .from("acerca")
    .select("titulo, resaltado, items")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("Error obteniendo acerca:", error);
    return ACERCA_DEFAULT;
  }
  return data || ACERCA_DEFAULT;
}

export function guardarAcerca(contenido) {
  return adminFetch("/api/acerca", { method: "PUT", body: contenido });
}

import { supabase } from "./supabaseClient";
import { adminFetch } from "./adminFetch";

export function cambiarDisponibilidadBeat(id, disponible_beat) {
    return adminFetch(`/api/beats/${id}`, { method: "PATCH", body: { disponible_beat } });
}

export function eliminarBeat(id) {
    return adminFetch(`/api/beats/${id}`, { method: "DELETE" });
}


export function crearBeats(formData) {
    return adminFetch("/api/beats", { method: "POST", body: formData });
}

// Lectura directa a Supabase: evita el salto por Render (y su cold start).
export async function getBeats() {
    const { data, error } = await supabase
        .from("beats")
        .select("id_beat, nombre_beat, url_beat, precio, disponible_beat, created_at, imagen_beat")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error obteniendo beats:", error);
        throw error;
    }
    return data;
}
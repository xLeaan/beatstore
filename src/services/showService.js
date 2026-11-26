import { adminFetch } from "./adminFetch";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

export function crearShows(formData) {
    return adminFetch("/api/shows", { method: "POST", body: formData });
}

export async function getShows() {
    try {
        const res = await fetch(`${API_URL}/api/shows/getShows`);
        if (!res.ok) throw new Error("Error obteniendo shows");
        return await res.json();
    } catch (error) {
        console.error("Error en fetchShows:", error);
        throw error;
    }
}
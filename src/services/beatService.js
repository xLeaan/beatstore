const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"

export async function crearBeats(formData) {
    const res = await fetch(`${API_URL}/api/beats`, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error al crear el beat");

    return data;
}

export async function getBeats() {
    try {
        const res = await fetch(`${API_URL}/api/beats/getBeats`);
        if (!res.ok) throw new Error("Error obteniendo beats");
        return await res.json();
    } catch (error) {
        console.error("Error en fetchBeats:", error);
        throw error;
    }
}
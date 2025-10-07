import React, { useState } from 'react'
import "../styles/Admin.css"
import { crearBeats } from '../services/beatService';

export const Admin = () => {

  const [nombreBeat, setNombreBeat] = useState("");
  const [precioBeat, setPrecioBeat] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

 const handleUpload = async (e) => {
    e.preventDefault();
    if (!audioFile) return alert("Selecciona un archivo de audio");

    setSubiendo(true);

    // Crear objeto FormData (muy importante)
    const formData = new FormData();
    formData.append("nombre_beat", nombreBeat);
    formData.append("precio", precioBeat);
    formData.append("audio", audioFile);
    formData.append("disponible_beat", true);
    formData.append("imagen_beat", imagenFile);

    try {
      console.log("FormData a enviar:", formData);
      const { beat } = await crearBeats(formData);

      console.log("Beat guardado:", beat);
      alert("Beat subido correctamente");

      // limpiar
      setNombreBeat("");
      setPrecioBeat("");
      setAudioFile(null);
      setAudioFile("");
    } catch (error) {
      console.error(error);
      alert("Error al subir el beat");
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className='container-admin'>
        <div className='admin-beats'>
            <h1>Crear beats</h1>
             <form onSubmit={handleUpload}>
              <div className='inputsBeats'>
                <input
                  type='text'
                  placeholder='Nombre del beat'
                  value={nombreBeat}
                  onChange={(e) => setNombreBeat(e.target.value)}
                />
              </div>
              <br />
              <div className='inputsBeats'>
                <input
                  type='number'
                  placeholder='Precio'
                  value={precioBeat}
                  onChange={(e) => setPrecioBeat(e.target.value)}
                />
              </div>
              <h2>Audio</h2>
              <div className='inputsBeats'>
                <input
                  type='file'
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                />
              </div>
              <h2>Imgen del beat</h2>
              <div className='inputsBeats'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagenFile(e.target.files[0])}
                  />
              </div>
              <button type="submit" disabled={subiendo}>
                {subiendo ? "Subiendo..." : "Subir Beat"}
              </button>
            </form>
            <h1>Beats creados</h1>

        </div>   

        <div>
          <h1>Crear shows</h1>
        </div>

        <div>
          <h1>Editar acerca de</h1>
        </div>
    </div>
  )
}

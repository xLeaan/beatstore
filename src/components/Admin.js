import React, { useState } from 'react'
import "../styles/Admin.css"
import { crearBeats } from '../services/beatService';
import { crearShows } from '../services/showService';

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

  const [nombreShow, setNombreShow] = useState("");
  const [fechaShow, setFechaShow] = useState("");
  const [lugarShow, setLugarShow] = useState("");
  const [urlShow, setUrlShow] = useState("");
  const [imagenShow, setImagenShow] = useState(null);
  const [subiendoShow, setSubiendoShow] = useState(false);

  const handleUploadShow = async (e) => {
      e.preventDefault();
      if (!imagenShow) return alert("Selecciona una imagen para el show");

      setSubiendoShow(true);

      const formData = new FormData();
      formData.append("nombre_show", nombreShow);
      formData.append("fecha_show", fechaShow);
      formData.append("lugar_show", lugarShow);
      formData.append("url_show", urlShow);
      formData.append("imagen_show", imagenShow);

      try {
        console.log("FormData a enviar de shows:", formData);
        const { show } = await crearShows(formData);
        console.log("Show guardado:", show);
        alert("Show subido correctamente");
        // limpiar
        setNombreShow("");
        setFechaShow("");
        setLugarShow("");
        setUrlShow("");
        setImagenShow(null);

      } catch (error) {
        console.error(error);
        alert("Error al subir el show");
      } finally {
        setSubiendoShow(false);
      }
  }

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
              <h2>Imagen del beat</h2>
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

        </div>   

        <div>
          <h1>Crear shows</h1>

          <form onSubmit={handleUploadShow}>
              <div className='inputsShows'>
                <input
                  type='text'
                  placeholder='Nombre del show'
                  value={nombreShow}
                  onChange={(e) => setNombreShow(e.target.value)}
                />
              </div>
              <br />
              <div className='inputsShows'>
                <input
                  type='datetime-local'
                  placeholder='Fecha del show'
                  value={fechaShow}
                  onChange={(e) => setFechaShow(e.target.value)}
                />
              </div>
              <br/>
              <div className='inputsShows'>
                <input
                  type='text'
                  placeholder='Lugar del show'
                  value={lugarShow}
                  onChange={(e) => setLugarShow(e.target.value)}
                />
              </div>
              <div className='inputsShows'>
                <input
                  type='link'
                  placeholder='Link del show'
                  value={urlShow}
                  onChange={(e) => setUrlShow(e.target.value)}
                />
              </div>
              <h2>Imagen del show</h2>
              <div className='inputsShows'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagenShow(e.target.files[0])}
                  />
              </div>
              <button type="submit" disabled={subiendoShow}>
                {subiendoShow ? "Subiendo..." : "Subir show"}
              </button>
            </form>
        </div>

        <div>
          <h1>Editar acerca de</h1>
        </div>
    </div>
  )
}

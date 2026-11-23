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
    <div className='page container-admin'>
      <div className='page-head'>
        <div className='eyebrow'><b>[04]</b> Panel de administración</div>
        <h1 className='display'>Admin.</h1>
      </div>

      <div className='admin-grid'>
        <section className='card admin-card admin-beats'>
          <div className='eyebrow'><b>A</b> · Catálogo</div>
          <h2>Crear beat</h2>
          <form onSubmit={handleUpload}>
            <div className='field'>
              <label>Nombre del beat</label>
              <input
                type='text'
                placeholder='Ej. Midnight Drip'
                value={nombreBeat}
                onChange={(e) => setNombreBeat(e.target.value)}
              />
            </div>
            <div className='field'>
              <label>Precio (COP)</label>
              <input
                type='number'
                placeholder='50000'
                value={precioBeat}
                onChange={(e) => setPrecioBeat(e.target.value)}
              />
            </div>
            <div className='field'>
              <label>Audio</label>
              <input
                type='file'
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files[0])}
              />
            </div>
            <div className='field'>
              <label>Imagen del beat</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagenFile(e.target.files[0])}
              />
            </div>
            <button className='btn btn-primary btn-block' type="submit" disabled={subiendo}>
              {subiendo ? "Subiendo..." : "Subir beat"}
            </button>
          </form>
        </section>

        <section className='card admin-card'>
          <div className='eyebrow'><b>B</b> · En vivo</div>
          <h2>Crear show</h2>
          <form onSubmit={handleUploadShow}>
            <div className='field'>
              <label>Nombre del show</label>
              <input
                type='text'
                placeholder='Nombre del show'
                value={nombreShow}
                onChange={(e) => setNombreShow(e.target.value)}
              />
            </div>
            <div className='field'>
              <label>Fecha</label>
              <input
                type='datetime-local'
                value={fechaShow}
                onChange={(e) => setFechaShow(e.target.value)}
              />
            </div>
            <div className='field'>
              <label>Lugar</label>
              <input
                type='text'
                placeholder='Lugar del show'
                value={lugarShow}
                onChange={(e) => setLugarShow(e.target.value)}
              />
            </div>
            <div className='field'>
              <label>Link de entradas</label>
              <input
                type='url'
                placeholder='https://'
                value={urlShow}
                onChange={(e) => setUrlShow(e.target.value)}
              />
            </div>
            <div className='field'>
              <label>Imagen del show</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagenShow(e.target.files[0])}
              />
            </div>
            <button className='btn btn-primary btn-block' type="submit" disabled={subiendoShow}>
              {subiendoShow ? "Subiendo..." : "Subir show"}
            </button>
          </form>
        </section>

        <section className='card admin-card'>
          <div className='eyebrow'><b>C</b> · Contenido</div>
          <h2>Editar acerca de</h2>
          <p className='admin-pronto'>Próximamente</p>
        </section>
      </div>
    </div>
  )
}

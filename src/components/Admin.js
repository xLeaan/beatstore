import React, { useCallback, useEffect, useState } from 'react'
import "../styles/Admin.css"
import { FaTrash } from 'react-icons/fa';
import { ConfirmModal } from './ConfirmModal';
import { crearBeats, getBeats, cambiarDisponibilidadBeat, eliminarBeat } from '../services/beatService';
import { crearShows } from '../services/showService';
import { getAcerca, guardarAcerca } from '../services/acercaService';

const formatearPrecio = (precio) => {
  const n = Number(precio);
  return isNaN(n) ? precio : n.toLocaleString("es-CO");
};

export const Admin = () => {

  // ---------- Beats subidos ----------
  const [beats, setBeats] = useState([]);
  const [cargandoBeats, setCargandoBeats] = useState(true);
  const [ocupado, setOcupado] = useState(null); // id del beat con una acción en curso

  const cargarBeats = () => {
    setCargandoBeats(true);
    getBeats()
      .then((data) => setBeats(data || []))
      .catch(() => alert("No se pudieron cargar los beats"))
      .finally(() => setCargandoBeats(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { cargarBeats(); }, []);

  const toggleDisponible = async (beat) => {
    setOcupado(beat.id_beat);
    try {
      const actualizado = await cambiarDisponibilidadBeat(beat.id_beat, !beat.disponible_beat);
      setBeats((prev) => prev.map((b) => (b.id_beat === beat.id_beat ? { ...b, ...actualizado } : b)));
    } catch (err) {
      alert(err.message);
    } finally {
      setOcupado(null);
    }
  };

  // Beat pendiente de confirmar su eliminación (abre el modal)
  const [beatAEliminar, setBeatAEliminar] = useState(null);
  const [errorEliminar, setErrorEliminar] = useState(null);

  const pedirEliminar = (beat) => {
    setErrorEliminar(null);
    setBeatAEliminar(beat);
  };

  const cancelarEliminar = useCallback(() => setBeatAEliminar(null), []);

  const confirmarEliminar = async () => {
    const beat = beatAEliminar;
    setOcupado(beat.id_beat);
    setErrorEliminar(null);
    try {
      await eliminarBeat(beat.id_beat);
      setBeats((prev) => prev.filter((b) => b.id_beat !== beat.id_beat));
      setBeatAEliminar(null);
    } catch (err) {
      setErrorEliminar(err.message);
    } finally {
      setOcupado(null);
    }
  };

  // ---------- Acerca de ----------
  const [acerca, setAcerca] = useState(null);
  const [guardandoAcerca, setGuardandoAcerca] = useState(false);

  useEffect(() => {
    getAcerca().then((data) => setAcerca({ ...data, items: data.items.map((it) => ({ ...it })) }));
  }, []);

  const editarItem = (i, campo, valor) =>
    setAcerca((prev) => ({
      ...prev,
      items: prev.items.map((it, j) => (j === i ? { ...it, [campo]: valor } : it)),
    }));

  const agregarItem = () =>
    setAcerca((prev) => ({ ...prev, items: [...prev.items, { titulo: "", texto: "" }] }));

  const quitarItem = (i) =>
    setAcerca((prev) => ({ ...prev, items: prev.items.filter((_, j) => j !== i) }));

  const handleGuardarAcerca = async (e) => {
    e.preventDefault();
    if (!acerca.titulo.trim()) return alert("El título es obligatorio");
    setGuardandoAcerca(true);
    try {
      const guardado = await guardarAcerca(acerca);
      setAcerca(guardado);
      alert("Acerca de actualizado");
    } catch (err) {
      alert(err.message);
    } finally {
      setGuardandoAcerca(false);
    }
  };

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
      cargarBeats();

      // limpiar
      setNombreBeat("");
      setPrecioBeat("");
      setAudioFile(null);
      setAudioFile("");
    } catch (error) {
      console.error(error);
      alert(`Error al subir el beat: ${error.message}`);
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
        alert(`Error al subir el show: ${error.message}`);
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
          {!acerca ? (
            <p className='admin-pronto'>Cargando…</p>
          ) : (
            <form onSubmit={handleGuardarAcerca}>
              <div className='field'>
                <label>Título</label>
                <input
                  type='text'
                  value={acerca.titulo}
                  onChange={(e) => setAcerca({ ...acerca, titulo: e.target.value })}
                />
              </div>
              <div className='field'>
                <label>Frase resaltada</label>
                <input
                  type='text'
                  value={acerca.resaltado}
                  onChange={(e) => setAcerca({ ...acerca, resaltado: e.target.value })}
                />
              </div>

              {acerca.items.map((item, i) => (
                <div className='admin-acerca-item' key={i}>
                  <div className='admin-acerca-item-head'>
                    <span className='eyebrow'><b>{String(i + 1).padStart(2, "0")}</b></span>
                    <button
                      type='button'
                      className='admin-icon-btn'
                      onClick={() => quitarItem(i)}
                      aria-label={`Quitar bloque ${i + 1}`}
                      title='Quitar bloque'
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className='field'>
                    <label>Título del bloque</label>
                    <input
                      type='text'
                      value={item.titulo}
                      onChange={(e) => editarItem(i, "titulo", e.target.value)}
                    />
                  </div>
                  <div className='field'>
                    <label>Texto</label>
                    <textarea
                      className='input admin-textarea'
                      rows={3}
                      value={item.texto}
                      onChange={(e) => editarItem(i, "texto", e.target.value)}
                    />
                  </div>
                </div>
              ))}

              <button type='button' className='btn btn-block' onClick={agregarItem}>
                + Agregar bloque
              </button>
              <button className='btn btn-primary btn-block' type='submit' disabled={guardandoAcerca}>
                {guardandoAcerca ? "Guardando..." : "Guardar cambios"}
              </button>
            </form>
          )}
        </section>

        <section className='card admin-card admin-lista'>
          <div className='eyebrow'><b>D</b> · Catálogo</div>
          <h2>Beats subidos</h2>
          {cargandoBeats ? (
            <p className='admin-pronto'>Cargando…</p>
          ) : beats.length === 0 ? (
            <p className='admin-pronto'>Aún no hay beats</p>
          ) : (
            <ul className='admin-beats-lista'>
              {beats.map((beat) => (
                <li
                  key={beat.id_beat}
                  className={`admin-beat ${beat.disponible_beat ? "" : "agotado"}`}
                >
                  <img src={beat.imagen_beat || "/unnamed.png"} alt="" />
                  <div className='admin-beat-texto'>
                    <span className='admin-beat-nombre'>{beat.nombre_beat}</span>
                    <span className='admin-beat-meta'>
                      ${formatearPrecio(beat.precio)} ·{" "}
                      <span className={beat.disponible_beat ? "estado-ok" : "estado-agotado"}>
                        {beat.disponible_beat ? "Disponible" : "Agotado"}
                      </span>
                    </span>
                  </div>
                  <button
                    className='btn admin-beat-btn'
                    onClick={() => toggleDisponible(beat)}
                    disabled={ocupado === beat.id_beat}
                  >
                    {beat.disponible_beat ? "Marcar agotado" : "Marcar disponible"}
                  </button>
                  <button
                    className='admin-icon-btn peligro'
                    onClick={() => pedirEliminar(beat)}
                    disabled={ocupado === beat.id_beat}
                    aria-label={`Eliminar ${beat.nombre_beat}`}
                    title='Eliminar beat'
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {beatAEliminar && (
        <ConfirmModal
          titulo={`Eliminar "${beatAEliminar.nombre_beat}"`}
          textoConfirmar='Eliminar'
          textoCargando='Eliminando…'
          cargando={ocupado === beatAEliminar.id_beat}
          error={errorEliminar}
          onConfirmar={confirmarEliminar}
          onCancelar={cancelarEliminar}
        >
          <p>Esto borra también el audio y la imagen. No se puede deshacer.</p>
        </ConfirmModal>
      )}
    </div>
  )
}

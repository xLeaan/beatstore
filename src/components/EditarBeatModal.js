import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaPen } from 'react-icons/fa'
import { editarBeat } from '../services/beatService'
import "../styles/ConfirmModal.css"

// Modal para editar nombre, precio e imagen de un beat.
// onGuardado recibe el beat actualizado que devuelve el backend.
export const EditarBeatModal = ({ beat, onCerrar, onGuardado }) => {
  const [nombre, setNombre] = useState(beat.nombre_beat || "");
  const [precio, setPrecio] = useState(beat.precio ?? "");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const nombreRef = useRef(null);

  useEffect(() => {
    nombreRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && !guardando && onCerrar();
    document.addEventListener('keydown', onKey);
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflowPrevio;
    };
  }, [guardando, onCerrar]);

  // Vista previa de la imagen nueva
  useEffect(() => {
    if (!imagen) return setPreview(null);
    const url = URL.createObjectURL(imagen);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imagen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim()) return setError("El nombre no puede estar vacío.");
    if (precio === "" || Number(precio) < 0) return setError("Ingresa un precio válido.");

    // Solo se envía lo que cambió
    const cambios = {};
    if (nombre.trim() !== beat.nombre_beat) cambios.nombre_beat = nombre.trim();
    if (Number(precio) !== Number(beat.precio)) cambios.precio = precio;
    if (imagen) cambios.imagen = imagen;

    if (!Object.keys(cambios).length) return onCerrar();

    setGuardando(true);
    try {
      const actualizado = await editarBeat(beat.id_beat, cambios);
      onGuardado(actualizado);
    } catch (err) {
      setError(err.message);
      setGuardando(false);
    }
  };

  return createPortal(
    <div className='confirm-overlay' onClick={() => !guardando && onCerrar()}>
      <form
        className='confirm-modal card confirm-aviso editar-beat'
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        role='dialog'
        aria-modal='true'
        aria-labelledby='editar-titulo'
      >
        <div className='confirm-icono'><FaPen /></div>
        <h2 id='editar-titulo'>Editar beat</h2>

        <div className='field'>
          <label htmlFor='editar-nombre'>Nombre</label>
          <input
            id='editar-nombre'
            ref={nombreRef}
            type='text'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={guardando}
          />
        </div>

        <div className='field'>
          <label htmlFor='editar-precio'>Precio (COP)</label>
          <input
            id='editar-precio'
            type='number'
            min='0'
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            disabled={guardando}
          />
        </div>

        <div className='field'>
          <label htmlFor='editar-imagen'>Imagen</label>
          <div className='editar-imagen'>
            <img src={preview || beat.imagen_beat || "/unnamed.png"} alt='' />
            <div className='editar-imagen-texto'>
              <span>{imagen ? imagen.name : "Imagen actual"}</span>
              <input
                id='editar-imagen'
                type='file'
                accept='image/*'
                onChange={(e) => setImagen(e.target.files[0] || null)}
                disabled={guardando}
              />
            </div>
          </div>
        </div>

        {error && <p className='confirm-error'>{error}</p>}

        <div className='confirm-acciones'>
          <button type='button' className='btn' onClick={onCerrar} disabled={guardando}>
            Cancelar
          </button>
          <button type='submit' className='btn btn-primary' disabled={guardando}>
            {guardando ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
}

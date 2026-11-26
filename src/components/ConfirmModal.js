import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import "../styles/ConfirmModal.css"

// Modal de confirmación. Mientras `cargando` es true no se puede cerrar.
export const ConfirmModal = ({
  titulo,
  children,
  textoConfirmar = "Confirmar",
  textoCargando = "Procesando…",
  cargando = false,
  error = null,
  onConfirmar,
  onCancelar,
}) => {
  const cancelarRef = useRef(null);

  useEffect(() => {
    cancelarRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && !cargando && onCancelar();
    document.addEventListener('keydown', onKey);
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflowPrevio;
    };
  }, [cargando, onCancelar]);

  return createPortal(
    <div className='confirm-overlay' onClick={() => !cargando && onCancelar()}>
      <div
        className='confirm-modal card'
        onClick={(e) => e.stopPropagation()}
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='confirm-titulo'
        aria-describedby='confirm-texto'
      >
        <div className='confirm-icono'><FaTrash /></div>
        <h2 id='confirm-titulo'>{titulo}</h2>
        <div id='confirm-texto' className='confirm-texto'>{children}</div>
        {error && <p className='confirm-error'>{error}</p>}
        <div className='confirm-acciones'>
          <button ref={cancelarRef} className='btn' onClick={onCancelar} disabled={cargando}>
            Cancelar
          </button>
          <button className='btn btn-peligro' onClick={onConfirmar} disabled={cargando}>
            {cargando ? textoCargando : textoConfirmar}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

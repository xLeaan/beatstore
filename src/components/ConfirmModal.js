import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FaTrash, FaCheck, FaExclamationTriangle, FaInfo } from 'react-icons/fa'
import "../styles/ConfirmModal.css"

const ICONOS = {
  peligro: <FaTrash />,
  exito: <FaCheck />,
  error: <FaExclamationTriangle />,
  aviso: <FaInfo />,
};

// Modal de confirmación o aviso.
// - Con onCancelar: dos botones (Cancelar / Confirmar).
// - Sin onCancelar: un solo botón, funciona como aviso (reemplaza a alert()).
// Mientras `cargando` es true no se puede cerrar.
export const ConfirmModal = ({
  titulo,
  children,
  tipo = "peligro", // peligro | exito | error | aviso
  textoConfirmar = "Confirmar",
  textoCargando = "Procesando…",
  cargando = false,
  error = null,
  onConfirmar,
  onCancelar,
}) => {
  const cancelarRef = useRef(null);
  const confirmarRef = useRef(null);
  const cerrar = onCancelar || onConfirmar;

  useEffect(() => {
    // En confirmaciones el foco va a Cancelar para que un Enter accidental no ejecute la acción
    (cancelarRef.current || confirmarRef.current)?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && !cargando && cerrar();
    document.addEventListener('keydown', onKey);
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflowPrevio;
    };
  }, [cargando, cerrar]);

  return createPortal(
    <div className='confirm-overlay' onClick={() => !cargando && cerrar()}>
      <div
        className={`confirm-modal card confirm-${tipo}`}
        onClick={(e) => e.stopPropagation()}
        role={onCancelar ? 'alertdialog' : 'dialog'}
        aria-modal='true'
        aria-labelledby='confirm-titulo'
        aria-describedby='confirm-texto'
      >
        <div className='confirm-icono'>{ICONOS[tipo] || ICONOS.aviso}</div>
        <h2 id='confirm-titulo'>{titulo}</h2>
        {children && <div id='confirm-texto' className='confirm-texto'>{children}</div>}
        {error && <p className='confirm-error'>{error}</p>}
        <div className='confirm-acciones'>
          {onCancelar && (
            <button ref={cancelarRef} className='btn' onClick={onCancelar} disabled={cargando}>
              Cancelar
            </button>
          )}
          <button
            ref={confirmarRef}
            className={`btn ${tipo === 'peligro' ? 'btn-peligro' : 'btn-primary'}`}
            onClick={onConfirmar}
            disabled={cargando}
          >
            {cargando ? textoCargando : textoConfirmar}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

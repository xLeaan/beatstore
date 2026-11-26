import React, { createContext, useCallback, useContext, useState } from "react";
import { ConfirmModal } from "../components/ConfirmModal";

const AvisoContext = createContext(() => {});

// Uso: const aviso = useAviso();
//      aviso({ tipo: "exito", titulo: "Beat subido", mensaje: "Ya está en la tienda." });
// Tipos: exito | error | aviso. Devuelve una promesa que se resuelve al cerrar.
export const useAviso = () => useContext(AvisoContext);

export const AvisoProvider = ({ children }) => {
  const [actual, setActual] = useState(null);

  const aviso = useCallback(
    ({ tipo = "aviso", titulo, mensaje, textoBoton = "Entendido" }) =>
      new Promise((resolve) => setActual({ tipo, titulo, mensaje, textoBoton, resolve })),
    []
  );

  const cerrar = useCallback(() => {
    setActual((prev) => {
      prev?.resolve();
      return null;
    });
  }, []);

  return (
    <AvisoContext.Provider value={aviso}>
      {children}
      {actual && (
        <ConfirmModal
          tipo={actual.tipo}
          titulo={actual.titulo}
          textoConfirmar={actual.textoBoton}
          onConfirmar={cerrar}
        >
          {actual.mensaje && <p>{actual.mensaje}</p>}
        </ConfirmModal>
      )}
    </AvisoContext.Provider>
  );
};

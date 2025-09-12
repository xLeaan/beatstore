import React, { useState } from "react";
import "../styles/Beats.css";
import { FaPlay } from "react-icons/fa";
import { LuCircleGauge } from "react-icons/lu";

export const Beats = () => {

  const fotos = ["Foto 1", "Foto 2", "Foto 3", "Foto 4", "Foto 5", "Foto 6", "Foto 7"];

  const [beatSeleccionado, setBeatSeleccionado] = useState(null);

  const handleClickButton = (texto) => {
  if (beatSeleccionado === texto) {
    // Si ya está abierto este mismo, lo cerramos
    setBeatSeleccionado(null);
  } else {
    // Si no, lo abrimos
    setBeatSeleccionado(texto);
  }
};




  return (
    <div className="contenedor">
   <div className="beats-container">
      {fotos.map((texto, index) => (
        <div className="portada-beats-wrapper" key={index}>
          <div className="portada-beats">
            <span>{texto}</span>
            <div className="circular-button-atras">
              <button
                className="circular-button-adelante"
                onClick={() => handleClickButton(texto)}
              />
            </div>
          </div>

          {beatSeleccionado === texto && (
            <div className="beat-seleccionado">
              <div className="titulo">
                <FaPlay className="icon-play" />
                <span className="letra">
                  Reproduciendo ahora {beatSeleccionado}
                </span>
              </div>
              <p>Aquí van las ondas sonoras</p>
            </div>
          )}
        </div>
      ))}
    </div>


    <div className="precios">
        <h1>Precios</h1>
        <LuCircleGauge className="icon-precio" />
        <LuCircleGauge className="icon-precio" />
    </div>
    </div>



  );
};

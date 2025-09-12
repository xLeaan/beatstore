import React from "react";
import "../styles/Beats.css";

export const Beats = () => {

  const fotos = ["Foto 1", "Foto 2", "Foto 3", "Foto 4", "Foto 5", "Foto 6", "Foto 7"];

  const handleClickButton = () => {
    console.log("click");
  };



  return (
    <div className="beats-container">
      {fotos.map((texto, index) => (
        <div className="portada-beats" key={index}>
          <span>{texto}</span>
          <div className="circular-button-atras">
            <button
              className="circular-button-adelante"
              onClick={handleClickButton}
            />
          </div>
        </div>
      ))}
  </div>

  );
};

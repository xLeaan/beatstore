import React, { useEffect, useState } from "react";
import "../styles/Beats.css";
import { FaPlay } from "react-icons/fa";
import { LuCircleGauge } from "react-icons/lu";
import { getBeats } from "../services/beatService";
import { useCart } from "../context/CartContext";

export const Beats = () => {
  const [beats, setBeats] = useState([]);
  const [beatSeleccionado, setBeatSeleccionado] = useState(null);
  const [audioActual, setAudioActual] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [reproduciendo, setReproduciendo] = useState(false);

  const { addToCart, cartItems } = useCart();

  useEffect(() => {
  getBeats()
    .then((data) => {
      setBeats(data);
    })
    .catch((err) => console.error(err));
}, []);


  const handleClickButton = (beat) => {
    if (beatSeleccionado === beat.id_beat) {
      if (audioActual) {
        audioActual.pause();
        setAudioActual(null);
      }
      setBeatSeleccionado(null);
      setBackgroundImage(null);
      setReproduciendo(false);
      return;
    }

    if (audioActual) {
      audioActual.pause();
    }

    const nuevoAudio = new Audio(beat.url_beat);

    nuevoAudio.addEventListener("play", () => setReproduciendo(true));
    nuevoAudio.addEventListener("pause", () => setReproduciendo(false));

    setBeatSeleccionado(beat.id_beat);
    setBackgroundImage(beat.imagen_beat);
    setAudioActual(nuevoAudio);
    nuevoAudio.play();
  };

  const beatsDisponibles = beats.filter((beat) => beat.disponible_beat === true);

  const handleAddToCart = (beat) => {
    const alreadyInCart = cartItems.some((item) => item.id_beat === beat.id_beat);
    if (!alreadyInCart) {
      addToCart(beat);
    }
  };


  return (
    <div className="contenedor" style={{
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
    }}>
      <div className="beats-container">
         {beatsDisponibles.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No hay beats disponibles aún</p>
        ) : (
          beatsDisponibles.map((beat) => (
            <div className="portada-beats-wrapper" key={beat.id_beat}>
              <div className="portada-beats">
                <img
                  src={beat.imagen_beat || "/unnamed.png"}
                  alt=""
                />
                <span>{beat.nombre_beat}</span>

                <div className="circular-button-atras">
                  <button
                    className="circular-button-adelante"
                    onClick={() => handleClickButton(beat)}
                  >
                    <FaPlay />
                  </button>
                </div>
              </div>

              {beatSeleccionado === beat.id_beat && (
                <div className="beat-seleccionado">
                  <div className="titulo">
                    <span className="letra">
                      Reproduciendo ahora {beat.nombre_beat}
                    </span>
                  </div>
                  {/* <audio controls src={beat.url_beat} autoPlay /> */}
                  <div className={`ondas-sonoras ${reproduciendo ? "animadas" : ""}`}>
                    {Array.from({ length: 15 }).map((_, i) => (
                      <span key={i} className="onda"></span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="precios">
        <h1>Precios</h1>
        {beatSeleccionado && (
          <div className="precio-individual">
            <span className="cantidad-precio">
              $  
              {
                beats.find((beat) => beat.id_beat === beatSeleccionado)
                  ?.precio
              }
            </span>
            <br /> <br />
            {(() => {
              const beat = beats.find(
                (b) => b.id_beat === beatSeleccionado
              );
              const alreadyInCart = cartItems.some(
                (i) => i.id_beat === beat.id_beat
              );

              return (
                <span
                  className={`añadir-carrito ${
                    alreadyInCart ? "en-carrito" : ""
                  }`}
                  onClick={() => !alreadyInCart && handleAddToCart(beat)}
                >
                  <LuCircleGauge className="icon-precio" />
                  <br />
                  {alreadyInCart ? "Producto agregado" : "Añadir al carrito"}
                </span>
              );
            })()}
          </div>
        )}


      </div>

    </div>
  );
};
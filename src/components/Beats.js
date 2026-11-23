import React, { useEffect, useRef, useState } from "react";
import "../styles/Beats.css";
import { FaPlay, FaPause, FaStop, FaCheck, FaCartPlus } from "react-icons/fa";
import { getBeats } from "../services/beatService";
import { useCart } from "../context/CartContext";

const BARRAS_ONDA = 140;
const COMPASES = 16;

// Hash simple y estable a partir del id del beat
const hash = (seed) => {
  const key = String(seed);
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return Math.abs(h);
};

// "Forma de onda" decorativa, siempre igual para el mismo beat
const ondaCache = {};
const generarOnda = (seed) => {
  const key = String(seed);
  if (ondaCache[key]) return ondaCache[key];
  let h = hash(seed) || 1;
  const barras = [];
  for (let i = 0; i < BARRAS_ONDA; i++) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    const ruido = (h % 1000) / 1000;
    // Golpes cada "tiempo" para que parezca un beat
    const golpe = i % 8 === 0 ? 1 : i % 4 === 0 ? 0.8 : 0.55;
    const entrada = Math.min(1, i / 10);
    barras.push(Math.max(0.08, ruido * golpe * entrada));
  }
  ondaCache[key] = barras;
  return barras;
};

// Color del clip a partir del id (tonos apagados, estilo DAW)
const colorClip = (seed) => {
  const hue = (hash(seed) * 47) % 360;
  return {
    "--clip-h": hue,
  };
};

const formatearLCD = (seg) => {
  if (!seg || !isFinite(seg)) seg = 0;
  const m = Math.floor(seg / 60);
  const s = Math.floor(seg % 60);
  const cs = Math.floor((seg % 1) * 100);
  return `${m}:${String(s).padStart(2, "0")}:${String(cs).padStart(2, "0")}`;
};

const formatearTiempo = (seg) => {
  if (!seg || !isFinite(seg)) return "0:00";
  const m = Math.floor(seg / 60);
  const s = Math.floor(seg % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const formatearPrecio = (precio) => {
  const n = Number(precio);
  return isNaN(n) ? precio : n.toLocaleString("es-CO");
};

const pad = (n) => String(n).padStart(2, "0");

export const Beats = () => {
  const [beats, setBeats] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [beatSeleccionado, setBeatSeleccionado] = useState(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const audioRef = useRef(null);

  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    getBeats()
      .then((data) => setBeats(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error(err);
        setError("No pudimos cargar los beats. Intenta de nuevo más tarde.");
      })
      .finally(() => setCargando(false));
  }, []);

  // Detener el audio al salir de la vista
  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const detener = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setReproduciendo(false);
    setTiempo(0);
  };

  const handleClickButton = (beat) => {
    // Mismo beat: pausar / reanudar
    if (beatSeleccionado === beat.id_beat && audioRef.current) {
      if (audioRef.current.paused) audioRef.current.play();
      else audioRef.current.pause();
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const nuevoAudio = new Audio(beat.url_beat);
    nuevoAudio.addEventListener("play", () => setReproduciendo(true));
    nuevoAudio.addEventListener("pause", () => setReproduciendo(false));
    nuevoAudio.addEventListener("timeupdate", () => setTiempo(nuevoAudio.currentTime));
    nuevoAudio.addEventListener("loadedmetadata", () => setDuracion(nuevoAudio.duration));
    nuevoAudio.addEventListener("ended", () => {
      setReproduciendo(false);
      setTiempo(0);
    });

    audioRef.current = nuevoAudio;
    setBeatSeleccionado(beat.id_beat);
    setTiempo(0);
    setDuracion(0);
    nuevoAudio.play().catch((err) => console.error("No se pudo reproducir:", err));
  };

  const handleSeek = (fraccion) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = Math.min(Math.max(fraccion, 0), 1) * audio.duration;
    setTiempo(audio.currentTime);
  };

  const beatsDisponibles = beats.filter((beat) => beat.disponible_beat === true);

  const estaEnCarrito = (beat) =>
    cartItems.some((item) => item.id_beat === beat.id_beat);

  const handleAddToCart = (beat) => {
    if (!estaEnCarrito(beat)) {
      addToCart(beat);
    }
  };

  const beatActual = beats.find((b) => b.id_beat === beatSeleccionado);
  const progreso = duracion ? tiempo / duracion : 0;

  // Play del transporte: reanuda el beat actual o arranca el primero
  const handleTransportePlay = () => {
    if (beatActual) handleClickButton(beatActual);
    else if (beatsDisponibles[0]) handleClickButton(beatsDisponibles[0]);
  };

  // Clic en el carril: si es el beat activo, mueve el cabezal; si no, lo reproduce
  const handleClickCarril = (e, beat) => {
    if (beatSeleccionado === beat.id_beat) {
      const rect = e.currentTarget.getBoundingClientRect();
      handleSeek((e.clientX - rect.left) / rect.width);
    } else {
      handleClickButton(beat);
    }
  };

  const botonCarrito = (beat, extra = "") => {
    const enCarrito = estaEnCarrito(beat);
    return (
      <button
        className={`daw-btn daw-btn-carrito ${enCarrito ? "en-carrito" : ""} ${extra}`}
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart(beat);
        }}
        disabled={enCarrito}
        title={enCarrito ? "Ya está en el carrito" : "Añadir al carrito"}
      >
        {enCarrito ? <FaCheck /> : <FaCartPlus />}
        <span>{enCarrito ? "En carrito" : "Añadir"}</span>
      </button>
    );
  };

  const cabezal = beatActual && (
    <span className="daw-cabezal" style={{ left: `${progreso * 100}%` }} />
  );

  return (
    <div className="daw">
      {/* ---------- Barra de transporte ---------- */}
      <div className="daw-toolbar">
        <div className="daw-transporte">
          <button
            className={`daw-tbtn ${reproduciendo ? "on" : ""}`}
            onClick={handleTransportePlay}
            disabled={!beatsDisponibles.length}
            aria-label={reproduciendo ? "Pausar" : "Reproducir"}
          >
            {reproduciendo ? <FaPause /> : <FaPlay />}
          </button>
          <button
            className="daw-tbtn"
            onClick={detener}
            disabled={!beatActual}
            aria-label="Detener"
          >
            <FaStop />
          </button>
        </div>

        <div className="daw-lcd" title="Tiempo">
          <span className="daw-lcd-label">TIME</span>
          <span className="daw-lcd-valor">{formatearLCD(tiempo)}</span>
        </div>

        <div className="daw-lcd daw-lcd-chico" title="Pistas">
          <span className="daw-lcd-label">TRK</span>
          <span className="daw-lcd-valor">{cargando ? "--" : pad(beatsDisponibles.length)}</span>
        </div>

        <div className={`daw-vu ${reproduciendo ? "activo" : ""}`} aria-hidden="true">
          <i />
          <i />
        </div>

        <div className="daw-hint">
          {beatActual ? (
            <>
              <span className="daw-hint-nombre">♪ {beatActual.nombre_beat}</span>
              <span className="daw-hint-meta">
                {formatearTiempo(tiempo)} / {formatearTiempo(duracion)} · ${formatearPrecio(beatActual.precio)}
              </span>
            </>
          ) : (
            <span className="daw-hint-meta">
              {cargando ? "Cargando proyecto…" : "Haz clic en un clip para escucharlo"}
            </span>
          )}
        </div>

        {beatActual && botonCarrito(beatActual, "daw-btn-grande")}
      </div>

      {/* ---------- Ventana Playlist ---------- */}
      <div className="daw-ventana">
        <div className="daw-ventana-titulo">
          <span>Playlist</span>
          <span className="daw-ventana-sep">›</span>
          <span className="daw-ventana-sub">Beats</span>
          <span className="daw-ventana-luces">
            <i />
            <i />
            <i />
          </span>
        </div>

        <div className="daw-scroll">
          <div className="daw-playlist">
            {/* Regla de compases */}
            <div className="daw-fila daw-regla-fila">
              <div className="daw-cabecera daw-esquina">
                <span>Pista</span>
                <span>Precio</span>
              </div>
              <div className="daw-regla">
                {Array.from({ length: COMPASES }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
                {cabezal && (
                  <span className="daw-regla-marca" style={{ left: `${progreso * 100}%` }} />
                )}
              </div>
            </div>

            {/* Esqueleto de carga */}
            {cargando &&
              Array.from({ length: 6 }).map((_, i) => (
                <div className="daw-fila" key={`sk-${i}`}>
                  <div className="daw-cabecera">
                    <span className="sk sk-num" />
                    <span className="sk sk-cover" />
                    <span className="sk sk-text" />
                  </div>
                  <div className="daw-carril">
                    <span className="sk sk-clip" style={{ width: `${55 + ((i * 17) % 40)}%` }} />
                  </div>
                </div>
              ))}

            {!cargando && error && <p className="daw-vacio msg-error">{error}</p>}

            {!cargando && !error && beatsDisponibles.length === 0 && (
              <p className="daw-vacio">No hay beats disponibles aún</p>
            )}

            {!cargando &&
              beatsDisponibles.map((beat, index) => {
                const activo = beatSeleccionado === beat.id_beat;
                const sonando = activo && reproduciendo;
                const onda = generarOnda(beat.id_beat);
                return (
                  <div
                    className={`daw-fila daw-pista ${activo ? "activa" : ""} ${sonando ? "sonando" : ""}`}
                    key={beat.id_beat}
                    style={{ ...colorClip(beat.id_beat), animationDelay: `${index * 40}ms` }}
                  >
                    <div className="daw-cabecera">
                      <span className="daw-num">{pad(index + 1)}</span>
                      <span
                        className={`daw-led ${sonando ? "on" : ""}`}
                        title={sonando ? "Sonando" : ""}
                      />
                      <button
                        className="daw-cover"
                        onClick={() => handleClickButton(beat)}
                        aria-label={sonando ? `Pausar ${beat.nombre_beat}` : `Reproducir ${beat.nombre_beat}`}
                      >
                        <img src={beat.imagen_beat || "/unnamed.png"} alt="" />
                        <span className="daw-cover-play">{sonando ? <FaPause /> : <FaPlay />}</span>
                      </button>
                      <div className="daw-texto">
                        <span className="daw-nombre">{beat.nombre_beat}</span>
                        <span className="daw-precio">${formatearPrecio(beat.precio)}</span>
                      </div>
                      {botonCarrito(beat)}
                    </div>

                    <div
                      className="daw-carril"
                      onClick={(e) => handleClickCarril(e, beat)}
                      title={activo ? "Clic para mover el cabezal" : "Clic para reproducir"}
                    >
                      <div className="daw-clip">
                        <div className="daw-clip-titulo">{beat.nombre_beat}</div>
                        <div className="daw-clip-onda">
                          {onda.map((v, i) => (
                            <span
                              key={i}
                              className={activo && i / BARRAS_ONDA < progreso ? "llena" : ""}
                              style={{ height: `${v * 100}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      {cabezal}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

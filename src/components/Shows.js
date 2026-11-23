import React, { useEffect, useState } from 'react'
import "../styles/Shows.css"
import { LuCalendar, LuMapPin, LuExternalLink } from "react-icons/lu";
import { getShows } from '../services/showService';

const formatearFecha = (fecha) => {
  const d = new Date(fecha);
  if (isNaN(d)) return { dia: "--", mes: "", completa: fecha };
  return {
    dia: String(d.getDate()).padStart(2, "0"),
    mes: d.toLocaleDateString("es-CO", { month: "short" }).replace(".", ""),
    completa: d.toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" }),
  };
};

export const Shows = () => {

  const [shows, setShows] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtennerShows = async () => {
      try {
        const data = await getShows();
        setShows(data)
      } catch (error) {
        console.error("Error cargando shows:", error);
      } finally {
        setCargando(false)
      }
    };
    obtennerShows();
  }, []);

  return (
    <div className="page container-shows">
      <div className="page-head">
        <div className="eyebrow">
          <b>[02]</b> En vivo · {cargando ? "cargando…" : `${String(shows.length).padStart(2, "0")} fechas`}
        </div>
        <h1 className="display">Próximos shows.</h1>
      </div>

      {!cargando && shows.length === 0 && (
        <p className="shows-vacio">No hay shows programados por ahora</p>
      )}

      <div className='card-show'>
        {cargando && Array.from({ length: 3 }).map((_, i) => (
          <div className="shows-container card show-skeleton" key={i} />
        ))}

        {shows.map((show, i) => {
          const f = formatearFecha(show.fecha_show);
          return (
            <article className="shows-container card" key={show.id_show} style={{ animationDelay: `${i * 70}ms` }}>
              <div className="img-show">
                {show.imagen_show && <img src={show.imagen_show} alt={show.nombre_show} />}
                <div className="show-badge">
                  <span className="show-dia">{f.dia}</span>
                  <span className="show-mes">{f.mes}</span>
                </div>
              </div>

              <div className="info-show">
                <h4 className="show-fecha">{show.nombre_show}</h4>
                <p className="show-nombre"><LuCalendar /> {f.completa}</p>
                <p className="show-nombre"><LuMapPin /> {show.lugar_show}</p>
                {show.url_show && (
                  <a className="btn show-link" href={show.url_show} target="_blank" rel="noreferrer">
                    Entradas <LuExternalLink />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

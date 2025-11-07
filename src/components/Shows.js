import React, { useEffect, useState } from 'react'
import "../styles/Shows.css"
import { getShows } from '../services/showService';

export const Shows = () => {

  const [shows, setShows] = useState([])

  useEffect(() => {
    const obtennerShows = async () => {
      try {
        const data = await getShows();
        setShows(data)
      } catch (error) {
        console.error("Error cargando shows:", error);
      }
    };
    obtennerShows();
  }, []);

  // const shows = [
  //   {
  //     id: 1,
  //     nombre: "Show 1",
  //     fecha: "fecha 1",
  //     imagen: "/images/madrid.jpg",
  //   },
  //   {
  //     id: 2,
  //     nombre: "Show 2",
  //     fecha: "fecha 2",
  //     imagen: "/images/barcelona.jpg",
  //   },
  //   {
  //     id: 3,
  //     nombre: "Show 3",
  //     fecha: "fecha 3",
  //     imagen: "/images/valencia.jpg",
  //   },
  //    {
  //     id: 4,
  //     nombre: "Show 4",
  //     fecha: "fecha 4",
  //     imagen: "/images/madrid.jpg",
  //   },
  //   {
  //     id: 5,
  //     nombre: "Show 5",
  //     fecha: "fecha 5",
  //     imagen: "/images/barcelona.jpg",
  //   },
  //   {
  //     id: 6,
  //     nombre: "Show 6",
  //     fecha: "fecha 6",
  //     imagen: "/images/valencia.jpg",
  //   },
  // ];


  return (
    <div className="container-shows">
      <div className='card-show'>
      {shows.map((show) => (
        <div className="shows-container" key={show.id_show}>
          <div className="img-show">
            <img src={show.imagen_show} />
          </div>

          <div className="info-show">
            <p className="show-nombre">{show.fecha_show}</p>
            <p className="show-nombre">{show.lugar_show}</p>
            <h4 className="show-fecha">{show.nombre_show}</h4>
            <p className="show-nombre">{show.url_show}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};
import React from 'react'
import "../styles/Shows.css"

export const Shows = () => {

  const shows = [
    {
      id: 1,
      nombre: "Show 1",
      fecha: "fecha 1",
      imagen: "/images/madrid.jpg",
    },
    {
      id: 2,
      nombre: "Show 2",
      fecha: "fecha 2",
      imagen: "/images/barcelona.jpg",
    },
    {
      id: 3,
      nombre: "Show 3",
      fecha: "fecha 3",
      imagen: "/images/valencia.jpg",
    },
     {
      id: 4,
      nombre: "Show 4",
      fecha: "fecha 4",
      imagen: "/images/madrid.jpg",
    },
    {
      id: 5,
      nombre: "Show 5",
      fecha: "fecha 5",
      imagen: "/images/barcelona.jpg",
    },
    {
      id: 6,
      nombre: "Show 6",
      fecha: "fecha 6",
      imagen: "/images/valencia.jpg",
    },
  ];


  return (
    <div className="container-shows">
      <div className='card-show'>
      {shows.map((show) => (
        <div className="shows-container" key={show.id}>
          <div className="img-show">
            <img src={show.imagen} />
          </div>

          <div className="info-show">
            <p className="show-nombre">{show.nombre}</p>
            <h4 className="show-fecha">{show.fecha}</h4>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};
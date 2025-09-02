import React from 'react'
import '../styles/Header.css'
import { MdOutlineMenu } from "react-icons/md";

export const Header = ({ toggleMenu }) => {

  return (
    <div className='header'>
       <button className='botonMenu' onClick={toggleMenu}>
            <MdOutlineMenu className='iconoMenu'/>
       </button>
       <h1>[Icono]</h1>
        <h1>Nombre</h1>

        
        
    </div>
  )
}

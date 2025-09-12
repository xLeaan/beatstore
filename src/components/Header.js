import React from 'react'
import '../styles/Header.css'
import { MdOutlineMenu } from "react-icons/md";
import { CgProfile } from 'react-icons/cg';
import { FaCartShopping } from 'react-icons/fa6';
import { IoIosHelpCircleOutline } from 'react-icons/io';

export const Header = ({ toggleMenu, setActiveHeaderComponent }) => {

  return (
    <div className='header'>
       <button className='botonMenu' onClick={toggleMenu}>
            <MdOutlineMenu className='iconoMenu'/>
       </button>
       <h1>[Icono]</h1>
        <h1>Nombre</h1>
        <div className='iconos'>
            <CgProfile onClick={() => setActiveHeaderComponent("Perfil")} />
            <FaCartShopping />
            <IoIosHelpCircleOutline />
        </div>

        
        
    </div>
  )
}

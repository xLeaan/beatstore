import React, { useState } from 'react'
import '../styles/Header.css'
import { MdOutlineMenu } from "react-icons/md";
import { CgProfile } from 'react-icons/cg';
import { FaCartShopping } from 'react-icons/fa6';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import CartBubble from './CartBuble';


export const Header = ({ toggleMenu, setActiveHeaderComponent }) => {

  const [carritoOpen, setCarritoOpen] = useState(false);

   

  return (
    <div className='header'>
       <button className='botonMenu' onClick={toggleMenu}>
            <MdOutlineMenu className='iconoMenu'/>
       </button>
       <h1>[Icono]</h1>
        <h1>Nombre</h1>
        <div className='iconos'>
            <CgProfile onClick={() => setActiveHeaderComponent("Perfil")} />
             <div className="cart-container">
              <FaCartShopping onClick={() => setCarritoOpen((prev) => !prev)} />
                    {carritoOpen && (
        <div className="cart-overlay" onClick={() => setCarritoOpen(false)}>
          <div
            className="cart-bubble"
            onClick={(e) => e.stopPropagation()}
          >
            <CartBubble
              onClose={() => setCarritoOpen(false)}
              setActiveHeaderComponent={setActiveHeaderComponent}
            />
          </div>
        </div>
      )}

            </div>
            <IoIosHelpCircleOutline onClick={() => setActiveHeaderComponent("Ayuda")} />
        </div>

        
        
    </div>
  )
}

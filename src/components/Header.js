import React, { useState } from 'react'
import '../styles/Header.css'
import { MdOutlineMenu } from "react-icons/md";
import { CgProfile } from 'react-icons/cg';
import { FaCartShopping } from 'react-icons/fa6';
import { IoIosHelpCircleOutline, IoIosLogOut } from 'react-icons/io';
import CartBubble from './CartBuble';
import { useUser } from '../context/UserContext';


export const Header = ({ toggleMenu, setActiveHeaderComponent }) => {

  const [carritoOpen, setCarritoOpen] = useState(false);
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
  }

  return (
    <div className='header'>
      <button className='botonMenu' onClick={toggleMenu}>
        <MdOutlineMenu className='iconoMenu' />
      </button>
      <h1 onClick={() => setActiveHeaderComponent(null)} style={{cursor: 'pointer'}}>[Icono]</h1>
      <h1 onClick={() => setActiveHeaderComponent(null)} style={{cursor: 'pointer'}}>Nombre</h1>
      <div className='iconos'>
        {user ? `${user.nombre}` : <CgProfile onClick={() => setActiveHeaderComponent("Perfil")} />}
        
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

          {user && 
            <IoIosLogOut onClick={handleLogout} />
          }
      </div>

      


    </div>
  )
}

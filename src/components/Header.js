import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import '../styles/Header.css'
import { MdOutlineMenu } from "react-icons/md";
import { FaCartShopping } from 'react-icons/fa6';
import { LuUser, LuLogOut, LuCircleHelp } from 'react-icons/lu';
import CartBubble from './CartBuble';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';

// Cambia aquí el nombre de tu marca
const MARCA = "beatsdrip";

export const Header = ({ toggleMenu, setActiveHeaderComponent }) => {

  const [carritoOpen, setCarritoOpen] = useState(false);
  const { user, setUser } = useUser();
  const { cartItems } = useCart();

  // Cerrar el carrito con Escape y bloquear el scroll de fondo mientras está abierto
  useEffect(() => {
    if (!carritoOpen) return;
    const onKey = (e) => e.key === 'Escape' && setCarritoOpen(false);
    document.addEventListener('keydown', onKey);
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflowPrevio;
    };
  }, [carritoOpen]);

  const handleLogout = () => {
    setUser(null);
  }

  return (
    <header className='header'>
      <div className='header-izq'>
        <button className='header-icon-btn' onClick={toggleMenu} aria-label='Abrir / cerrar menú'>
          <MdOutlineMenu />
        </button>
        <button className='marca' onClick={() => setActiveHeaderComponent(null)}>
          {MARCA}<span>.</span>
        </button>
      </div>

      <div className='header-estado'>
        <span className='punto-online' /> Studio online
        <span className='sep'>·</span>
        {cartItems.length} en carrito
      </div>

      <div className='iconos'>
        {user ? (
          <span className='header-user'>
            <LuUser /> {user.nombre}
          </span>
        ) : (
          <button className='header-pill' onClick={() => setActiveHeaderComponent("Perfil")}>
            + Iniciar sesión
          </button>
        )}

        <button
          className='header-icon-btn'
          onClick={() => setActiveHeaderComponent("Ayuda")}
          aria-label='Ayuda'
        >
          <LuCircleHelp />
        </button>

        <div className="cart-container">
          <button
            className='header-icon-btn header-cart'
            onClick={() => setCarritoOpen((prev) => !prev)}
            aria-label='Carrito'
          >
            <FaCartShopping />
            {cartItems.length > 0 && <span className='cart-badge'>{cartItems.length}</span>}
          </button>
        </div>

        {user &&
          <button className='header-icon-btn' onClick={handleLogout} aria-label='Cerrar sesión'>
            <LuLogOut />
          </button>
        }
      </div>

      {/* El carrito se renderiza en <body> con un portal: el backdrop-filter del header
          convierte a éste en el contenedor de los elementos position:fixed y lo recortaba */}
      {carritoOpen && createPortal(
        <div className="cart-overlay" onClick={() => setCarritoOpen(false)}>
          <div
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Carrito"
          >
            <CartBubble
              onClose={() => setCarritoOpen(false)}
              setActiveHeaderComponent={setActiveHeaderComponent}
            />
          </div>
        </div>,
        document.body
      )}
    </header>
  )
}

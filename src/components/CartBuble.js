import React from "react";
import '../styles/CartBubble.css';
import { useCart } from "../context/CartContext";

export default function CartBubble({ onClose, setActiveHeaderComponent }) {

  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-bubble">
      <p className="title">Carrito</p>

      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                {item.nombre_beat} - ${item.precio}
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id_beat)}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
          <button className="checkout" onClick={() => {setActiveHeaderComponent("Carrito"); onClose();}}>Ir al pago</button>
        </>
      ) : (
        <p>Tu carrito está vacío</p>
      )}

      <button className="close-btn" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
}

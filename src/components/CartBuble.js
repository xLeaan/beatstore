import React, { useState } from "react";
import '../styles/CartBubble.css';

export default function CartBubble({ onClose, setActiveHeaderComponent }) {

  const [items, setItems] = useState([
    { id: 1, name: "Producto 1" },
    { id: 2, name: "Producto 2" },
  ]);

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="cart-bubble">
      <p className="title">Carrito</p>

      {items.length > 0 ? (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                {item.name}
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
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

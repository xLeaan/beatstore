import React from "react";
import '../styles/CartBubble.css';
import { IoClose } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";
import { useCart } from "../context/CartContext";

export default function CartBubble({ onClose, setActiveHeaderComponent }) {

  const { cartItems, removeFromCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + (Number(item.precio) || 0), 0);

  return (
    <div className="cart-bubble">
      <div className="bubble-head">
        <div>
          <div className="eyebrow"><b>[{String(cartItems.length).padStart(2, "0")}]</b> Items</div>
          <p className="title">Carrito</p>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Cerrar">
          <IoClose />
        </button>
      </div>

      {cartItems.length > 0 ? (
        <>
          <ul className="bubble-lista">
            {cartItems.map((item) => (
              <li key={item.id_beat} className="bubble-item">
                <img src={item.imagen_beat || "/unnamed.png"} alt="" />
                <div className="bubble-info">
                  <span className="bubble-nombre">{item.nombre_beat}</span>
                  <span className="bubble-precio">${Number(item.precio).toLocaleString("es-CO")}</span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id_beat)}
                  aria-label={`Quitar ${item.nombre_beat}`}
                >
                  <LuTrash2 />
                </button>
              </li>
            ))}
          </ul>

          <div className="bubble-pie">
            <div className="bubble-total">
              <span className="eyebrow">Total</span>
              <span>${total.toLocaleString("es-CO")}</span>
            </div>
            <button
              className="btn btn-primary btn-block"
              onClick={() => { setActiveHeaderComponent("Carrito"); onClose(); }}
            >
              Ir al pago →
            </button>
          </div>
        </>
      ) : (
        <div className="bubble-vacio">
          <p>Tu carrito está vacío</p>
          <span className="eyebrow">Dale play a algún beat y añádelo</span>
        </div>
      )}
    </div>
  );
}

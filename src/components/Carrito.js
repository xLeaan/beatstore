import React from "react";
import "../styles/Carrito.css";
import { useCart } from "../context/CartContext";

export const Carrito = ({ setActiveHeaderComponent }) => {
  const { cartItems, removeFromCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + (item.precio || 0), 0);

  const pagarConEpayco = () => {
  // console.log("EPAYCO KEY:", process.env.REACT_APP_PUBLIC_KEY_EPAYCO);

  const handler = window.ePayco.checkout.configure({
    key: process.env.REACT_APP_PUBLIC_KEY_EPAYCO,
    test: true,
  });

  handler.open({
    name: "Compra de beats",
    description: `Compra de ${cartItems.length} beats`,
    amount: total, 
    currency: "cop",
    country: "co",
    tax: "0",
    tax_base: total,
  });
};


  return (
    <div className="container-carrito">
      <h2 className="titulo-carrito">Elementos de tu carrito:</h2>

      {cartItems.length > 0 ? (
        <ul className="lista-carrito">
          {cartItems.map((item) => (
            <li key={item.id_beat} className="cart-item">
              <img
                src={item.imagen_beat || "/unnamed.png"}
                alt={item.nombre_beat}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <span className="cart-item-name">{item.nombre_beat}</span>
                <span className="cart-item-price">${item.precio}</span>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id_beat)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="carrito-vacio">Tu carrito está vacío</p>
      )}

      {cartItems.length > 0 && (
        <div className="total-carrito">
          <strong>Total:</strong>{" "}
          ${cartItems.reduce((acc, item) => acc + (item.precio || 0), 0)}
        </div>
      )}

       <button 
        className="pagar-btn"
        onClick={pagarConEpayco}>
        Ir al pago
      </button>

      <button
        className="volver-btn"
        onClick={() => setActiveHeaderComponent(null)}
      >
        Volver
      </button>
     

    </div>
  );
};

import React from "react";
import "../styles/Carrito.css";
import { LuArrowLeft, LuTrash2 } from "react-icons/lu";
import { useCart } from "../context/CartContext";

export const Carrito = ({ setActiveHeaderComponent }) => {
  const { cartItems, removeFromCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + (Number(item.precio) || 0), 0);

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
    response: "http://localhost:3000/pago-confirmado",
    confirmation: "http://localhost:5000/api/epayco/confirm",
  });
};


  return (
    <div className="page container-carrito">
      <div className="page-head">
        <button className="volver-link" onClick={() => setActiveHeaderComponent(null)}>
          <LuArrowLeft /> Volver a beats
        </button>
        <div className="eyebrow" style={{ marginTop: 24 }}>
          <b>[{String(cartItems.length).padStart(2, "0")}]</b> Checkout
        </div>
        <h1 className="display">Tu carrito.</h1>
      </div>

      <div className="carrito-grid">
        <div className="card carrito-lista-card">
          {cartItems.length > 0 ? (
            <ul className="lista-carrito">
              {cartItems.map((item, i) => (
                <li key={item.id_beat} className="cart-item">
                  <span className="cart-item-num">{String(i + 1).padStart(2, "0")}</span>
                  <img
                    src={item.imagen_beat || "/unnamed.png"}
                    alt={item.nombre_beat}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.nombre_beat}</span>
                    <span className="cart-item-sub">Licencia de beat</span>
                  </div>
                  <span className="cart-item-price">${Number(item.precio).toLocaleString("es-CO")}</span>
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
          ) : (
            <p className="carrito-vacio">Tu carrito está vacío</p>
          )}
        </div>

        <aside className="card resumen">
          <div className="eyebrow">Resumen</div>
          <div className="resumen-fila">
            <span>Beats</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="resumen-fila">
            <span>Impuestos</span>
            <span>$0</span>
          </div>
          <div className="total-carrito">
            <span>Total</span>
            <span>${total.toLocaleString("es-CO")} <small>COP</small></span>
          </div>

          <button
            className="btn btn-primary btn-block pagar-btn"
            onClick={pagarConEpayco}
            disabled={cartItems.length === 0}
          >
            Ir al pago →
          </button>

          <button
            className="btn btn-block volver-btn"
            onClick={() => setActiveHeaderComponent(null)}
          >
            Seguir comprando
          </button>
        </aside>
      </div>
    </div>
  );
};

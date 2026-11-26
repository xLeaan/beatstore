import React, { useState } from "react";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { Beats } from "./components/Beats";
import { Shows } from "./components/Shows";
import { Acerca } from "./components/Acerca";
import { Perfil } from "./components/Perfil";
import { Carrito } from "./components/Carrito";
import { Admin } from "./components/Admin";
import { CartProvider } from "./context/CartContext";
import "./App.css";


const App = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeView, setActiveView] = useState("Beats");
   const [activeHeaderComponent, setActiveHeaderComponent] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Vuelve al inicio, en la sección de Beats
  const irAlInicio = () => {
    setActiveView("Beats");
    setActiveHeaderComponent(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case "Beats":
        return <Beats />;
      case "Shows":
        return <Shows />;
      case "Acerca":
        return <Acerca />;
      case "Admin":
        return <Admin />;
      default:
        return <Beats />;
    }
  };

   const renderHeaderContent = () => {
    switch (activeHeaderComponent) {
      case "Perfil":
        return <Perfil setActiveHeaderComponent={setActiveHeaderComponent} irAlInicio={irAlInicio} />;
      case "Carrito":
        return <Carrito setActiveHeaderComponent={setActiveHeaderComponent} />
      default:
        return null;
    }
  };

  return (
    <CartProvider>
    <div className="app-shell">
      <Header 
        toggleMenu={toggleMenu}  
        setActiveHeaderComponent={setActiveHeaderComponent}  
        activeHeaderComponent={activeHeaderComponent} 
      />

      <div className="app-body">
        {!activeHeaderComponent && menuOpen && <SideBar activeView={activeView} setActiveView={setActiveView} />}
        <main className="app-main">
          {activeHeaderComponent ? renderHeaderContent() : renderContent()}
        </main>
      </div>
    </div>
    </CartProvider>
  );
};

export default App;

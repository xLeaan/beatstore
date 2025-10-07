import React, { useState } from "react";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { Beats } from "./components/Beats";
import { Shows } from "./components/Shows";
import { Acerca } from "./components/Acerca";
import { Perfil } from "./components/Perfil";
import { Carrito } from "./components/Carrito";
import { Ayuda } from "./components/Ayuda";
import { Admin } from "./components/Admin";



const App = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeView, setActiveView] = useState("Beats");
   const [activeHeaderComponent, setActiveHeaderComponent] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
        return <Perfil setActiveHeaderComponent={setActiveHeaderComponent} />;
      case "Carrito":
        return <Carrito setActiveHeaderComponent={setActiveHeaderComponent} />
      case "Ayuda":
        return <Ayuda setActiveHeaderComponent={setActiveHeaderComponent} />
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header toggleMenu={toggleMenu}  setActiveHeaderComponent={setActiveHeaderComponent}  activeHeaderComponent={activeHeaderComponent} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {!activeHeaderComponent && menuOpen && <SideBar activeView={activeView} setActiveView={setActiveView} />}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {activeHeaderComponent ? renderHeaderContent() : renderContent()}
        </div>
      </div>
    </div>

  );
};

export default App;

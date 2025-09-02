import React, { useState } from "react";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div>
      <Header toggleMenu={toggleMenu} />

      <div style={{ display: "flex" }}>
        {menuOpen && <SideBar />}
        <Content />         
      </div>
    </div>
  );
};

export default App;

import React from "react";
import "../styles/SideBar.css";
import { LuDisc3, LuMusic, LuInfo, LuShieldCheck } from "react-icons/lu";
import { useUser } from "../context/UserContext";

export const SideBar = ({ activeView, setActiveView }) => {

  const { user } = useUser();

  const items = [
    { id: "Beats", label: "Beats", icon: <LuDisc3 /> },
    { id: "Shows", label: "Shows", icon: <LuMusic /> },
    { id: "Acerca", label: "Acerca de", icon: <LuInfo /> },
  ];
  if (user?.admin) {
    items.push({ id: "Admin", label: "Admin", icon: <LuShieldCheck /> });
  }

  return (
    <aside className="sidebar">
      <div className="eyebrow sidebar-titulo">Secciones</div>
      <nav className="menu">
        {items.map((item, i) => (
          <button
            key={item.id}
            className={`menu-item ${activeView === item.id ? "active" : ""}`}
            onClick={() => setActiveView(item.id)}
          >
            <span className="menu-num">[{String(i + 1).padStart(2, "0")}]</span>
            <span className="icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-pie eyebrow">
        Bar 001 / 128 · 4/4
      </div>
    </aside>
  );
};

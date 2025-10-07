import React from "react";
import "../styles/SideBar.css";
import { MdOutlineStars } from "react-icons/md";
import { LuMusic } from "react-icons/lu";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useUser } from "../context/UserContext";
import { FaUserShield } from "react-icons/fa6";

export const SideBar = ({ activeView, setActiveView }) => {

  const { user } =  useUser();


  return (
    <div className="sidebar">
      <div className="menu">
        <div
          className={`menu-item menu-item-beats ${activeView === "Beats" ? "active" : "disabled"}`}
          onClick={() => setActiveView("Beats")}
        >
          <MdOutlineStars className="icon" />
        <span>Beats</span>
      </div>

      <div
          className={`menu-item menu-item-shows ${activeView === "Shows" ? "active" : "disabled"}`}
          onClick={() => setActiveView("Shows")}
        >
          <LuMusic className="icon" />
        <span>Shows</span>
      </div>

      <div
          className={`menu-item menu-item-acerca ${activeView === "Acerca" ? "active" : "disabled"}`}
          onClick={() => setActiveView("Acerca")}
        >
          <IoAlertCircleOutline className="icon" />
        <span>Acerca de{}</span>
      </div>

      {user?.admin && (
          <div
            className={`menu-item menu-item-admin ${
              activeView === "Admin" ? "active" : "disabled"
            }`}
            onClick={() => setActiveView("Admin")}
          >
            <FaUserShield className="icon" />
            <span>Admin</span>
          </div>
        )}

      </div>
    </div>
  );
};

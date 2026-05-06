import { Link } from "react-router-dom";
import React from "react";

export default function Sidebar({collapsed}) {
  return (
    <div
      className={`bg-dark text-white p-3 position-fixed h-100 ${collapsed ? "d-none" : ""}`} style={{ width: "220px" }}
    >
      <h2>Menu</h2>
      <ul className="nav flex-column">  {/* menu list maken met link voor switchen naar pagina's*/ }
        <li className="nav-item mb-3">
          <Link className="text-white text-decoration-none" to="/">
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="text-white text-decoration-none" to="/users">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="text-white text-decoration-none" to="/settings">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
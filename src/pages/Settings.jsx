import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function Settings() {
  const [username, setUsername] = useState('');  // instellingen bijhouden in de state hooks
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState(true);
  const [saved, setSaved] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");  // bij laden pagina eerder opgeslagen instellingen ophalen uit localstorage
    const savedEmail = localStorage.getItem("email");
    const savedTheme = localStorage.getItem("theme");

    if (savedUsername) setUsername(savedUsername);  // laden in juiste use state zodat velden worden ingevuld voor theme vergelijken met light
    if (savedEmail) setEmail(savedEmail);
    if (savedTheme) setTheme(savedTheme === "light");
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = theme ? "#fff" : "#222";  // thema aanpassen voor pagina word uitgevoerd als theme verandert
    document.body.style.color = theme ? "#000" : "#fff"; // pas text kleur aan 
  }, [theme]);

  function handleSave() {
    localStorage.setItem("username", username);  // functie voor klikken opslaan set items in localstorage en setSaved op true
    localStorage.setItem("email", email);
    localStorage.setItem("theme", theme ? "light" : "dark");

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);  // melding verwijnd na 3 sec
  }

 return (
  <div className="d-flex" >
    <Sidebar collapsed={sidebarCollapsed} />
    <div
      className="container-fluid p-4"
      style={{ marginLeft: sidebarCollapsed ? 0 : "220px" }}
    >
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      >
        {sidebarCollapsed ? "=" : "X"}
      </button>

      <h2 className="text-center mb-4">Settings</h2>
      <div className="p-4 border rounded shadow-sm bg-light" style={{maxWidth: "500px", textAlign: "center", margin: "auto"}} >
        <input
          type="text"
          value={username}
          placeholder="Gebruikersnaam"
          className="form-control mb-3"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          className="form-control mb-3"
          onChange={e => setEmail(e.target.value)}
        />
        <select
          value={theme ? "light" : "dark"}
          className="form-select mb-4"
          onChange={e => setTheme(e.target.value === "light")}
        >
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
        </select>
        <button className="btn btn-primary w-100" onClick={handleSave}>
          Opslaan
        </button>
        {saved && (
          <p className="mt-3 text-center text-success fw-semibold">
            Instellingen opgeslagen!
          </p>
        )}
      </div>
    </div>
  </div>
);
}
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Users() {
  const [users, setUsers] = useState([]);  // sla gebruikers op in de state userss
  const [searchTerm, setSearchTerm] = useState("");  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // filteren van gebruikers op naam en email 
  const filteredUsers = users.filter(user => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Fout bij ophalen:", error));   // haal lijst met gebruikers op vanuit api
  }, []);

 return (
  <div className="d-flex">
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

      <h2 className="text-center mb-4">Gebruikers</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Zoeken op naam of email..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Naam</th>
            <th>Email</th>
            <th>Bedrijf</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                Geen gebruikers gevonden.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}
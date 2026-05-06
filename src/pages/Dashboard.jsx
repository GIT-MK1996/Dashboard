import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";
import DashboardChart from "../components/DashboardChart";
import { data } from "react-router-dom";
import OrderTable from "../components/OrderTable";

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0); // data uit api word opgeslagen in state hooks
  const [revenue, setRevenue] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // haal gebruikers, bestellingen en omzet op uit API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUserCount(data.length))
      .catch((err) => console.error("User fetch error:", err));

    // useeffect response moet json zijn daarna data ophalen en in usercount zetten met lenght (aantal users) catch error

    fetch("https://fakestoreapi.com/carts")
      .then((res) => res.json())
      .then((data) => setOrdersCount(data.length))
      .catch((err) => console.error("Orders fetch error:", err));

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const total = data.reduce((sum, product) => sum + product.price, 0);
        setRevenue(total.toFixed(2));
      })
      .catch((err) => console.error("Revenue fetch error:", err));
  }, []);

  // voor producten zet de revenue met reduce voor optellen van product price in sum

  const cards = [
    { title: "Gebruikers", value: userCount, icon: "👤" },
    { title: "Bestellingen", value: ordersCount, icon: "📦" }, // data gebruiken uit api om card te vullen
    { title: "Omzet", value: `€${revenue}`, icon: "💰" },
  ];

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
        <h2 className="text-center mb-4">Dashboard</h2>
        <div className="row g-4">
          {cards.map((card, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <Card title={card.title} value={card.value} icon={card.icon} />
            </div>
          ))}
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <DashboardChart />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <OrderTable />
          </div>
        </div>
      </div>
    </div>
  );
}
// voeg bootstrap toe voor styling eventueel nog css

// overzicht van de app waar belangrijke cijfers worden weergegeven

// api simuleert echte backend, leren data ophalen en gebruiken
// state hooks zorgen dat react reageert als data binnenkomt
// structuur met aparte componenten zorgt voor herbruikbaarheid en overzicht

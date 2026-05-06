import React, { useState, useEffect } from "react";

export default function OrderTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/carts")
      .then((res) => res.json())
      .then((data) => {
        // Sorteer op datum (nieuwste eerst)
        const sorted = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        // Pak de laatste 5 bestellingen
        const recentOrders = sorted.slice(0, 5);
        setOrders(recentOrders);
      })
      .catch((err) => console.error("Orders ophalen mislukt:", err));
  }, []);

  return (
    <div className="card mt-5 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title text-center mb-4">Laatste Bestellingen</h5>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Gebruiker</th>
                <th>Aantal producten</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>
                  <td>{order.products.length}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

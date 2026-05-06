
import React from "react";

export default function Card({ title, value, icon }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
        <div className="fs-1">{icon}</div>
        <h5 className="card-title mt-3">{title}</h5>
        <p className="card-text fs-4 fw-bold">{value}</p>
      </div>
    </div>
  );
}

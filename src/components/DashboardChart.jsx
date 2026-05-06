import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// voorbeelddata met omzet per maand
const alleData = [
  { maand: "Jan", omzet: 500 },
  { maand: "Feb", omzet: 700 },
  { maand: "Mrt", omzet: 600 },
  { maand: "Apr", omzet: 800 },
  { maand: "Mei", omzet: 900 },
  { maand: "Jun", omzet: 750 },
];




export default function DashboardChart() {
  const [periode, setPeriode] = useState("1m");

  const getFilteredData = () => {
  switch (periode) {
    case "1m": return alleData.slice(-1);
    case "3m": return alleData.slice(-3);
    case "6m": return alleData.slice(-6);
    case "1y":
    default: return alleData;
  }
};


  return (
    // card container met vaste breedte en hoogte voor goede layout
    <div
      className="card mt-5 shadow-sm border-0"
      style={{ width: 600, height: 350, margin: "auto" }}
    >
      {/* card body vult de hele container */}
      <div className="card-body" style={{ height: "100%" }}>
        {/* titel van de grafiek */}
        <h5 className="card-title text-center mb-4">Omzet per maand</h5>
        <select value={periode} onChange={(e) => setPeriode(e.target.value)}>
          <option value="1m">1 maand</option>
          <option value="3m">3 maanden</option>
          <option value="6m">6 maanden</option>
          <option value="1y">1 jaar</option>
        </select>

        {/* responsiveContainer zorgt ervoor dat de grafiek schaalt met de container */}
        <ResponsiveContainer width="100%" height="85%">
          {/* barChart krijgt de data binnen */}
          <BarChart data={getFilteredData()}>
            {/* X-as met maanden, key is "maand" */}
            <XAxis dataKey="maand" />
            {/* Y-as met automatische schaal */}
            <YAxis />
            {/* tooltip die info toont bij hover over staven */}
            <Tooltip />
            {/* staafjes met omzet in blauwe kleur */}
            <Bar dataKey="omzet" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* git pull oefen */

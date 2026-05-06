import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { maand: "Jan", omzet: 500 },
  { maand: "Feb", omzet: 700 },
  { maand: "Mrt", omzet: 600 },
  { maand: "Apr", omzet: 800 },
  { maand: "Mei", omzet: 900 },
  { maand: "Jun", omzet: 750 },
];

export default function TestChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="maand" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="omzet" fill="#0d6efd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

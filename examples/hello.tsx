import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const data = [
  { name: "Jan", users: 400, revenue: 240 },
  { name: "Feb", users: 300, revenue: 139 },
  { name: "Mar", users: 500, revenue: 480 },
  { name: "Apr", users: 478, revenue: 390 },
  { name: "May", users: 589, revenue: 480 },
  { name: "Jun", users: 639, revenue: 580 },
];

export default function Hello() {
  return (
    <div className="p-10 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Hello, Poster</h1>
        <p className="text-neutral-500 mt-1">
          A single HTML file. Live React. Exportable via the toolbar.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h2 className="font-medium mb-4">Users</h2>
          <LineChart width={420} height={220} data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h2 className="font-medium mb-4">Revenue</h2>
          <BarChart width={420} height={220} data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Bar dataKey="revenue" fill="#10b981" isAnimationActive={false} />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

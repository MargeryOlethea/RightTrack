/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell } from "recharts";

const SpendingChart = ({ spending }) => {
  const data = [
    { name: "Shopping", value: spending?.shopping },
    { name: "Transportation", value: spending?.transportation },
    { name: "Food", value: spending?.food },
    { name: "Entertainment", value: spending?.entertainment },
    { name: "Bills", value: spending?.bills },
    { name: "Health", value: spending?.health },
    { name: "Clothes", value: spending?.clothes },
    { name: "Education", value: spending?.education },
    { name: "Gift", value: spending?.gift },
    { name: "Savings", value: spending?.savings },
    { name: "Other", value: spending?.other },
  ];

  const COLORS = [
    "#818cf8",
    "#4ade80",
    "#fb923c",
    "#facc15",
    "#c084fc",
    "#f87171",
    "#60a5fa",
    "#2dd4bf",
    "#f472b6",
    "#e879f9",
    "#9ca3af",
  ];
  return (
    <>
      <div className="w-full h-full p-0 m-0 ">
        <PieChart width={350} height={350}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name }) => name}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </>
  );
};

export default SpendingChart;

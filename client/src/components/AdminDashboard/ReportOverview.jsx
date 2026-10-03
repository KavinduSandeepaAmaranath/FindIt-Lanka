import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { overviewData } from "../../data/AdminDashboard";

const ReportOverview = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-5 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Report Overview</h2>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={overviewData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="found" stroke="#22c55e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReportOverview;
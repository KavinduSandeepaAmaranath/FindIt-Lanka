import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { categoryData } from "../../data/AdminDashboard";

const ReportsByCategory = () => {
  const total = categoryData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    // ADDED: transition-all duration-300 for smooth animation
    // ADDED: hover:shadow-lg and hover:scale-[1.01] for interactive lift effect
    <div className="bg-white rounded-xl shadow-sm p-5 h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Reports by Category
      </h2>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {categoryData.map((entry, index) => (
          // ADDED: transition-colors and hover:bg-gray-50 for list interactivity
          <div 
            key={index} 
            className="flex items-center justify-between text-sm p-1 rounded-lg transition-colors duration-200 hover:bg-gray-50 cursor-default"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }} 
              />
              <span className="text-gray-600">{entry.name}</span>
            </div>
            <span className="font-semibold text-gray-800">
              {((entry.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsByCategory;
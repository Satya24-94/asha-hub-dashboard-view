
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export const PerformanceChart = () => {
  const weeklyData = [
    { day: "Mon", completed: 24, pending: 6 },
    { day: "Tue", completed: 28, pending: 4 },
    { day: "Wed", completed: 22, pending: 8 },
    { day: "Thu", completed: 26, pending: 5 },
    { day: "Fri", completed: 30, pending: 3 },
    { day: "Sat", completed: 18, pending: 2 },
    { day: "Sun", completed: 16, pending: 1 }
  ];

  const taskTypeData = [
    { name: "Health Checkups", value: 35, color: "#3B82F6" },
    { name: "Immunizations", value: 25, color: "#10B981" },
    { name: "Maternal Care", value: 20, color: "#F59E0B" },
    { name: "Data Collection", value: 15, color: "#EF4444" },
    { name: "Other", value: 5, color: "#8B5CF6" }
  ];

  return (
    <div className="space-y-4">
      {/* Weekly Performance */}
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Weekly Task Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Bar dataKey="completed" fill="#10B981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="pending" fill="#F59E0B" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-600">Pending</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Distribution */}
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Task Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {taskTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {taskTypeData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div 
                  className="h-3 w-3 rounded"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

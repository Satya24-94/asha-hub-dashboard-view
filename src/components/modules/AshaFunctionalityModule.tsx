
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { AshaFunctionality, Profile } from '@/types/database';
import { useAuth } from '@/hooks/useAuth';

export const AshaFunctionalityModule = () => {
  const [data, setData] = useState<(AshaFunctionality & { asha: Profile })[]>([]);
  const [ashas, setAshas] = useState<Profile[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  const tasks = [
    { key: 'newborn_visit_1st_day', label: 'Newborn visit on 1st day (home delivery)' },
    { key: 'home_visits_newborn_care', label: 'Home visits for newborn care (HBNC)' },
    { key: 'vhnd_attendance', label: 'VHND attendance & immunization promotion' },
    { key: 'institutional_delivery_support', label: 'Institutional delivery support' },
    { key: 'childhood_illness_management', label: 'Management of childhood illness' },
    { key: 'nutrition_counseling', label: 'Nutrition counseling during household visits' },
    { key: 'malaria_fever_management', label: 'Malaria slide/fever case management' },
    { key: 'dots_provision', label: 'DOTS provision' },
    { key: 'vhsnc_meeting_attendance', label: 'VHSNC meeting attendance' },
    { key: 'referral_sterilization_services', label: 'Referral for sterilization/OCP/condom provision' },
  ];

  useEffect(() => {
    if (profile) {
      fetchData();
    }
  }, [profile, selectedMonth, selectedYear]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch ASHAs under this facilitator
      const { data: ashaData, error: ashaError } = await supabase
        .from('profiles')
        .select('*')
        .eq('facilitator_id', profile?.id)
        .eq('role', 'asha');

      if (ashaError) throw ashaError;
      setAshas(ashaData || []);

      // Fetch functionality data with ASHA profiles
      const { data: functionalityData, error } = await supabase
        .from('asha_functionality')
        .select(`
          *,
          asha:profiles(*)
        `)
        .eq('month', selectedMonth)
        .eq('year', selectedYear)
        .in('asha_id', (ashaData || []).map(a => a.id));

      if (error) throw error;
      setData(functionalityData || []);
    } catch (error) {
      console.error('Error fetching ASHA functionality data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTaskStats = () => {
    return tasks.map(task => {
      const functionalCount = data.filter(d => d[task.key as keyof AshaFunctionality] === true).length;
      const totalAshas = ashas.length;
      const percentage = totalAshas > 0 ? Math.round((functionalCount / totalAshas) * 100) : 0;
      
      return {
        ...task,
        functionalCount,
        totalAshas,
        percentage
      };
    });
  };

  const calculateAshaStats = () => {
    return ashas.map(asha => {
      const ashaData = data.find(d => d.asha_id === asha.id);
      if (!ashaData) {
        return {
          asha,
          functionalTasks: 0,
          totalTasks: tasks.length,
          isHighPerformer: false,
          reported: false
        };
      }

      const functionalTasks = tasks.filter(task => 
        ashaData[task.key as keyof AshaFunctionality] === true
      ).length;

      return {
        asha,
        functionalTasks,
        totalTasks: tasks.length,
        isHighPerformer: functionalTasks >= 6,
        reported: true,
        data: ashaData
      };
    });
  };

  const taskStats = calculateTaskStats();
  const ashaStats = calculateAshaStats();
  const highPerformers = ashaStats.filter(stat => stat.isHighPerformer).length;
  const notReported = ashaStats.filter(stat => !stat.reported).length;

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-100 text-green-800';
    if (percentage >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const months = [
    { value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' },
    { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' },
    { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
    { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }
  ];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            ASHA Functionality Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-blue-600">Total ASHAs</p>
              <p className="text-2xl font-bold text-blue-800">{ashas.length}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-sm text-green-600">High Performers (≥6 tasks)</p>
              <p className="text-2xl font-bold text-green-800">{highPerformers}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <p className="text-sm text-orange-600">Did Not Report</p>
              <p className="text-2xl font-bold text-orange-800">{notReported}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <p className="text-sm text-purple-600">Performance Rate</p>
              <p className="text-2xl font-bold text-purple-800">
                {ashas.length > 0 ? Math.round((highPerformers / ashas.length) * 100) : 0}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Task-wise Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {taskStats.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{task.label}</h4>
                  <p className="text-xs text-gray-500">
                    {task.functionalCount}/{task.totalAshas} ASHAs functional
                  </p>
                </div>
                <Badge className={getPerformanceColor(task.percentage)}>
                  {task.percentage}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Individual ASHA Performance Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Individual ASHA Performance Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 sticky left-0 bg-white">ASHA Name</th>
                  {tasks.map((task, index) => (
                    <th key={index} className="text-center p-2 min-w-[40px]" title={task.label}>
                      T{index + 1}
                    </th>
                  ))}
                  <th className="text-center p-2">Total</th>
                  <th className="text-center p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {ashaStats.map((stat, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium sticky left-0 bg-white">
                      {stat.asha.full_name}
                    </td>
                    {tasks.map((task, taskIndex) => {
                      const isCompleted = stat.data?.[task.key as keyof AshaFunctionality] === true;
                      return (
                        <td key={taskIndex} className="text-center p-2">
                          {stat.reported ? (
                            isCompleted ? (
                              <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600 mx-auto" />
                            )
                          ) : (
                            <div className="w-4 h-4 bg-gray-300 rounded mx-auto"></div>
                          )}
                        </td>
                      );
                    })}
                    <td className="text-center p-2 font-medium">
                      {stat.functionalTasks}/{stat.totalTasks}
                    </td>
                    <td className="text-center p-2">
                      {!stat.reported ? (
                        <Badge className="bg-gray-100 text-gray-800">Not Reported</Badge>
                      ) : stat.isHighPerformer ? (
                        <Badge className="bg-green-100 text-green-800">High Performer</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">Needs Improvement</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Task Legend:</strong></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {tasks.map((task, index) => (
                <p key={index}>T{index + 1}: {task.label}</p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

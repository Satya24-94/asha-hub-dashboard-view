
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Baby, TrendingUp, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { MaternalHealthIndicators, Profile, Targets } from '@/types/database';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  isPersonal?: boolean;
}

export const MaternalHealthModule = ({ isPersonal = false }: Props) => {
  const [data, setData] = useState<MaternalHealthIndicators[]>([]);
  const [targets, setTargets] = useState<Targets | null>(null);
  const [ashas, setAshas] = useState<Profile[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    if (profile) {
      fetchData();
      if (profile.role === 'asha_facilitator') {
        fetchAshas();
      }
    }
  }, [profile, selectedMonth, selectedYear]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('maternal_health_indicators')
        .select('*')
        .eq('month', selectedMonth)
        .eq('year', selectedYear);

      if (isPersonal && profile?.role === 'asha') {
        query = query.eq('asha_id', profile.id);
      }

      const { data: indicators, error } = await query;
      if (error) throw error;

      setData(indicators || []);

      // Fetch targets
      if (profile?.block) {
        const { data: targetData } = await supabase
          .from('targets')
          .select('*')
          .eq('block', profile.block)
          .eq('month', selectedMonth)
          .eq('year', selectedYear)
          .single();
        
        setTargets(targetData);
      }
    } catch (error) {
      console.error('Error fetching maternal health data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAshas = async () => {
    try {
      const { data: ashaData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('facilitator_id', profile?.id)
        .eq('role', 'asha');

      if (error) throw error;
      setAshas(ashaData || []);
    } catch (error) {
      console.error('Error fetching ASHAs:', error);
    }
  };

  const calculateTotals = () => {
    return data.reduce((acc, curr) => ({
      pregnant_women_registered: acc.pregnant_women_registered + curr.pregnant_women_registered,
      pregnant_women_3_anc: acc.pregnant_women_3_anc + curr.pregnant_women_3_anc,
      pregnant_women_tt2: acc.pregnant_women_tt2 + curr.pregnant_women_tt2,
      pregnant_women_100_ifa: acc.pregnant_women_100_ifa + curr.pregnant_women_100_ifa,
      institutional_deliveries: acc.institutional_deliveries + curr.institutional_deliveries,
      home_deliveries_sba: acc.home_deliveries_sba + curr.home_deliveries_sba,
      maternal_complications: acc.maternal_complications + curr.maternal_complications,
      women_referred_complications: acc.women_referred_complications + curr.women_referred_complications,
      maternal_deaths: acc.maternal_deaths + curr.maternal_deaths,
    }), {
      pregnant_women_registered: 0,
      pregnant_women_3_anc: 0,
      pregnant_women_tt2: 0,
      pregnant_women_100_ifa: 0,
      institutional_deliveries: 0,
      home_deliveries_sba: 0,
      maternal_complications: 0,
      women_referred_complications: 0,
      maternal_deaths: 0,
    });
  };

  const totals = calculateTotals();

  const getPerformanceColor = (achieved: number, target: number) => {
    const percentage = target > 0 ? (achieved / target) * 100 : 0;
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const months = [
    { value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' },
    { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' },
    { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
    { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }
  ];

  const indicators = [
    { key: 'pregnant_women_registered', label: 'Pregnant Women Registered', icon: Baby },
    { key: 'pregnant_women_3_anc', label: 'Received 3 ANC Checkups', icon: TrendingUp },
    { key: 'pregnant_women_tt2', label: 'Received TT2', icon: TrendingUp },
    { key: 'pregnant_women_100_ifa', label: 'Received 100 IFA Tablets', icon: TrendingUp },
    { key: 'institutional_deliveries', label: 'Institutional Deliveries', icon: Baby },
    { key: 'home_deliveries_sba', label: 'Home Deliveries (SBA)', icon: Baby },
    { key: 'maternal_complications', label: 'Maternal Complications', icon: AlertTriangle },
    { key: 'women_referred_complications', label: 'Women Referred for Complications', icon: AlertTriangle },
    { key: 'maternal_deaths', label: 'Maternal Deaths', icon: AlertTriangle },
  ];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Baby className="h-5 w-5 text-pink-600" />
            Maternal Health Indicators
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indicators.map((indicator) => {
              const IconComponent = indicator.icon;
              const value = totals[indicator.key as keyof typeof totals];
              const target = targets?.[`target_${indicator.key}` as keyof Targets] as number || 0;
              const percentage = target > 0 ? Math.round((value / target) * 100) : 0;

              return (
                <div key={indicator.key} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-emerald-600" />
                    <h4 className="font-medium text-sm">{indicator.label}</h4>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{value}</span>
                      {target > 0 && (
                        <Badge className={getPerformanceColor(value, target)}>
                          {percentage}%
                        </Badge>
                      )}
                    </div>
                    
                    {target > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Target: {target}</span>
                          <span>{value}/{target}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Individual ASHA Performance (for facilitators) */}
      {profile?.role === 'asha_facilitator' && ashas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Individual ASHA Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">ASHA Name</th>
                    <th className="text-center p-2">Registered</th>
                    <th className="text-center p-2">3 ANC</th>
                    <th className="text-center p-2">TT2</th>
                    <th className="text-center p-2">IFA</th>
                    <th className="text-center p-2">Inst. Del.</th>
                    <th className="text-center p-2">Complications</th>
                  </tr>
                </thead>
                <tbody>
                  {ashas.map((asha) => {
                    const ashaData = data.find(d => d.asha_id === asha.id);
                    return (
                      <tr key={asha.id} className="border-b">
                        <td className="p-2 font-medium">{asha.full_name}</td>
                        <td className="text-center p-2">{ashaData?.pregnant_women_registered || 0}</td>
                        <td className="text-center p-2">{ashaData?.pregnant_women_3_anc || 0}</td>
                        <td className="text-center p-2">{ashaData?.pregnant_women_tt2 || 0}</td>
                        <td className="text-center p-2">{ashaData?.pregnant_women_100_ifa || 0}</td>
                        <td className="text-center p-2">{ashaData?.institutional_deliveries || 0}</td>
                        <td className="text-center p-2">{ashaData?.maternal_complications || 0}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

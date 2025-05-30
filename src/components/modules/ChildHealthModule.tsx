
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Baby, Heart, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ChildHealthIndicators, Profile, Targets } from '@/types/database';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  isPersonal?: boolean;
}

export const ChildHealthModule = ({ isPersonal = false }: Props) => {
  const [data, setData] = useState<ChildHealthIndicators[]>([]);
  const [targets, setTargets] = useState<Targets | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    if (profile) {
      fetchData();
    }
  }, [profile, selectedMonth, selectedYear]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('child_health_indicators')
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
      console.error('Error fetching child health data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    return data.reduce((acc, curr) => ({
      live_births: acc.live_births + curr.live_births,
      children_12_23_fully_immunized: acc.children_12_23_fully_immunized + curr.children_12_23_fully_immunized,
      newborns_breastfed_1hr: acc.newborns_breastfed_1hr + curr.newborns_breastfed_1hr,
      children_exclusively_breastfed_6m: acc.children_exclusively_breastfed_6m + curr.children_exclusively_breastfed_6m,
      children_6_9m_solid_food: acc.children_6_9m_solid_food + curr.children_6_9m_solid_food,
      neonatal_deaths: acc.neonatal_deaths + curr.neonatal_deaths,
      infant_deaths: acc.infant_deaths + curr.infant_deaths,
    }), {
      live_births: 0,
      children_12_23_fully_immunized: 0,
      newborns_breastfed_1hr: 0,
      children_exclusively_breastfed_6m: 0,
      children_6_9m_solid_food: 0,
      neonatal_deaths: 0,
      infant_deaths: 0,
    });
  };

  const totals = calculateTotals();

  const getPerformanceColor = (achieved: number, expected: number) => {
    const percentage = expected > 0 ? (achieved / expected) * 100 : 0;
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

  // Comparative indicators showing expected vs actual
  const comparativeIndicators = [
    {
      label: 'Live Births',
      actual: totals.live_births,
      expected: targets?.target_live_births || 0,
      icon: Baby,
    },
    {
      label: 'Children 12-23 Months Fully Immunized',
      actual: totals.children_12_23_fully_immunized,
      expected: targets?.target_children_12_23m || 0,
      icon: Heart,
    },
    {
      label: 'Newborns Breastfed Within 1 Hour',
      actual: totals.newborns_breastfed_1hr,
      expected: Math.round(totals.live_births * 0.8), // 80% target
      icon: Baby,
    },
    {
      label: 'Children Exclusively Breastfed 6 Months',
      actual: totals.children_exclusively_breastfed_6m,
      expected: Math.round(totals.live_births * 0.6), // 60% target
      icon: Heart,
    },
    {
      label: 'Children 6-9M Receiving Solid Food',
      actual: totals.children_6_9m_solid_food,
      expected: Math.round(totals.live_births * 0.7), // 70% target
      icon: TrendingUp,
    },
  ];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Baby className="h-5 w-5 text-blue-600" />
            Comparative Coverage Indicators
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

          <div className="space-y-4">
            {comparativeIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              const percentage = indicator.expected > 0 ? Math.round((indicator.actual / indicator.expected) * 100) : 0;
              const gap = indicator.expected - indicator.actual;

              return (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium">{indicator.label}</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Expected</p>
                      <p className="text-2xl font-bold text-blue-600">{indicator.expected}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Actual</p>
                      <p className="text-2xl font-bold text-green-600">{indicator.actual}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Coverage</p>
                      <Badge className={getPerformanceColor(indicator.actual, indicator.expected)}>
                        {percentage}%
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>Gap: {gap > 0 ? gap : 0}</span>
                    </div>
                    <Progress value={Math.min(percentage, 100)} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deaths Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-red-50">
              <h4 className="font-medium text-red-800 mb-2">Neonatal Deaths</h4>
              <p className="text-3xl font-bold text-red-600">{totals.neonatal_deaths}</p>
            </div>
            <div className="p-4 border rounded-lg bg-red-50">
              <h4 className="font-medium text-red-800 mb-2">Infant Deaths</h4>
              <p className="text-3xl font-bold text-red-600">{totals.infant_deaths}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

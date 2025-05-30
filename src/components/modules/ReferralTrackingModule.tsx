
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ReferralTracking } from '@/types/database';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  isPersonal?: boolean;
}

export const ReferralTrackingModule = ({ isPersonal = false }: Props) => {
  const [data, setData] = useState<ReferralTracking[]>([]);
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
        .from('referral_tracking')
        .select('*')
        .eq('month', selectedMonth)
        .eq('year', selectedYear);

      if (isPersonal && profile?.role === 'asha') {
        query = query.eq('asha_id', profile.id);
      }

      const { data: referralData, error } = await query;
      if (error) throw error;

      setData(referralData || []);
    } catch (error) {
      console.error('Error fetching referral tracking data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    return data.reduce((acc, curr) => ({
      neonates_complications_total: acc.neonates_complications_total + curr.neonates_complications_total,
      neonates_complications_referred: acc.neonates_complications_referred + curr.neonates_complications_referred,
      children_diarrhea_total: acc.children_diarrhea_total + curr.children_diarrhea_total,
      children_diarrhea_ors: acc.children_diarrhea_ors + curr.children_diarrhea_ors,
      children_diarrhea_treatment: acc.children_diarrhea_treatment + curr.children_diarrhea_treatment,
      children_diarrhea_hospitalized: acc.children_diarrhea_hospitalized + curr.children_diarrhea_hospitalized,
      children_ari_fever_total: acc.children_ari_fever_total + curr.children_ari_fever_total,
      children_ari_fever_treatment: acc.children_ari_fever_treatment + curr.children_ari_fever_treatment,
      children_ari_fever_hospitalized: acc.children_ari_fever_hospitalized + curr.children_ari_fever_hospitalized,
    }), {
      neonates_complications_total: 0,
      neonates_complications_referred: 0,
      children_diarrhea_total: 0,
      children_diarrhea_ors: 0,
      children_diarrhea_treatment: 0,
      children_diarrhea_hospitalized: 0,
      children_ari_fever_total: 0,
      children_ari_fever_treatment: 0,
      children_ari_fever_hospitalized: 0,
    });
  };

  const totals = calculateTotals();

  const getResponseRate = (treated: number, total: number) => {
    return total > 0 ? Math.round((treated / total) * 100) : 0;
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const months = [
    { value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' },
    { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' },
    { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
    { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }
  ];

  const referralIndicators = [
    {
      category: 'Neonatal Complications',
      total: totals.neonates_complications_total,
      referred: totals.neonates_complications_referred,
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      category: 'Diarrhea - ORS Given',
      total: totals.children_diarrhea_total,
      referred: totals.children_diarrhea_ors,
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      category: 'Diarrhea - Treatment Given',
      total: totals.children_diarrhea_total,
      referred: totals.children_diarrhea_treatment,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      category: 'Diarrhea - Hospitalized',
      total: totals.children_diarrhea_total,
      referred: totals.children_diarrhea_hospitalized,
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      category: 'ARI/Fever - Treatment Given',
      total: totals.children_ari_fever_total,
      referred: totals.children_ari_fever_treatment,
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      category: 'ARI/Fever - Hospitalized',
      total: totals.children_ari_fever_total,
      referred: totals.children_ari_fever_hospitalized,
      icon: AlertTriangle,
      color: 'text-red-600'
    },
  ];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
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
            <Activity className="h-5 w-5 text-orange-600" />
            Referral & Treatment Tracking
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
            {referralIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              const responseRate = getResponseRate(indicator.referred, indicator.total);

              return (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className={`h-5 w-5 ${indicator.color}`} />
                      <h4 className="font-medium">{indicator.category}</h4>
                    </div>
                    <Badge className={getStatusColor(responseRate)}>
                      {responseRate}% Response Rate
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Total Cases</p>
                      <p className="text-2xl font-bold">{indicator.total}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Treated/Referred</p>
                      <p className="text-2xl font-bold text-green-600">{indicator.referred}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-orange-600">{indicator.total - indicator.referred}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Response Rate</span>
                      <span>{indicator.referred}/{indicator.total}</span>
                    </div>
                    <Progress value={responseRate} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

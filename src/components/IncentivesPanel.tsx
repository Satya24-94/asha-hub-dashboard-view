
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Award,
  Target,
  Users,
  MapPin,
  Star
} from "lucide-react";

export const IncentivesPanel = () => {
  const [selectedMonth, setSelectedMonth] = useState("2024-01");

  const incentiveRates = {
    healthCheckup: 50,
    immunization: 75,
    maternalCare: 100,
    dataCollection: 25,
    bonus: {
      rating: 500, // bonus for rating above 4.5
      completion: 1000 // bonus for 100% completion rate
    }
  };

  const ashaIncentives = [
    {
      id: 1,
      name: "Priya Sharma",
      village: "Rampur",
      rating: 4.8,
      tasks: {
        healthCheckup: 12,
        immunization: 8,
        maternalCare: 5,
        dataCollection: 18
      },
      completionRate: 96,
      totalEarned: 2325,
      bonusEarned: 500,
      status: "paid"
    },
    {
      id: 2,
      name: "Meera Devi",
      village: "Govindpur",
      rating: 4.6,
      tasks: {
        healthCheckup: 10,
        immunization: 6,
        maternalCare: 4,
        dataCollection: 15
      },
      completionRate: 88,
      totalEarned: 1825,
      bonusEarned: 500,
      status: "pending"
    },
    {
      id: 3,
      name: "Lakshmi K",
      village: "Sundarganj",
      rating: 4.2,
      tasks: {
        healthCheckup: 8,
        immunization: 5,
        maternalCare: 3,
        dataCollection: 12
      },
      completionRate: 75,
      totalEarned: 1175,
      bonusEarned: 0,
      status: "pending"
    },
    {
      id: 4,
      name: "Sunita Yadav",
      village: "Krishnanagar",
      rating: 4.9,
      tasks: {
        healthCheckup: 15,
        immunization: 10,
        maternalCare: 7,
        dataCollection: 22
      },
      completionRate: 100,
      totalEarned: 3425,
      bonusEarned: 1500,
      status: "paid"
    }
  ];

  const months = [
    { value: "2024-01", label: "January 2024" },
    { value: "2023-12", label: "December 2023" },
    { value: "2023-11", label: "November 2023" },
    { value: "2023-10", label: "October 2023" }
  ];

  const calculateTaskIncentive = (tasks: any) => {
    return (
      tasks.healthCheckup * incentiveRates.healthCheckup +
      tasks.immunization * incentiveRates.immunization +
      tasks.maternalCare * incentiveRates.maternalCare +
      tasks.dataCollection * incentiveRates.dataCollection
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === "paid") {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
  };

  const totalIncentivesPaid = ashaIncentives
    .filter(asha => asha.status === "paid")
    .reduce((sum, asha) => sum + asha.totalEarned, 0);

  const totalIncentivesPending = ashaIncentives
    .filter(asha => asha.status === "pending")
    .reduce((sum, asha) => sum + asha.totalEarned, 0);

  return (
    <div className="space-y-6">
      {/* Header with Month Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">ASHA Incentives Program</h2>
          <p className="text-sm text-gray-600">Manage and track ASHA performance incentives</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 opacity-80" />
              <div>
                <p className="text-green-100 text-sm">Total Paid</p>
                <p className="text-2xl font-bold">₹{totalIncentivesPaid.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 opacity-80" />
              <div>
                <p className="text-yellow-100 text-sm">Pending</p>
                <p className="text-2xl font-bold">₹{totalIncentivesPending.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 opacity-80" />
              <div>
                <p className="text-blue-100 text-sm">Total ASHAs</p>
                <p className="text-2xl font-bold">{ashaIncentives.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Incentive Rates Card */}
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-indigo-600" />
            Current Incentive Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm">Health Checkups</span>
                <span className="font-semibold">₹{incentiveRates.healthCheckup}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm">Immunizations</span>
                <span className="font-semibold">₹{incentiveRates.immunization}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm">Maternal Care</span>
                <span className="font-semibold">₹{incentiveRates.maternalCare}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm">Data Collection</span>
                <span className="font-semibold">₹{incentiveRates.dataCollection}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Performance Bonuses</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• ₹{incentiveRates.bonus.rating} for rating above 4.5</p>
              <p>• ₹{incentiveRates.bonus.completion} for 100% completion rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ASHA Incentives Table */}
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Individual ASHA Incentives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ASHA</TableHead>
                  <TableHead>Tasks</TableHead>
                  <TableHead>Task Incentive</TableHead>
                  <TableHead>Bonus</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ashaIncentives.map((asha) => {
                  const taskIncentive = calculateTaskIncentive(asha.tasks);
                  return (
                    <TableRow key={asha.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs">
                              {asha.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{asha.name}</p>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <MapPin className="h-3 w-3" />
                              <span>{asha.village}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs space-y-1">
                          <div>Health: {asha.tasks.healthCheckup}</div>
                          <div>Immunization: {asha.tasks.immunization}</div>
                          <div>Maternal: {asha.tasks.maternalCare}</div>
                          <div>Data: {asha.tasks.dataCollection}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">₹{taskIncentive.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span className="font-semibold">₹{asha.bonusEarned.toLocaleString()}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{asha.rating}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-lg font-bold text-green-600">
                          ₹{asha.totalEarned.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(asha.status)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button className="bg-green-600 hover:bg-green-700">
          <DollarSign className="h-4 w-4 mr-2" />
          Process Pending Payments
        </Button>
        <Button variant="outline">
          <TrendingUp className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>
    </div>
  );
};

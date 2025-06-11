
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Baby, Heart, UserCheck, Activity, Plus, Save, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BeneficiaryData {
  pregnantWomen: {
    name: string;
    age: string;
    village: string;
    lmp: string;
    edd: string;
    ancVisits: string;
    ttShots: string;
    ifaTablets: string;
  };
  children: {
    name: string;
    age: string;
    gender: string;
    village: string;
    birthWeight: string;
    immunizationStatus: string;
    nutritionStatus: string;
  };
  eligibleCouples: {
    husbandName: string;
    wifeName: string;
    age: string;
    village: string;
    familyPlanningMethod: string;
    children: string;
  };
}

export const MobileDataEntry = () => {
  const [activeSection, setActiveSection] = useState('pregnant');
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<BeneficiaryData>({
    pregnantWomen: {
      name: '',
      age: '',
      village: '',
      lmp: '',
      edd: '',
      ancVisits: '',
      ttShots: '',
      ifaTablets: ''
    },
    children: {
      name: '',
      age: '',
      gender: '',
      village: '',
      birthWeight: '',
      immunizationStatus: '',
      nutritionStatus: ''
    },
    eligibleCouples: {
      husbandName: '',
      wifeName: '',
      age: '',
      village: '',
      familyPlanningMethod: '',
      children: ''
    }
  });

  const handleInputChange = (section: keyof BeneficiaryData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (section: keyof BeneficiaryData) => {
    const sectionData = formData[section];
    const requiredFields = Object.entries(sectionData).filter(([_, value]) => !value.trim());
    
    if (requiredFields.length > 0) {
      toast({
        title: "Incomplete Data",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    console.log(`Submitting ${section} data:`, sectionData);
    
    toast({
      title: "Data Saved Successfully",
      description: `${section} data has been recorded.`,
    });

    // Reset form for this section
    setFormData(prev => ({
      ...prev,
      [section]: section === 'pregnantWomen' ? {
        name: '', age: '', village: '', lmp: '', edd: '', ancVisits: '', ttShots: '', ifaTablets: ''
      } : section === 'children' ? {
        name: '', age: '', gender: '', village: '', birthWeight: '', immunizationStatus: '', nutritionStatus: ''
      } : {
        husbandName: '', wifeName: '', age: '', village: '', familyPlanningMethod: '', children: ''
      }
    }));
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="bg-white p-6 border-b">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Plus className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add Beneficiary Data</h2>
            <p className="text-sm text-gray-600">Record health information for your community</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 h-12 bg-gray-100 rounded-xl p-1">
            <TabsTrigger 
              value="pregnant" 
              className="data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full rounded-lg font-medium text-sm"
            >
              <Baby className="h-4 w-4" />
              Pregnant Women
            </TabsTrigger>
            <TabsTrigger 
              value="children" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full rounded-lg font-medium text-sm"
            >
              <Heart className="h-4 w-4" />
              Children
            </TabsTrigger>
            <TabsTrigger 
              value="couples" 
              className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full rounded-lg font-medium text-sm"
            >
              <Users className="h-4 w-4" />
              Couples
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pregnant">
            <Card className="shadow-sm border border-pink-100">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-pink-800">
                  <Baby className="h-5 w-5" />
                  Pregnant Women Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pregnant-name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                  <Input
                    id="pregnant-name"
                    placeholder="Enter pregnant woman's name"
                    value={formData.pregnantWomen.name}
                    onChange={(e) => handleInputChange('pregnantWomen', 'name', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pregnant-age" className="text-sm font-medium text-gray-700">Age *</Label>
                    <Input
                      id="pregnant-age"
                      type="number"
                      placeholder="Age"
                      value={formData.pregnantWomen.age}
                      onChange={(e) => handleInputChange('pregnantWomen', 'age', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pregnant-village" className="text-sm font-medium text-gray-700">Village *</Label>
                    <Input
                      id="pregnant-village"
                      placeholder="Village name"
                      value={formData.pregnantWomen.village}
                      onChange={(e) => handleInputChange('pregnantWomen', 'village', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lmp" className="text-sm font-medium text-gray-700">LMP Date *</Label>
                    <Input
                      id="lmp"
                      type="date"
                      value={formData.pregnantWomen.lmp}
                      onChange={(e) => handleInputChange('pregnantWomen', 'lmp', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edd" className="text-sm font-medium text-gray-700">EDD Date *</Label>
                    <Input
                      id="edd"
                      type="date"
                      value={formData.pregnantWomen.edd}
                      onChange={(e) => handleInputChange('pregnantWomen', 'edd', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="anc-visits" className="text-sm font-medium text-gray-700">ANC Visits *</Label>
                    <Select 
                      value={formData.pregnantWomen.ancVisits} 
                      onValueChange={(value) => handleInputChange('pregnantWomen', 'ancVisits', value)}
                    >
                      <SelectTrigger className="h-12 border-gray-300 focus:border-pink-500 focus:ring-pink-500">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4+">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tt-shots" className="text-sm font-medium text-gray-700">TT Shots *</Label>
                    <Select 
                      value={formData.pregnantWomen.ttShots} 
                      onValueChange={(value) => handleInputChange('pregnantWomen', 'ttShots', value)}
                    >
                      <SelectTrigger className="h-12 border-gray-300 focus:border-pink-500 focus:ring-pink-500">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifa-tablets" className="text-sm font-medium text-gray-700">IFA Tablets *</Label>
                    <Select 
                      value={formData.pregnantWomen.ifaTablets} 
                      onValueChange={(value) => handleInputChange('pregnantWomen', 'ifaTablets', value)}
                    >
                      <SelectTrigger className="h-12 border-gray-300 focus:border-pink-500 focus:ring-pink-500">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-100">Less than 100</SelectItem>
                        <SelectItem value="100+">100+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={() => handleSubmit('pregnantWomen')} 
                  className="w-full h-12 text-base bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Pregnant Woman Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="children">
            <Card className="shadow-sm border border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Heart className="h-5 w-5" />
                  Children Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="child-name" className="text-sm font-medium text-gray-700">Child's Name *</Label>
                  <Input
                    id="child-name"
                    placeholder="Enter child's name"
                    value={formData.children.name}
                    onChange={(e) => handleInputChange('children', 'name', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="child-age" className="text-sm font-medium text-gray-700">Age (months) *</Label>
                    <Input
                      id="child-age"
                      type="number"
                      placeholder="Age"
                      value={formData.children.age}
                      onChange={(e) => handleInputChange('children', 'age', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="child-gender" className="text-sm font-medium text-gray-700">Gender *</Label>
                    <Select 
                      value={formData.children.gender} 
                      onValueChange={(value) => handleInputChange('children', 'gender', value)}
                    >
                      <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="child-village" className="text-sm font-medium text-gray-700">Village *</Label>
                    <Input
                      id="child-village"
                      placeholder="Village"
                      value={formData.children.village}
                      onChange={(e) => handleInputChange('children', 'village', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birth-weight" className="text-sm font-medium text-gray-700">Birth Weight (kg) *</Label>
                    <Input
                      id="birth-weight"
                      type="number"
                      step="0.1"
                      placeholder="2.5"
                      value={formData.children.birthWeight}
                      onChange={(e) => handleInputChange('children', 'birthWeight', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="immunization" className="text-sm font-medium text-gray-700">Immunization *</Label>
                    <Select 
                      value={formData.children.immunizationStatus} 
                      onValueChange={(value) => handleInputChange('children', 'immunizationStatus', value)}
                    >
                      <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="complete">Complete</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nutrition" className="text-sm font-medium text-gray-700">Nutrition Status *</Label>
                  <Select 
                    value={formData.children.nutritionStatus} 
                    onValueChange={(value) => handleInputChange('children', 'nutritionStatus', value)}
                  >
                    <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select nutrition status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="malnourished">Malnourished</SelectItem>
                      <SelectItem value="severely-malnourished">Severely Malnourished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={() => handleSubmit('children')} 
                  className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Child Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="couples">
            <Card className="shadow-sm border border-purple-100">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Users className="h-5 w-5" />
                  Eligible Couples Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="husband-name" className="text-sm font-medium text-gray-700">Husband's Name *</Label>
                    <Input
                      id="husband-name"
                      placeholder="Husband's name"
                      value={formData.eligibleCouples.husbandName}
                      onChange={(e) => handleInputChange('eligibleCouples', 'husbandName', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wife-name" className="text-sm font-medium text-gray-700">Wife's Name *</Label>
                    <Input
                      id="wife-name"
                      placeholder="Wife's name"
                      value={formData.eligibleCouples.wifeName}
                      onChange={(e) => handleInputChange('eligibleCouples', 'wifeName', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="couple-age" className="text-sm font-medium text-gray-700">Wife's Age *</Label>
                    <Input
                      id="couple-age"
                      type="number"
                      placeholder="Age"
                      value={formData.eligibleCouples.age}
                      onChange={(e) => handleInputChange('eligibleCouples', 'age', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="couple-village" className="text-sm font-medium text-gray-700">Village *</Label>
                    <Input
                      id="couple-village"
                      placeholder="Village name"
                      value={formData.eligibleCouples.village}
                      onChange={(e) => handleInputChange('eligibleCouples', 'village', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="family-planning" className="text-sm font-medium text-gray-700">Family Planning Method *</Label>
                    <Select 
                      value={formData.eligibleCouples.familyPlanningMethod} 
                      onValueChange={(value) => handleInputChange('eligibleCouples', 'familyPlanningMethod', value)}
                    >
                      <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="condom">Condom</SelectItem>
                        <SelectItem value="oral-pills">Oral Pills</SelectItem>
                        <SelectItem value="iud">IUD</SelectItem>
                        <SelectItem value="sterilization">Sterilization</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="couple-children" className="text-sm font-medium text-gray-700">Number of Children *</Label>
                    <Select 
                      value={formData.eligibleCouples.children} 
                      onValueChange={(value) => handleInputChange('eligibleCouples', 'children', value)}
                    >
                      <SelectTrigger className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4+">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={() => handleSubmit('eligibleCouples')} 
                  className="w-full h-12 text-base bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Couple Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

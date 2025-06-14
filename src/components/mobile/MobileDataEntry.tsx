import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Baby, Heart, UserCheck, Activity, Plus, Save, Users, CheckCircle } from 'lucide-react';
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
  const [animatingButton, setAnimatingButton] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
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
    setAnimatingButton(section);
    
    // Validate required fields
    const sectionData = formData[section];
    const requiredFields = Object.entries(sectionData).filter(([_, value]) => !value.trim());
    
    if (requiredFields.length > 0) {
      toast({
        title: "Incomplete Data",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive"
      });
      setAnimatingButton(null);
      return;
    }

    // Simulate data submission with delay
    setTimeout(() => {
      console.log(`Submitting ${section} data:`, sectionData);
      
      toast({
        title: "Data Saved Successfully",
        description: `${section} data has been recorded.`,
      });

      // Mark section as completed
      setCompletedSections(prev => [...prev.filter(s => s !== section), section]);

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

      setAnimatingButton(null);
    }, 1500);
  };

  const isFormValid = (section: keyof BeneficiaryData) => {
    const sectionData = formData[section];
    return Object.values(sectionData).every(value => value.trim() !== '');
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-6 border-b">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg transition-all duration-200 hover:bg-green-200 hover:scale-110">
            <Plus className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add Beneficiary Data</h2>
            <p className="text-sm text-gray-600">Record health information for your community</p>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Tabs */}
      <div className="p-4">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 h-12 bg-gray-100 rounded-xl p-1">
            <TabsTrigger 
              value="pregnant" 
              className="data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full rounded-lg font-medium text-sm transition-all duration-200 hover:bg-white/50 relative"
            >
              <Baby className="h-4 w-4" />
              Pregnant Women
              {completedSections.includes('pregnantWomen') && (
                <CheckCircle className="h-3 w-3 text-green-500 absolute -top-1 -right-1" />
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="children" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full rounded-lg font-medium text-sm transition-all duration-200 hover:bg-white/50 relative"
            >
              <Heart className="h-4 w-4" />
              Children
              {completedSections.includes('children') && (
                <CheckCircle className="h-3 w-3 text-green-500 absolute -top-1 -right-1" />
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="couples" 
              className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full rounded-lg font-medium text-sm transition-all duration-200 hover:bg-white/50 relative"
            >
              <Users className="h-4 w-4" />
              Couples
              {completedSections.includes('eligibleCouples') && (
                <CheckCircle className="h-3 w-3 text-green-500 absolute -top-1 -right-1" />
              )}
            </TabsTrigger>
          </TabsList>

          {/* Pregnant Women Form */}
          <TabsContent value="pregnant">
            <Card className="shadow-sm border border-pink-100 transition-all duration-300 hover:shadow-lg">
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
                    className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500 transition-all duration-200 hover:border-pink-300"
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
                      className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500 transition-all duration-200 hover:border-pink-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pregnant-village" className="text-sm font-medium text-gray-700">Village *</Label>
                    <Input
                      id="pregnant-village"
                      placeholder="Village name"
                      value={formData.pregnantWomen.village}
                      onChange={(e) => handleInputChange('pregnantWomen', 'village', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500 transition-all duration-200 hover:border-pink-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pregnant-lmp" className="text-sm font-medium text-gray-700">LMP (Last Menstrual Period) *</Label>
                  <Input
                    id="pregnant-lmp"
                    type="date"
                    value={formData.pregnantWomen.lmp}
                    onChange={(e) => handleInputChange('pregnantWomen', 'lmp', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500 transition-all duration-200 hover:border-pink-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pregnant-edd" className="text-sm font-medium text-gray-700">EDD (Expected Delivery Date) *</Label>
                  <Input
                    id="pregnant-edd"
                    type="date"
                    value={formData.pregnantWomen.edd}
                    onChange={(e) => handleInputChange('pregnantWomen', 'edd', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500 transition-all duration-200 hover:border-pink-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pregnant-anc-visits" className="text-sm font-medium text-gray-700">Number of ANC Visits *</Label>
                  <Input
                    id="pregnant-anc-visits"
                    type="number"
                    placeholder="Enter number of ANC visits"
                    value={formData.pregnantWomen.ancVisits}
                    onChange={(e) => handleInputChange('pregnantWomen', 'ancVisits', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500 transition-all duration-200 hover:border-pink-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pregnant-tt-shots" className="text-sm font-medium text-gray-700">TT Shots Given *</Label>
                  <Input
                    id="pregnant-tt-shots"
                    type="number"
                    placeholder="Enter number of TT shots given"
                    value={formData.pregnantWomen.ttShots}
                    onChange={(e) => handleInputChange('pregnantWomen', 'ttShots', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500 transition-all duration-200 hover:border-pink-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pregnant-ifa-tablets" className="text-sm font-medium text-gray-700">IFA Tablets Distributed *</Label>
                  <Input
                    id="pregnant-ifa-tablets"
                    type="number"
                    placeholder="Enter number of IFA tablets distributed"
                    value={formData.pregnantWomen.ifaTablets}
                    onChange={(e) => handleInputChange('pregnantWomen', 'ifaTablets', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-pink-500 transition-all duration-200 hover:border-pink-300"
                  />
                </div>

                <Button 
                  onClick={() => handleSubmit('pregnantWomen')} 
                  disabled={!isFormValid('pregnantWomen') || animatingButton === 'pregnantWomen'}
                  className={`w-full h-12 text-base font-medium rounded-lg transition-all duration-200 ${
                    animatingButton === 'pregnantWomen' 
                      ? 'bg-green-600 text-white animate-pulse' 
                      : 'bg-pink-600 hover:bg-pink-700 text-white hover:scale-[1.02]'
                  }`}
                >
                  {animatingButton === 'pregnantWomen' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Pregnant Woman Data
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Children Form */}
          <TabsContent value="children">
            <Card className="shadow-sm border border-blue-100 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Heart className="h-5 w-5" />
                  Children Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="child-name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                  <Input
                    id="child-name"
                    placeholder="Enter child's name"
                    value={formData.children.name}
                    onChange={(e) => handleInputChange('children', 'name', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="child-age" className="text-sm font-medium text-gray-700">Age *</Label>
                    <Input
                      id="child-age"
                      type="number"
                      placeholder="Age in months"
                      value={formData.children.age}
                      onChange={(e) => handleInputChange('children', 'age', e.target.value)}
                      className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="child-gender" className="text-sm font-medium text-gray-700">Gender *</Label>
                    <Select onValueChange={(value) => handleInputChange('children', 'gender', value)}>
                      <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="child-village" className="text-sm font-medium text-gray-700">Village *</Label>
                  <Input
                    id="child-village"
                    placeholder="Village name"
                    value={formData.children.village}
                    onChange={(e) => handleInputChange('children', 'village', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="child-birth-weight" className="text-sm font-medium text-gray-700">Birth Weight (kg) *</Label>
                  <Input
                    id="child-birth-weight"
                    type="number"
                    placeholder="Enter birth weight"
                    value={formData.children.birthWeight}
                    onChange={(e) => handleInputChange('children', 'birthWeight', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="child-immunization" className="text-sm font-medium text-gray-700">Immunization Status *</Label>
                  <Input
                    id="child-immunization"
                    placeholder="Enter immunization status"
                    value={formData.children.immunizationStatus}
                    onChange={(e) => handleInputChange('children', 'immunizationStatus', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="child-nutrition" className="text-sm font-medium text-gray-700">Nutrition Status *</Label>
                  <Input
                    id="child-nutrition"
                    placeholder="Enter nutrition status"
                    value={formData.children.nutritionStatus}
                    onChange={(e) => handleInputChange('children', 'nutritionStatus', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300"
                  />
                </div>

                <Button 
                  onClick={() => handleSubmit('children')} 
                  disabled={!isFormValid('children') || animatingButton === 'children'}
                  className={`w-full h-12 text-base font-medium rounded-lg transition-all duration-200 ${
                    animatingButton === 'children' 
                      ? 'bg-green-600 text-white animate-pulse' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]'
                  }`}
                >
                  {animatingButton === 'children' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Child Data
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eligible Couples Form */}
          <TabsContent value="couples">
            <Card className="shadow-sm border border-purple-100 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Users className="h-5 w-5" />
                  Eligible Couples Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="couple-husband-name" className="text-sm font-medium text-gray-700">Husband's Name *</Label>
                  <Input
                    id="couple-husband-name"
                    placeholder="Enter husband's name"
                    value={formData.eligibleCouples.husbandName}
                    onChange={(e) => handleInputChange('eligibleCouples', 'husbandName', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200 hover:border-purple-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="couple-wife-name" className="text-sm font-medium text-gray-700">Wife's Name *</Label>
                  <Input
                    id="couple-wife-name"
                    placeholder="Enter wife's name"
                    value={formData.eligibleCouples.wifeName}
                    onChange={(e) => handleInputChange('eligibleCouples', 'wifeName', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200 hover:border-purple-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="couple-age" className="text-sm font-medium text-gray-700">Age *</Label>
                  <Input
                    id="couple-age"
                    type="number"
                    placeholder="Enter couple's age"
                    value={formData.eligibleCouples.age}
                    onChange={(e) => handleInputChange('eligibleCouples', 'age', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200 hover:border-purple-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="couple-village" className="text-sm font-medium text-gray-700">Village *</Label>
                  <Input
                    id="couple-village"
                    placeholder="Village name"
                    value={formData.eligibleCouples.village}
                    onChange={(e) => handleInputChange('eligibleCouples', 'village', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200 hover:border-purple-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="couple-family-planning" className="text-sm font-medium text-gray-700">Family Planning Method *</Label>
                  <Input
                    id="couple-family-planning"
                    placeholder="Enter family planning method"
                    value={formData.eligibleCouples.familyPlanningMethod}
                    onChange={(e) => handleInputChange('eligibleCouples', 'familyPlanningMethod', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200 hover:border-purple-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="couple-children" className="text-sm font-medium text-gray-700">Number of Children *</Label>
                  <Input
                    id="couple-children"
                    type="number"
                    placeholder="Enter number of children"
                    value={formData.eligibleCouples.children}
                    onChange={(e) => handleInputChange('eligibleCouples', 'children', e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200 hover:border-purple-300"
                  />
                </div>

                <Button 
                  onClick={() => handleSubmit('eligibleCouples')} 
                  disabled={!isFormValid('eligibleCouples') || animatingButton === 'eligibleCouples'}
                  className={`w-full h-12 text-base font-medium rounded-lg transition-all duration-200 ${
                    animatingButton === 'eligibleCouples' 
                      ? 'bg-green-600 text-white animate-pulse' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white hover:scale-[1.02]'
                  }`}
                >
                  {animatingButton === 'eligibleCouples' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Couple Data
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

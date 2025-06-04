
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddAshaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (asha: {
    name: string;
    village: string;
    phone: string;
    population: number;
    performance: number;
    trend: 'up' | 'down' | 'stable';
    status: 'active' | 'inactive';
  }) => void;
}

export const AddAshaModal = ({ isOpen, onClose, onAdd }: AddAshaModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    phone: '',
    population: '',
    performance: '',
    trend: 'stable' as 'up' | 'down' | 'stable',
    status: 'active' as 'active' | 'inactive'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.village.trim()) {
      newErrors.village = 'Village is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+91\s?\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format (use +91 followed by 10 digits)';
    }

    const population = parseInt(formData.population);
    if (!formData.population || isNaN(population)) {
      newErrors.population = 'Population is required';
    } else if (population <= 0) {
      newErrors.population = 'Population must be greater than 0';
    } else if (population > 1000) {
      newErrors.population = 'Population cannot exceed 1000';
    }

    const performance = parseInt(formData.performance);
    if (!formData.performance || isNaN(performance)) {
      newErrors.performance = 'Performance is required';
    } else if (performance < 0 || performance > 100) {
      newErrors.performance = 'Performance must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAdd({
        name: formData.name.trim(),
        village: formData.village.trim(),
        phone: formData.phone.trim(),
        population: parseInt(formData.population),
        performance: parseInt(formData.performance),
        trend: formData.trend,
        status: formData.status
      });
      
      // Reset form
      setFormData({
        name: '',
        village: '',
        phone: '',
        population: '',
        performance: '',
        trend: 'stable',
        status: 'active'
      });
      setErrors({});
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New ASHA</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter full name"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="village">Village *</Label>
            <Input
              id="village"
              value={formData.village}
              onChange={(e) => handleChange('village', e.target.value)}
              placeholder="Enter village name"
              className={errors.village ? 'border-red-500' : ''}
            />
            {errors.village && <p className="text-sm text-red-500 mt-1">{errors.village}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+91 9876543210"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <Label htmlFor="population">Population Served * (Max: 1000)</Label>
            <Input
              id="population"
              type="number"
              value={formData.population}
              onChange={(e) => handleChange('population', e.target.value)}
              placeholder="Enter population"
              max="1000"
              className={errors.population ? 'border-red-500' : ''}
            />
            {errors.population && <p className="text-sm text-red-500 mt-1">{errors.population}</p>}
          </div>

          <div>
            <Label htmlFor="performance">Initial Performance % *</Label>
            <Input
              id="performance"
              type="number"
              value={formData.performance}
              onChange={(e) => handleChange('performance', e.target.value)}
              placeholder="Enter performance (0-100)"
              min="0"
              max="100"
              className={errors.performance ? 'border-red-500' : ''}
            />
            {errors.performance && <p className="text-sm text-red-500 mt-1">{errors.performance}</p>}
          </div>

          <div>
            <Label htmlFor="trend">Performance Trend</Label>
            <Select value={formData.trend} onValueChange={(value: 'up' | 'down' | 'stable') => handleChange('trend', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="up">Improving</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="down">Declining</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => handleChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Add ASHA
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

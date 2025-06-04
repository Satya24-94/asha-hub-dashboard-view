
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, MapPin, Phone, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AvailableAsha {
  id: string;
  name: string;
  village: string;
  phone: string;
}

interface AddAshaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (ashaId: string) => void;
  availableAshas: AvailableAsha[];
}

export const AddAshaModal = ({ isOpen, onClose, onAdd, availableAshas }: AddAshaModalProps) => {
  const [selectedAshaId, setSelectedAshaId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const selectedAsha = availableAshas.find(asha => asha.id === selectedAshaId);

  const filteredAshas = availableAshas.filter(asha => 
    asha.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asha.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (selectedAshaId) {
      onAdd(selectedAshaId);
      setSelectedAshaId('');
      setSearchTerm('');
    }
  };

  const handleClose = () => {
    setSelectedAshaId('');
    setSearchTerm('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-full">
              <Plus className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add ASHA Worker</h2>
              <p className="text-sm text-gray-600 font-normal">Select from available ASHAs in your area</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search ASHAs by name or village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          {/* ASHA List */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Available ASHAs ({filteredAshas.length})
            </h3>
            
            {filteredAshas.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  {searchTerm ? 'No ASHAs found matching your search' : 'All available ASHAs have been added to your dashboard'}
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {filteredAshas.map((asha) => (
                  <Card 
                    key={asha.id} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                      selectedAshaId === asha.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => setSelectedAshaId(asha.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-gray-100">
                          <AvatarFallback className="bg-green-100 text-green-700 font-bold">
                            {asha.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{asha.name}</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span>{asha.village}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span>{asha.phone}</span>
                            </div>
                          </div>
                        </div>
                        
                        {selectedAshaId === asha.id && (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Selected ASHA Details */}
          {selectedAsha && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Selected ASHA Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-green-600 font-medium">Name:</span>
                    <p className="text-green-900">{selectedAsha.name}</p>
                  </div>
                  <div>
                    <span className="text-green-600 font-medium">Village:</span>
                    <p className="text-green-900">{selectedAsha.village}</p>
                  </div>
                  <div>
                    <span className="text-green-600 font-medium">Phone:</span>
                    <p className="text-green-900">{selectedAsha.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleAdd} 
            className="flex-1 bg-green-600 hover:bg-green-700"
            disabled={!selectedAshaId}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add ASHA Worker
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Users, MapPin, Phone } from 'lucide-react';

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
  const selectedAsha = availableAshas.find(asha => asha.id === selectedAshaId);

  const handleAdd = () => {
    if (selectedAshaId) {
      onAdd(selectedAshaId);
      setSelectedAshaId('');
    }
  };

  const handleClose = () => {
    setSelectedAshaId('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Users className="h-5 w-5 text-emerald-600" />
            </div>
            Add ASHA Worker
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Select ASHA from your team
            </label>
            <Select value={selectedAshaId} onValueChange={setSelectedAshaId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose an ASHA worker..." />
              </SelectTrigger>
              <SelectContent>
                {availableAshas.map((asha) => (
                  <SelectItem key={asha.id} value={asha.id}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{asha.name}</span>
                      <span className="text-sm text-gray-500">• {asha.village}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {availableAshas.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">All available ASHAs have been added to your dashboard.</p>
            )}
          </div>

          {selectedAsha && (
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">ASHA Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{selectedAsha.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{selectedAsha.village}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{selectedAsha.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleAdd} 
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            disabled={!selectedAshaId}
          >
            Add ASHA
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

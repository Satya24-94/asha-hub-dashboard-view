
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AshaPreviewModal } from "@/components/AshaPreviewModal";
import { AshaCard } from "@/components/AshaCard";
import { 
  Search,
  Filter
} from "lucide-react";
import { useState } from "react";

export const AshaList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [previewAsha, setPreviewAsha] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Enhanced ASHA data with more realistic information
  const ashas = [
    { id: 1, name: "Priya Sharma", village: "Rampur", phone: "+91 9876543210", rating: 4.8, tasksCompleted: 45, tasksTotal: 50, status: "active", lastActive: "2 hours ago" },
    { id: 2, name: "Meera Devi", village: "Govindpur", phone: "+91 9876543211", rating: 4.6, tasksCompleted: 38, tasksTotal: 45, status: "active", lastActive: "4 hours ago" },
    { id: 3, name: "Lakshmi K", village: "Sundarganj", phone: "+91 9876543212", rating: 4.2, tasksCompleted: 32, tasksTotal: 48, status: "inactive", lastActive: "2 days ago" },
    { id: 4, name: "Sunita Yadav", village: "Krishnanagar", phone: "+91 9876543213", rating: 4.9, tasksCompleted: 50, tasksTotal: 50, status: "active", lastActive: "1 hour ago" },
    { id: 5, name: "Radha Singh", village: "Shivpur", phone: "+91 9876543214", rating: 4.4, tasksCompleted: 40, tasksTotal: 46, status: "active", lastActive: "3 hours ago" },
    { id: 6, name: "Kavita Rani", village: "Madhubani", phone: "+91 9876543215", rating: 4.7, tasksCompleted: 43, tasksTotal: 47, status: "active", lastActive: "5 hours ago" },
    { id: 7, name: "Anita Kumari", village: "Bishunpur", phone: "+91 9876543216", rating: 4.3, tasksCompleted: 35, tasksTotal: 42, status: "warning", lastActive: "1 day ago" },
    { id: 8, name: "Rekha Devi", village: "Janakpur", phone: "+91 9876543217", rating: 4.5, tasksCompleted: 41, tasksTotal: 45, status: "active", lastActive: "2 hours ago" },
    { id: 9, name: "Sita Kumari", village: "Lalpur", phone: "+91 9876543218", rating: 4.1, tasksCompleted: 28, tasksTotal: 40, status: "inactive", lastActive: "3 days ago" },
    { id: 10, name: "Geeta Sharma", village: "Sonpur", phone: "+91 9876543219", rating: 4.8, tasksCompleted: 47, tasksTotal: 49, status: "active", lastActive: "1 hour ago" },
    { id: 11, name: "Poonam Devi", village: "Bettiah", phone: "+91 9876543220", rating: 4.6, tasksCompleted: 39, tasksTotal: 44, status: "active", lastActive: "4 hours ago" },
    { id: 12, name: "Mamta Singh", village: "Motihari", phone: "+91 9876543221", rating: 4.4, tasksCompleted: 36, tasksTotal: 43, status: "active", lastActive: "6 hours ago" },
    { id: 13, name: "Shanti Devi", village: "Bagaha", phone: "+91 9876543222", rating: 4.2, tasksCompleted: 33, tasksTotal: 41, status: "warning", lastActive: "1 day ago" },
    { id: 14, name: "Urmila Kumari", village: "Siwan", phone: "+91 9876543223", rating: 4.7, tasksCompleted: 44, tasksTotal: 46, status: "active", lastActive: "2 hours ago" },
    { id: 15, name: "Savita Rani", village: "Chapra", phone: "+91 9876543224", rating: 4.5, tasksCompleted: 42, tasksTotal: 47, status: "active", lastActive: "3 hours ago" },
    { id: 16, name: "Pushpa Devi", village: "Gopalganj", phone: "+91 9876543225", rating: 4.3, tasksCompleted: 37, tasksTotal: 44, status: "active", lastActive: "5 hours ago" },
    { id: 17, name: "Kiran Kumari", village: "Muzaffarpur", phone: "+91 9876543226", rating: 4.1, tasksCompleted: 30, tasksTotal: 39, status: "inactive", lastActive: "2 days ago" },
    { id: 18, name: "Asha Devi", village: "Darbhanga", phone: "+91 9876543227", rating: 4.8, tasksCompleted: 46, tasksTotal: 48, status: "active", lastActive: "1 hour ago" },
    { id: 19, name: "Renu Singh", village: "Begusarai", phone: "+91 9876543228", rating: 4.6, tasksCompleted: 40, tasksTotal: 45, status: "active", lastActive: "3 hours ago" },
    { id: 20, name: "Sunita Kumari", village: "Samastipur", phone: "+91 9876543229", rating: 4.4, tasksCompleted: 38, tasksTotal: 43, status: "active", lastActive: "4 hours ago" }
  ] as const;

  const filteredAshas = ashas.filter(asha => {
    const matchesSearch = asha.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asha.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || asha.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDashboard = (ashaId: number) => {
    window.open('/asha-dashboard', '_blank');
  };

  const handlePreview = (asha: any) => {
    setPreviewAsha(asha);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-semibold mb-2">ASHA Workers Management</h2>
        <p className="text-sm text-gray-600">Manage and monitor your team of {ashas.length} ASHA workers</p>
      </div>

      <div className="flex space-x-3">
        <div className="flex-1 relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <Input
            placeholder="Search by name or village..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ASHA Cards */}
      <div className="space-y-4">
        {filteredAshas.map((asha, index) => (
          <div 
            key={asha.id} 
            className="animate-fade-in" 
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <AshaCard
              asha={asha}
              onViewDashboard={handleViewDashboard}
              onPreview={handlePreview}
            />
          </div>
        ))}
      </div>

      {filteredAshas.length === 0 && (
        <Card className="p-8 text-center animate-fade-in">
          <p className="text-gray-500">No ASHA workers found matching your criteria.</p>
        </Card>
      )}

      {/* Preview Modal */}
      <AshaPreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        asha={previewAsha}
      />
    </div>
  );
};

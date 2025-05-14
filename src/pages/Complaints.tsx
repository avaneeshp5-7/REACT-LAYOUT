
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Eye } from 'lucide-react';
import { complaints as mockComplaints } from '@/data/mockData';
import { Complaint } from '@/types';
import { toast } from 'sonner';
import ComplaintStatusDropdown from '@/components/complaints/ComplaintStatusDropdown';

export default function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Filter complaints based on search query, status, and priority
  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.loanId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.issueDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      complaint.status.toLowerCase() === statusFilter.toLowerCase().replace(' ', '-');
    
    const matchesPriority = 
      priorityFilter === 'all' || 
      complaint.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleStatusChange = (complaintId: string, newStatus: 'Open' | 'In Progress' | 'Resolved') => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
      )
    );
    toast.success(`Complaint status updated to ${newStatus}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Complaints</h1>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer, ID, or description..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={priorityFilter}
              onValueChange={setPriorityFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="crm-table">
            <TableHeader>
              <TableRow>
                <TableHead>Complaint ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Loan ID</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>{complaint.id}</TableCell>
                    <TableCell>
                      <Link 
                        to={`/customers/${complaint.customerId}`}
                        className="text-nh-blue hover:underline"
                      >
                        {complaint.customerName}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{complaint.loanId}</TableCell>
                    <TableCell>
                      <div className="max-w-[250px] truncate" title={complaint.issueDescription}>
                        {complaint.issueDescription}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        complaint.priority === 'High' ? 'destructive' :
                        complaint.priority === 'Medium' ? 'default' : 'outline'
                      }>
                        {complaint.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ComplaintStatusDropdown
                        status={complaint.status}
                        onStatusChange={(newStatus) => handleStatusChange(complaint.id, newStatus)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        asChild
                        variant="ghost" 
                        size="icon"
                      >
                        <Link to={`/complaints/${complaint.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No complaints found. Try a different search term or filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

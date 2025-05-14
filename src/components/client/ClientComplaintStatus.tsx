
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { complaints } from '@/data/mockData';
import { Complaint } from '@/types';

export default function ClientComplaintStatus() {
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState<Complaint | null>(null);
  const [notFound, setNotFound] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchId.trim()) return;
    
    setNotFound(false);
    
    // Search in mock data
    const foundComplaint = complaints.find(
      complaint => complaint.id.toLowerCase() === searchId.toLowerCase()
    );
    
    if (foundComplaint) {
      setSearchResult(foundComplaint);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open':
        return <Badge variant="outline" className="text-red-500 border-red-500">Open</Badge>;
      case 'In Progress':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">In Progress</Badge>;
      case 'Resolved':
        return <Badge variant="outline" className="text-green-500 border-green-500">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge>Medium</Badge>;
      case 'Low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-4">
          Enter your complaint ID to check the status of your complaint.
          Your complaint ID was provided to you when you submitted your complaint.
        </p>
        
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Enter Complaint ID (e.g., COMP-123)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>
      
      {notFound && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          No complaint found with ID: {searchId}. Please check the ID and try again.
        </div>
      )}
      
      {searchResult && (
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Complaint ID</h3>
              <p>{searchResult.id}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Submitted Date</h3>
              <p>{new Date(searchResult.createdAt).toLocaleDateString()}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <p>{getStatusBadge(searchResult.status)}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
              <p>{getPriorityBadge(searchResult.priority)}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Issue Description</h3>
            <p className="mt-1">{searchResult.issueDescription}</p>
          </div>
          
          {searchResult.status === 'Resolved' && searchResult.resolutionNotes && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Resolution Notes</h3>
              <p className="mt-1">{searchResult.resolutionNotes}</p>
            </div>
          )}
          
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Complaint Timeline</h3>
            <ul className="space-y-2">
              <li className="flex gap-2 items-start">
                <Badge variant="outline" className="mt-0.5">
                  {new Date(searchResult.createdAt).toLocaleDateString()}
                </Badge>
                <span>Complaint submitted</span>
              </li>
              
              {searchResult.status !== 'Open' && (
                <li className="flex gap-2 items-start">
                  <Badge variant="outline" className="mt-0.5">
                    {new Date(new Date(searchResult.createdAt).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </Badge>
                  <span>Complaint assigned and in progress</span>
                </li>
              )}
              
              {searchResult.status === 'Resolved' && (
                <li className="flex gap-2 items-start">
                  <Badge variant="outline" className="mt-0.5">
                    {new Date(new Date(searchResult.createdAt).getTime() + 72 * 60 * 60 * 1000).toLocaleDateString()}
                  </Badge>
                  <span>Complaint resolved</span>
                </li>
              )}
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
}

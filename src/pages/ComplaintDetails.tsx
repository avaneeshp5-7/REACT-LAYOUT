
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, User, FileText } from 'lucide-react';
import { complaints, customers } from '@/data/mockData';
import ComplaintStatusDropdown from '@/components/complaints/ComplaintStatusDropdown';
import { toast } from 'sonner';

export default function ComplaintDetails() {
  const { id } = useParams<{ id: string }>();
  const [complaint, setComplaint] = useState(complaints.find(c => c.id === id));
  const [resolutionNotes, setResolutionNotes] = useState(complaint?.resolutionNotes || '');
  const customer = customers.find(c => c.id === complaint?.customerId);
  
  if (!complaint) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Complaint Not Found</h1>
        <p className="mb-6">The complaint you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/complaints">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Complaints
          </Link>
        </Button>
      </div>
    );
  }

  const handleStatusChange = (newStatus: 'Open' | 'In Progress' | 'Resolved') => {
    setComplaint({
      ...complaint,
      status: newStatus
    });
    toast.success(`Status updated to ${newStatus}`);
  };
  
  const handleSaveResolution = () => {
    setComplaint({
      ...complaint,
      resolutionNotes: resolutionNotes
    });
    toast.success('Resolution notes saved');
  };

  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/complaints"
          className="text-nh-blue hover:text-nh-blue-light inline-flex items-center mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Complaints
        </Link>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Complaint #{complaint.id}</h1>
            <p className="text-muted-foreground">{new Date(complaint.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge variant={
              complaint.priority === 'High' ? 'destructive' :
              complaint.priority === 'Medium' ? 'default' : 'outline'
            }>
              {complaint.priority} Priority
            </Badge>
            <ComplaintStatusDropdown 
              status={complaint.status} 
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Issue Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{complaint.issueDescription}</p>
              
              <div className="bg-nh-gray/30 p-4 rounded-md mb-6">
                <h3 className="font-medium mb-2">Resolution Notes</h3>
                {complaint.status === 'Resolved' ? (
                  <p>{complaint.resolutionNotes || 'No resolution notes provided.'}</p>
                ) : (
                  <>
                    <Textarea 
                      value={resolutionNotes}
                      onChange={(e) => setResolutionNotes(e.target.value)}
                      placeholder="Enter resolution notes here..."
                      rows={4}
                    />
                    <Button 
                      onClick={handleSaveResolution}
                      className="mt-3 bg-nh-green hover:bg-nh-green-dark"
                    >
                      Save Resolution
                    </Button>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm text-muted-foreground">
                    {complaint.status === 'Resolved' ? 'Resolved' : 'Open'} for{' '}
                    {Math.ceil((new Date().getTime() - new Date(complaint.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
                {complaint.status !== 'Resolved' && (
                  <Button 
                    onClick={() => {
                      setComplaint({
                        ...complaint,
                        status: 'Resolved',
                        resolutionNotes: resolutionNotes || 'Issue resolved.'
                      });
                      toast.success('Complaint marked as resolved');
                    }}
                    className="bg-nh-green hover:bg-nh-green-dark"
                  >
                    Mark as Resolved
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customer ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Name</p>
                    <p className="font-medium">
                      <Link 
                        to={`/customers/${customer.id}`} 
                        className="text-nh-blue hover:underline"
                      >
                        {customer.name}
                      </Link>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Customer ID</p>
                    <p className="font-medium">{customer.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Loan ID</p>
                    <p className="font-medium">{complaint.loanId}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Business Rating</p>
                    <p className="font-medium">{customer.businessRating}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{customer.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{customer.phone}</p>
                  </div>
                </div>
              ) : (
                <p>Customer information not available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

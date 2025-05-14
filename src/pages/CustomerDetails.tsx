
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Phone, Mail, MapPin, Edit } from 'lucide-react';
import { customers, interactions, complaints } from '@/data/mockData';
import { Interaction, Complaint } from '@/types';
import InteractionTimeline from '@/components/customers/InteractionTimeline';
import AddInteractionForm from '@/components/customers/AddInteractionForm';
import { toast } from 'sonner';

export default function CustomerDetails() {
  const { id } = useParams<{ id: string }>();
  const customer = customers.find(c => c.id === id);
  const [customerInteractions, setCustomerInteractions] = useState<Interaction[]>(
    interactions.filter(i => i.customerId === id)
  );
  const customerComplaints = complaints.filter(c => c.customerId === id);
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!customer) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Customer Not Found</h1>
        <p className="mb-6">The customer you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/customers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customers
          </Link>
        </Button>
      </div>
    );
  }
  
  const handleAddInteraction = (interaction: Interaction) => {
    setCustomerInteractions([interaction, ...customerInteractions]);
    toast.success('Interaction added successfully');
  };
  
  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/customers"
          className="text-nh-blue hover:text-nh-blue-light inline-flex items-center mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Customers
        </Link>
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{customer.name}</h1>
          <Button asChild variant="outline">
            <Link to={`/customers/edit/${customer.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Customer
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p className="font-medium">{customer.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Loan ID</p>
                  <p className="font-medium">{customer.loanId}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Business Rating</p>
                  <p className="font-medium">{customer.businessRating}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                    {customer.status}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{customer.phone}</p>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{customer.email}</p>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                  <p>{customer.address}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-muted-foreground">Created On</p>
                  <p className="font-medium">{new Date(customer.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
              <TabsTrigger value="complaints">Complaints</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Interactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {customerInteractions.length > 0 ? (
                    <InteractionTimeline 
                      interactions={customerInteractions.slice(0, 3)} 
                      compact
                    />
                  ) : (
                    <p className="text-muted-foreground">No recent interactions.</p>
                  )}
                  
                  {customerInteractions.length > 3 && (
                    <Button 
                      variant="link" 
                      className="mt-4 px-0"
                      onClick={() => setActiveTab('interactions')}
                    >
                      View all interactions
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Complaints</CardTitle>
                </CardHeader>
                <CardContent>
                  {customerComplaints.length > 0 ? (
                    <div className="space-y-4">
                      {customerComplaints.slice(0, 2).map((complaint) => (
                        <div key={complaint.id} className="bg-nh-gray/30 p-4 rounded-md">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                              {new Date(complaint.createdAt).toLocaleDateString()}
                            </span>
                            <Badge 
                              variant={
                                complaint.status === 'Open' ? 'destructive' :
                                complaint.status === 'In Progress' ? 'default' : 'outline'
                              }
                            >
                              {complaint.status}
                            </Badge>
                          </div>
                          <p className="font-medium mb-1">{complaint.issueDescription}</p>
                          {complaint.resolutionNotes && (
                            <p className="text-sm mt-2">
                              <span className="font-medium">Resolution: </span>
                              {complaint.resolutionNotes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No complaints filed.</p>
                  )}
                  
                  {customerComplaints.length > 2 && (
                    <Button 
                      variant="link" 
                      className="mt-4 px-0"
                      onClick={() => setActiveTab('complaints')}
                    >
                      View all complaints
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="interactions">
              <Card>
                <CardHeader>
                  <CardTitle>Interaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  {customerInteractions.length > 0 ? (
                    <InteractionTimeline interactions={customerInteractions} />
                  ) : (
                    <p className="text-muted-foreground">No interactions recorded.</p>
                  )}
                  
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">Log New Interaction</h3>
                    <AddInteractionForm 
                      customerId={customer.id} 
                      onSubmit={handleAddInteraction}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="complaints">
              <Card>
                <CardHeader>
                  <CardTitle>Complaints</CardTitle>
                </CardHeader>
                <CardContent>
                  {customerComplaints.length > 0 ? (
                    <div className="space-y-6">
                      {customerComplaints.map((complaint) => (
                        <div key={complaint.id} className="bg-nh-gray/30 p-4 rounded-md">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                            <div>
                              <span className="inline-block mr-3 font-medium">#{complaint.id}</span>
                              <span className="text-sm text-muted-foreground">
                                {new Date(complaint.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex space-x-2 mt-2 md:mt-0">
                              <Badge variant="outline">{complaint.priority} Priority</Badge>
                              <Badge 
                                variant={
                                  complaint.status === 'Open' ? 'destructive' :
                                  complaint.status === 'In Progress' ? 'default' : 'outline'
                                }
                              >
                                {complaint.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="font-medium mb-3">{complaint.issueDescription}</p>
                          
                          {complaint.resolutionNotes ? (
                            <div className="bg-white p-3 rounded border">
                              <p className="text-sm font-medium mb-1">Resolution Notes:</p>
                              <p className="text-sm">{complaint.resolutionNotes}</p>
                            </div>
                          ) : (
                            complaint.status !== 'Resolved' && (
                              <Button variant="outline" size="sm">
                                Add Resolution
                              </Button>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No complaints filed.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

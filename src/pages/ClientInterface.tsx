
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Phone, Search } from 'lucide-react';
import ClientComplaintForm from '@/components/client/ClientComplaintForm';
import ClientComplaintStatus from '@/components/client/ClientComplaintStatus';
import MinimizableChatbot from '@/components/client/MinimizableChatbot';
import ClientIVRSection from '@/components/client/ClientIVRSection';

export default function ClientInterface() {
  const [activeTab, setActiveTab] = useState('lodge');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Client Support Portal
            </h1>
            <p className="mt-2 text-muted-foreground">
              We're here to help you with any issues or concerns
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
            <Phone className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <span className="text-muted-foreground">Need immediate help? Call: </span>
              <span className="font-medium">1-800-TACTION</span>
            </div>
          </div>
        </div>
      
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-8"
        >
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-2 rounded-lg shadow-sm">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto">
              <TabsTrigger 
                value="lodge" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Lodge Complaint
              </TabsTrigger>
              <TabsTrigger 
                value="status"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Search className="h-4 w-4 mr-2" />
                Check Status
              </TabsTrigger>
              <TabsTrigger 
                value="contact"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Us
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="lodge" className="space-y-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Submit a New Complaint</CardTitle>
              </CardHeader>
              <CardContent>
                <ClientComplaintForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="status">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Complaint Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ClientComplaintStatus />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Connect with an Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <ClientIVRSection />
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Customer Support</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          1-800-TACTION
                        </p>
                        <p className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          support@taction.com
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Business Hours</h3>
                      <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                        <p>Monday - Friday:</p>
                        <p>9:00 AM - 6:00 PM</p>
                        <p>Saturday:</p>
                        <p>10:00 AM - 2:00 PM</p>
                        <p>Sunday:</p>
                        <p>Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <MinimizableChatbot />
    </div>
  );
}

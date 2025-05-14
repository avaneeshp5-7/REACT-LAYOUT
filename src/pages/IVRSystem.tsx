import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Phone, MessageSquare } from 'lucide-react';
import { ivrCalls } from '@/data/mockData';
import { IVRCall, ActiveCall } from '@/types';
import ChatbotInterface from '@/components/ivr/ChatbotInterface';
import IncomingCallAlert from '@/components/ivr/IncomingCallAlert';
import CustomerCallDetails from '@/components/ivr/CustomerCallDetails';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function IVRSystem() {
  const [calls, setCalls] = useState<IVRCall[]>(ivrCalls);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ivr');
  const [incomingCall, setIncomingCall] = useState<IVRCall | null>(null);
  const [activeCall, setActiveCall] = useState<IVRCall | null>(null);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const storedCalls = localStorage.getItem('ivrCalls');
    if (storedCalls) {
      try {
        const parsedCalls = JSON.parse(storedCalls);
        if (Array.isArray(parsedCalls) && parsedCalls.length > 0) {
          setCalls(prevCalls => [...parsedCalls, ...prevCalls]);
        }
      } catch (error) {
        console.error('Error parsing stored calls:', error);
      }
    }
  }, []);
  
  useEffect(() => {
    if (activeCall || incomingCall) return;
    
    const checkTimer = setTimeout(() => {
      if (Math.random() < 0.3) {
        simulateIncomingCall();
      }
    }, 30000);
    
    return () => clearTimeout(checkTimer);
  }, [activeCall, incomingCall, calls]);
  
  useEffect(() => {
    let timer: number;
    
    if (activeCall) {
      timer = window.setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeCall]);

  useEffect(() => {
    const channel = supabase
      .channel('active-calls')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'active_calls'
        },
        (payload) => {
          const newCallData = payload.new as unknown as ActiveCall;
          
          const newCall: IVRCall = {
            id: newCallData.id,
            customerId: newCallData.customer_phone,
            customerName: newCallData.customer_name,
            phone: newCallData.customer_phone,
            status: "In Queue",
            startTime: newCallData.created_at,
            notes: newCallData.issue_type,
            duration: 0
          };

          const audio = new Audio('/notification.mp3');
          audio.play().catch(err => console.log('Audio play failed:', err));

          setIncomingCall(newCall);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredCalls = calls.filter(call => 
    call.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    call.phone.includes(searchQuery) ||
    call.customerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDuration = (seconds?: number): string => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const simulateNewCall = () => {
    const newCallId = `CALL-${Math.floor(Math.random() * 1000)}`;
    const customerIndex = Math.floor(Math.random() * 3);
    const customerNames = ['Kim Min-jae', 'Park Ji-sung', 'Son Heung-min'];
    const phones = ['010-1234-5678', '010-8765-4321', '010-2468-1357'];
    const customerIds = ['CUST-101', 'CUST-102', 'CUST-103'];
    
    const newCall: IVRCall = {
      id: newCallId,
      customerId: customerIds[customerIndex],
      customerName: customerNames[customerIndex],
      phone: phones[customerIndex],
      status: "In Queue" as const,
      startTime: new Date().toISOString(),
      duration: 0
    };
    
    setCalls([newCall, ...calls]);
    toast.success(`New call from ${customerNames[customerIndex]} added to queue`);
  };

  const simulateIncomingCall = () => {
    const customerIndex = Math.floor(Math.random() * 3);
    const customerNames = ['Kim Min-jae', 'Park Ji-sung', 'Son Heung-min'];
    const phones = ['010-1234-5678', '010-8765-4321', '010-2468-1357'];
    const customerIds = ['CUST-101', 'CUST-102', 'CUST-103'];
    const reasons = ['Loan application status', 'Technical issue', 'General inquiry'];
    
    const incomingCallData: IVRCall = {
      id: `CALL-${Date.now().toString().slice(-6)}`,
      customerId: customerIds[customerIndex],
      customerName: customerNames[customerIndex],
      phone: phones[customerIndex],
      status: "In Queue" as const,
      startTime: new Date().toISOString(),
      duration: 0,
      notes: reasons[Math.floor(Math.random() * reasons.length)]
    };
    
    setIncomingCall(incomingCallData);
    const audio = new Audio('/notification.mp3');
    audio.play().catch(err => console.log('Audio play failed:', err));
  };
  
  const handleAcceptCall = async (call: IVRCall) => {
    try {
      const updateData = {
        status: 'in_progress', 
        agent_id: 'current_agent_id'
      };
      
      const { error } = await supabase
        .from('active_calls')
        .update(updateData)
        .eq('id', call.id);

      if (error) throw error;

      const updatedCall = { ...call, status: "In Progress" as const };
      
      const callExists = calls.some(c => c.id === call.id);
      if (!callExists) {
        setCalls([updatedCall, ...calls]);
      } else {
        setCalls(calls.map(c => c.id === call.id ? updatedCall : c));
      }
      
      setActiveCall(updatedCall);
      setIncomingCall(null);
      setCallDuration(0);
      toast.success(`Call with ${call.customerName} connected`);
    } catch (error) {
      console.error('Error accepting call:', error);
      toast.error('Failed to accept call');
    }
  };
  
  const handleRejectCall = async (call: IVRCall) => {
    try {
      const updateData = { 
        status: 'rejected' 
      };
      
      const { error } = await supabase
        .from('active_calls')
        .update(updateData)
        .eq('id', call.id);

      if (error) throw error;

      const updatedCall = { ...call, status: "Missed" as const };
      
      const callExists = calls.some(c => c.id === call.id);
      if (!callExists) {
        setCalls([updatedCall, ...calls]);
      } else {
        setCalls(calls.map(c => c.id === call.id ? updatedCall : c));
      }
      
      setIncomingCall(null);
      toast.info(`Call from ${call.customerName} was rejected`);
    } catch (error) {
      console.error('Error rejecting call:', error);
      toast.error('Failed to reject call');
    }
  };
  
  const handleEndCall = async () => {
    if (activeCall) {
      try {
        const updateData = {
          status: 'completed',
          duration: callDuration,
          ended_at: new Date().toISOString()
        };
        
        const { error } = await supabase
          .from('active_calls')
          .update(updateData)
          .eq('id', activeCall.id);

        if (error) throw error;

        const updatedCall: IVRCall = { 
          ...activeCall, 
          status: "Completed" as const, 
          duration: callDuration,
          endTime: new Date().toISOString()
        };
        
        setCalls(calls.map(c => c.id === activeCall.id ? updatedCall : c));
        toast.info(`Call with ${activeCall.customerName} ended after ${formatDuration(callDuration)}`);
        setActiveCall(null);
        setCallDuration(0);
      } catch (error) {
        console.error('Error ending call:', error);
        toast.error('Failed to end call');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Queue':
        return <Badge variant="outline">In Queue</Badge>;
      case 'In Progress':
        return <Badge>In Progress</Badge>;
      case 'Completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'Missed':
        return <Badge variant="destructive">Missed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Customer Support Systems</h1>
      
      {incomingCall && !activeCall && (
        <div className="mb-6">
          <IncomingCallAlert 
            call={incomingCall} 
            onAccept={handleAcceptCall} 
            onReject={handleRejectCall} 
          />
        </div>
      )}
      
      {activeCall && (
        <div className="mb-6">
          <CustomerCallDetails
            customerName={activeCall.customerName}
            customerId={activeCall.customerId}
            phone={activeCall.phone}
            reason={activeCall.notes}
            callId={activeCall.id}
            duration={callDuration}
            onEndCall={handleEndCall}
          />
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="ivr" className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            IVR System
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chatbot
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ivr">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Voice Response (IVR) Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by customer name or phone..."
                    className="pl-9 w-full max-w-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table className="crm-table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Call ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCalls.length > 0 ? (
                        filteredCalls.map((call) => (
                          <TableRow key={call.id}>
                            <TableCell>{call.id}</TableCell>
                            <TableCell>{call.customerName}</TableCell>
                            <TableCell>{call.phone}</TableCell>
                            <TableCell>{getStatusBadge(call.status)}</TableCell>
                            <TableCell>{new Date(call.startTime).toLocaleString()}</TableCell>
                            <TableCell>{formatDuration(call.duration)}</TableCell>
                            <TableCell>
                              {call.status === 'In Queue' && !activeCall && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleAcceptCall(call)}
                                >
                                  Answer
                                </Button>
                              )}
                              {call.status !== 'In Queue' && (
                                <Button variant="outline" size="sm">
                                  Details
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            No calls found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-medium mb-4">IVR System Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-center">{calls.filter(c => c.status === 'In Queue').length}</div>
                      <p className="text-muted-foreground text-center">In Queue</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-center">{calls.filter(c => c.status === 'In Progress').length}</div>
                      <p className="text-muted-foreground text-center">In Progress</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-center">{calls.filter(c => c.status === 'Completed').length}</div>
                      <p className="text-muted-foreground text-center">Completed Today</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <Button className="bg-primary hover:bg-primary/90" onClick={simulateNewCall}>
                    Simulate New Queue Call
                  </Button>
                  <Button variant="outline" onClick={simulateIncomingCall} disabled={!!incomingCall || !!activeCall}>
                    Simulate Incoming Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chatbot">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Chatbot Interface Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <ChatbotInterface />
              </CardContent>
            </Card>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Chatbot Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Sessions</p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Resolved Queries</p>
                      <p className="text-2xl font-bold">124</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Escalated to Agent</p>
                      <p className="text-2xl font-bold">18</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                      <p className="text-2xl font-bold">92%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Common Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Loan application status</span>
                      <Badge variant="outline">35%</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Password reset</span>
                      <Badge variant="outline">22%</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Business rating queries</span>
                      <Badge variant="outline">18%</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Document requirements</span>
                      <Badge variant="outline">14%</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Other</span>
                      <Badge variant="outline">11%</Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

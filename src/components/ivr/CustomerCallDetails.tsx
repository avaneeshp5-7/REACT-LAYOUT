
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PhoneOff, MicOff, Mic } from 'lucide-react';
import { useState } from 'react';

interface CustomerCallDetailsProps {
  customerName: string;
  customerId: string;
  phone: string;
  email?: string;
  reason?: string;
  callId: string;
  duration: number;
  onEndCall: () => void;
}

export default function CustomerCallDetails({
  customerName,
  customerId,
  phone,
  email = 'Not provided',
  reason = 'General inquiry',
  callId,
  duration,
  onEndCall,
}: CustomerCallDetailsProps) {
  const [isMuted, setIsMuted] = useState(false);
  
  // Format duration as mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Call Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Call Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold">{formatDuration(duration)}</p>
              <p className="text-muted-foreground">Call Duration</p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button 
                size="icon" 
                variant={isMuted ? "destructive" : "outline"} 
                className="h-12 w-12 rounded-full"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <Button 
                size="icon" 
                variant="destructive" 
                className="h-12 w-12 rounded-full"
                onClick={onEndCall}
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="text-center">
              <Badge variant="outline">Call ID: {callId}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Customer Information */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">{customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-xl font-semibold">{customerName}</h3>
                <p className="text-muted-foreground">Customer ID: {customerId}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Contact Information</p>
                  <p className="font-medium">{phone}</p>
                  <p className="font-medium">{email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Reason for Call</p>
                  <p className="font-medium">{reason}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Recent History</p>
                <div className="space-y-2">
                  <div className="text-sm p-2 bg-muted rounded">
                    <p className="font-medium">Previous call: 2 days ago</p>
                    <p>Discussed loan application status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

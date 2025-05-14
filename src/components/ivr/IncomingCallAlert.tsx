
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, UserCheck, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { IVRCall } from '@/types';

interface IncomingCallAlertProps {
  call: IVRCall;
  onAccept: (call: IVRCall) => void;
  onReject: (call: IVRCall) => void;
}

export default function IncomingCallAlert({ call, onAccept, onReject }: IncomingCallAlertProps) {
  const [timeLeft, setTimeLeft] = useState(15);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onReject(call);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [call, onReject]);
  
  return (
    <Card className="border-2 border-primary animate-pulse">
      <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Phone className="h-6 w-6 text-primary animate-bounce" />
          </div>
          
          <div>
            <h3 className="font-semibold">Incoming Call from {call.customerName}</h3>
            <p className="text-sm text-muted-foreground">{call.phone}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold mr-2">Auto-reject in {timeLeft}s</span>
          
          <Button 
            size="sm" 
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
            onClick={() => onReject(call)}
          >
            <XCircle className="h-4 w-4 mr-1" />
            Reject
          </Button>
          
          <Button 
            size="sm" 
            onClick={() => onAccept(call)}
          >
            <UserCheck className="h-4 w-4 mr-1" />
            Answer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

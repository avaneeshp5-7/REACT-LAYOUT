
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Phone, Mic, MicOff, PhoneOff } from 'lucide-react';

const ClientCallSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'completed'>('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [notes, setNotes] = useState('');

  // Get customer information from location state or use default values
  const customerName = location.state?.customerName || 'Customer';
  const customerPhone = location.state?.phone || '+1234567890';
  const ticketInfo = location.state?.ticketInfo || 'General Support';

  useEffect(() => {
    // Simulate call connecting
    const connectTimer = setTimeout(() => {
      setCallStatus('connected');
      toast.success('Call connected successfully');
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    // Call timer
    let timer: NodeJS.Timeout;
    
    if (callStatus === 'connected') {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [callStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? 'Microphone unmuted' : 'Microphone muted');
  };

  const handleEndCall = () => {
    setCallStatus('completed');
    toast.info('Call ended');
    
    // Simulate call ending and returning to previous screen
    setTimeout(() => {
      navigate('/client', { 
        state: { 
          callCompleted: true,
          callDuration: formatTime(callDuration)
        } 
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col gap-6">
          {/* Call status header */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>
                  {callStatus === 'connecting' ? 'Connecting...' : 
                   callStatus === 'connected' ? 'Call in Progress' : 'Call Completed'}
                </span>
                <span className="text-xl text-primary font-mono">{formatTime(callDuration)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold">{customerName}</p>
                  <p className="text-muted-foreground">{customerPhone}</p>
                  <p className="mt-2 text-sm bg-primary/10 inline-block px-3 py-1 rounded-full">
                    {ticketInfo}
                  </p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    size="icon"
                    onClick={handleMuteToggle}
                    disabled={callStatus !== 'connected'}
                    className="h-12 w-12 rounded-full"
                  >
                    {isMuted ? <MicOff /> : <Mic />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={handleEndCall}
                    disabled={callStatus !== 'connected'}
                    className="h-12 w-12 rounded-full"
                  >
                    <PhoneOff />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call notes */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Call Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter call notes here..."
                    className="h-32"
                    disabled={callStatus === 'completed'}
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full" 
                    disabled={callStatus === 'completed' || notes.trim() === ''}
                    onClick={() => toast.success('Notes saved successfully')}
                  >
                    Save Notes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call instructions */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">This is a simulated call session.</span> In a real implementation, this would connect to your phone system or VoIP service.
                </p>
                <p className="text-muted-foreground">
                  When the call ends, you will be returned to the client portal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientCallSession;

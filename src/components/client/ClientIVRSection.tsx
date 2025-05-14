
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ActiveCall } from '@/types';
import type { Database } from '@/integrations/supabase/types';

export default function ClientIVRSection() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [issueType, setIssueType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    
    if (!issueType) {
      toast.error('Please select an issue type');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create new active call record
      const newCall = {
        customer_phone: phoneNumber,
        issue_type: issueType,
        status: 'requesting',
        customer_name: 'Customer', // You can update this if you have customer name
        created_at: new Date().toISOString(),
      };

      // Insert into Supabase with proper typing
      const { error } = await supabase
        .from('active_calls')
        .insert([newCall]);

      if (error) throw error;

      toast.success('Call request submitted successfully');
      
      // Navigate to call session page
      navigate('/client/call-session', {
        state: {
          customerName: 'Customer',
          phone: phoneNumber,
          ticketInfo: issueType
        }
      });
    } catch (error) {
      console.error('Error submitting call:', error);
      toast.error('Failed to submit call request');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Your Phone Number</Label>
        <Input 
          id="phone" 
          type="tel" 
          placeholder="Enter your phone number" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="issue-type">Issue Type</Label>
        <Select 
          value={issueType} 
          onValueChange={setIssueType}
        >
          <SelectTrigger id="issue-type">
            <SelectValue placeholder="Select issue type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="General Support">General Support</SelectItem>
            <SelectItem value="Technical Issue">Technical Issue</SelectItem>
            <SelectItem value="Billing Question">Billing Question</SelectItem>
            <SelectItem value="Account Assistance">Account Assistance</SelectItem>
            <SelectItem value="Product Information">Product Information</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="pt-2">
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          <Phone className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Requesting Call...' : 'Request Call Now'}
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4">
        Our support team will connect with you on the provided number. Standard call rates may apply.
      </p>
    </form>
  );
}

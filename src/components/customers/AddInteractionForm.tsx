
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Interaction } from '@/types';

type AddInteractionFormProps = {
  customerId: string;
  onSubmit: (interaction: Interaction) => void;
};

export default function AddInteractionForm({ customerId, onSubmit }: AddInteractionFormProps) {
  const [type, setType] = useState<'Call' | 'Email' | 'Complaint'>('Call');
  const [notes, setNotes] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!notes.trim()) return;
    
    const newInteraction: Interaction = {
      id: `INT${Math.floor(Math.random() * 1000)}`,
      customerId,
      type,
      date: new Date().toISOString(),
      notes,
      agentName: 'Kim Min-jae', // This would come from the logged in user in a real app
    };
    
    onSubmit(newInteraction);
    setNotes('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Select value={type} onValueChange={(value) => setType(value as 'Call' | 'Email' | 'Complaint')}>
          <SelectTrigger>
            <SelectValue placeholder="Interaction Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Call">Call</SelectItem>
            <SelectItem value="Email">Email</SelectItem>
            <SelectItem value="Complaint">Complaint</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Textarea
          placeholder="Describe the interaction..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          required
        />
      </div>
      
      <Button type="submit" className="bg-nh-green hover:bg-nh-green-dark">
        Log Interaction
      </Button>
    </form>
  );
}

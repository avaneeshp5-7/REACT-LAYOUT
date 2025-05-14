
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { ChatMessage } from '@/types';

export default function ClientChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      content: 'Welcome to HelpHive Support Centre\n\nHow can I assist you today?',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ticketCreationStep, setTicketCreationStep] = useState<'initial' | 'collecting_info' | 'confirmation' | null>(null);
  const [ticketInfo, setTicketInfo] = useState({
    fullName: '',
    email: '',
    issue: ''
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    const lowercaseInput = userMessage.toLowerCase();
    
    if (ticketCreationStep === 'collecting_info') {
      if (!ticketInfo.fullName) {
        setTicketInfo(prev => ({ ...prev, fullName: userMessage }));
        return "Great! Now, please provide your email address.";
      } else if (!ticketInfo.email) {
        setTicketInfo(prev => ({ ...prev, email: userMessage }));
        return "Thank you. Please describe your issue in detail.";
      } else if (!ticketInfo.issue) {
        setTicketInfo(prev => ({ ...prev, issue: userMessage }));
        setTicketCreationStep('confirmation');
        const ticketNumber = Math.floor(10000 + Math.random() * 90000);
        return `Great! I've created a helpdesk ticket for you. Your ticket number is #${ticketNumber}\n\nOur support team will review your issue and get back to you shortly.\n\nIn the meantime, you can track your ticket status in the "Check Status" tab using your ticket number.`;
      }
    }
    
    if (lowercaseInput.includes('ticket') || lowercaseInput.includes('issue') || lowercaseInput.includes('problem')) {
      setTicketCreationStep('collecting_info');
      return "I'll create a helpdesk ticket for you. Could you please provide the following details:\n\n1. Your full name\n2. Your email address\n3. A detailed description of your issue";
    }
    
    if (lowercaseInput.includes('thank')) {
      return "You're welcome! If you have any more questions or need further assistance, feel free to ask. Have a great day!";
    }
    
    return "I understand you need assistance. Would you like to create a support ticket? I can help guide you through the process.";
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      const response = await generateBotResponse(input);
      
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: `msg-${Date.now()}-bot`,
          sender: 'bot',
          content: response,
          timestamp: new Date().toISOString(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    } catch (error) {
      console.error('Error generating response:', error);
      setIsTyping(false);
      toast.error('Failed to process your message. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-[400px] bg-white dark:bg-gray-800">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src="/placeholder.svg" alt="Support Bot" />
                  <AvatarFallback>Bot</AvatarFallback>
                </Avatar>
              )}
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-muted text-muted-foreground rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg" alt="Support Bot" />
                <AvatarFallback>Bot</AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon" variant="default">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

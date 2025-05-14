
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { ChatMessage } from '@/types';

export default function ChatbotInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
    // Customize bot responses based on keywords
    const lowercaseInput = userMessage.toLowerCase();
    
    if (lowercaseInput.includes('loan') || lowercaseInput.includes('application')) {
      return 'I can help you with loan applications. To proceed, I\'ll need your customer ID and some basic information. Would you like to start the application process?';
    } else if (lowercaseInput.includes('status')) {
      return 'I can check the status of your application or complaint. Please provide your reference number.';
    } else if (lowercaseInput.includes('help')) {
      return 'I can assist you with:\n- Loan applications\n- Checking application status\n- Filing complaints\n- General inquiries\n\nWhat would you like help with?';
    } else if (lowercaseInput.includes('complaint') || lowercaseInput.includes('issue')) {
      return 'I understand you have a concern. Could you please provide more details about the issue? This will help me assist you better or direct you to the right department.';
    } else if (lowercaseInput.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    }
    
    return 'I understand. Could you please provide more details about your inquiry? This will help me assist you better.';
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Generate bot response after a short delay
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
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    } catch (error) {
      console.error('Error generating response:', error);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-md overflow-hidden">
      <div className="p-4 bg-primary text-white flex items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">AI Assistant</p>
          <p className="text-xs opacity-80">Online</p>
        </div>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
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
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
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
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

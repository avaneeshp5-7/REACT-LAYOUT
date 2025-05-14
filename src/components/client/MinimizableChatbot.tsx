
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Maximize2, MessageSquare, Minimize2 } from 'lucide-react';
import ClientChatbot from './ClientChatbot';

export default function MinimizableChatbot() {
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <div className="relative">
      {isMinimized ? (
        <Button
          onClick={() => setIsMinimized(false)}
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      ) : (
        <div className="fixed bottom-4 right-4 w-[380px] rounded-lg shadow-lg bg-background border">
          <div className="flex justify-between items-center p-2 border-b">
            <span className="font-medium">AI Assistant</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(true)}
              className="h-8 w-8"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
          <ClientChatbot />
        </div>
      )}
    </div>
  );
}

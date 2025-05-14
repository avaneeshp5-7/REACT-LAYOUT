
import { Interaction } from '@/types';
import { Phone, Mail, MessageSquare } from 'lucide-react';

type InteractionTimelineProps = {
  interactions: Interaction[];
  compact?: boolean;
};

export default function InteractionTimeline({ interactions, compact = false }: InteractionTimelineProps) {
  // Sort interactions by date, newest first
  const sortedInteractions = [...interactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'Call':
        return <Phone className="h-4 w-4" />;
      case 'Email':
        return <Mail className="h-4 w-4" />;
      case 'Complaint':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {sortedInteractions.map((interaction) => (
        <div 
          key={interaction.id}
          className="relative pl-6 pb-6 border-l-2 border-nh-green last:border-l-transparent last:pb-0"
        >
          <div 
            className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-nh-green ${
              interaction.type === 'Call' ? 'text-nh-green' :
              interaction.type === 'Email' ? 'text-blue-500' : 'text-amber-500'
            }`}
          >
            {getIcon(interaction.type)}
          </div>
          <div className={compact ? "" : "bg-nh-gray/30 p-3 rounded-md"}>
            <div className="flex justify-between mb-1">
              <span className={`font-medium ${compact ? "text-sm" : ""}`}>
                {interaction.type}
              </span>
              <span className="text-sm text-muted-foreground">
                {new Date(interaction.date).toLocaleDateString()}
              </span>
            </div>
            <p className={compact ? "text-sm line-clamp-1" : ""}>{interaction.notes}</p>
            {!compact && (
              <p className="text-sm text-muted-foreground mt-1">
                Agent: {interaction.agentName}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

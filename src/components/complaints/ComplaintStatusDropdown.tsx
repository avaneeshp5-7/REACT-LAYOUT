
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ComplaintStatusDropdownProps = {
  status: 'Open' | 'In Progress' | 'Resolved';
  onStatusChange: (newStatus: 'Open' | 'In Progress' | 'Resolved') => void;
};

export default function ComplaintStatusDropdown({ status, onStatusChange }: ComplaintStatusDropdownProps) {
  return (
    <Select value={status} onValueChange={onStatusChange}>
      <SelectTrigger className={`w-[130px] ${
        status === 'Open' ? 'text-red-500 border-red-500' :
        status === 'In Progress' ? 'text-blue-500 border-blue-500' :
        'text-green-500 border-green-500'
      }`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Open" className="text-red-500">Open</SelectItem>
        <SelectItem value="In Progress" className="text-blue-500">In Progress</SelectItem>
        <SelectItem value="Resolved" className="text-green-500">Resolved</SelectItem>
      </SelectContent>
    </Select>
  );
}

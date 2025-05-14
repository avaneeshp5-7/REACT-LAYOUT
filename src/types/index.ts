
export type User = {
  id: string;
  username: string;
  role: 'Admin' | 'Agent';
  name: string;
  avatar?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  loanId: string;
  businessRating: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
};

export type Interaction = {
  id: string;
  customerId: string;
  type: 'Call' | 'Email' | 'Complaint';
  date: string;
  notes: string;
  agentName: string;
};

export type Complaint = {
  id: string;
  customerId: string;
  customerName?: string;
  loanId: string;
  issueDescription: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  resolutionNotes?: string;
  createdAt: string;
  assignedTo?: string; // Adding the missing property
};

export type DashboardMetrics = {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  openComplaints: number;
  inProgressComplaints: number;
  resolvedComplaints: number;
  recentInteractions: number;
};

export type ChatMessage = {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
};

export interface IVRCall {
  id: string;
  customerId: string;
  customerName: string;
  phone: string;
  status: "In Queue" | "In Progress" | "Completed" | "Missed";
  startTime: string;
  endTime?: string;
  duration?: number;
  notes?: string;
}

// Add this new type for active calls in Supabase
export type ActiveCall = {
  id: string;
  customer_phone: string;
  customer_name: string;
  issue_type: string;
  status: 'requesting' | 'in_progress' | 'completed' | 'rejected';
  created_at: string;
  agent_id?: string;
  duration?: number;
  ended_at?: string;
};

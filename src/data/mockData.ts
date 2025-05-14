
import { Customer, Complaint, Interaction, User, DashboardMetrics, ChatMessage, IVRCall } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: 'user1',
    username: 'admin',
    role: 'Admin',
    name: 'Admin User',
    avatar: '/avatar1.jpg',
  },
  {
    id: 'user2',
    username: 'agent1',
    role: 'Agent',
    name: 'Kim Min-jae',
    avatar: '/avatar2.jpg',
  },
];

// Mock Customers
export const customers: Customer[] = [
  {
    id: 'CUST001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.in',
    phone: '+91-98765-43210',
    address: '123 MG Road, Andheri East, Mumbai',
    loanId: 'LOAN001',
    businessRating: 'A',
    status: 'Active',
    createdAt: '2025-01-15T09:30:00',
  },
  {
    id: 'CUST002',
    name: 'Priya Mehra',
    email: 'priya.mehra@example.in',
    phone: '+91-87654-32109',
    address: '456 Brigade Road, Indiranagar, Bangalore',
    loanId: 'LOAN002',
    businessRating: 'B+',
    status: 'Active',
    createdAt: '2025-02-10T14:20:00',
  },
  {
    id: 'CUST003',
    name: 'Vikram Desai',
    email: 'vikram.desai@example.in',
    phone: '+91-91234-56789',
    address: '789 SG Highway, Satellite, Ahmedabad',
    loanId: 'LOAN003',
    businessRating: 'A-',
    status: 'Inactive',
    createdAt: '2025-01-05T11:15:00',
  },
  {
    id: 'CUST004',
    name: 'Amitabh Verma',
    email: 'amitabh.verma@example.in',
    phone: '+91-99887-77665',
    address: '101 Park Street, Salt Lake, Kolkata',
    loanId: 'LOAN004',
    businessRating: 'A+',
    status: 'Active',
    createdAt: '2025-03-20T16:45:00',
  },
  {
    id: 'CUST005',
    name: 'Sneha Iyer',
    email: 'sneha.iyer@example.in',
    phone: '+91-90909-80808',
    address: '202 Anna Salai, T. Nagar, Chennai',
    loanId: 'LOAN005',
    businessRating: 'B',
    status: 'Active',
    createdAt: '2025-02-25T10:10:00',
  },
];


// Mock Complaints
export const complaints: Complaint[] = [
  {
    id: 'COMP001',
    customerId: 'CUST001',
    customerName: 'Rahul Sharma',
    loanId: 'LOAN001',
    issueDescription: 'Incorrect interest rate calculation on recent statement',
    status: 'Open',
    priority: 'High',
    createdAt: '2025-04-10T09:15:00',
  },
  {
    id: 'COMP002',
    customerId: 'CUST002',
    customerName: 'Priya Mehra',
    loanId: 'LOAN002',
    issueDescription: 'Missing documentation for loan application',
    status: 'In Progress',
    priority: 'Medium',
    resolutionNotes: 'Contacted customer to request missing documents',
    createdAt: '2025-04-08T14:30:00',
  },
  {
    id: 'COMP003',
    customerId: 'CUST004',
    customerName: 'Amitabh Verma',
    loanId: 'LOAN004',
    issueDescription: 'Unable to access online banking portal',
    status: 'Resolved',
    priority: 'Low',
    resolutionNotes: 'Reset customer password and provided login instructions',
    createdAt: '2025-04-05T11:20:00',
  },
  {
    id: 'COMP004',
    customerId: 'CUST005',
    customerName: 'Sneha Iyer',
    loanId: 'LOAN005',
    issueDescription: 'Loan application has been pending for over 2 weeks',
    status: 'In Progress',
    priority: 'High',
    resolutionNotes: 'Escalated to loan department for expedited processing',
    createdAt: '2025-04-12T16:05:00',
  },
  {
    id: 'COMP005',
    customerId: 'CUST003',
    customerName: 'Vikram Desai',
    loanId: 'LOAN003',
    issueDescription: 'Disagrees with business rating assessment',
    status: 'Open',
    priority: 'Medium',
    createdAt: '2025-04-15T10:45:00',
  },
];


// Mock Interactions
export const interactions: Interaction[] = [
  {
    id: 'INT001',
    customerId: 'CUST001',
    type: 'Call',
    date: '2025-04-15T10:30:00',
    notes: 'Discussed interest rate discrepancy on loan statement',
    agentName: 'Aarav Singh',
  },
  {
    id: 'INT002',
    customerId: 'CUST001',
    type: 'Email',
    date: '2025-04-16T14:20:00',
    notes: 'Sent revised loan statement with corrected calculations',
    agentName: 'Aarav Singh',
  },
  {
    id: 'INT003',
    customerId: 'CUST002',
    type: 'Call',
    date: '2025-04-08T11:15:00',
    notes: 'Requested missing documentation for loan application',
    agentName: 'Riya Kapoor',
  },
  {
    id: 'INT004',
    customerId: 'CUST004',
    type: 'Email',
    date: '2025-04-05T09:45:00',
    notes: 'Sent password reset instructions for online banking portal',
    agentName: 'Devansh Mehta',
  },
  {
    id: 'INT005',
    customerId: 'CUST005',
    type: 'Complaint',
    date: '2025-04-12T15:30:00',
    notes: 'Filed complaint about loan application processing delay',
    agentName: 'Aarav Singh',
  },
  {
    id: 'INT006',
    customerId: 'CUST003',
    type: 'Call',
    date: '2025-04-15T10:00:00',
    notes: 'Discussed business rating assessment methodology',
    agentName: 'Devansh Mehta',
  },
  {
    id: 'INT007',
    customerId: 'CUST001',
    type: 'Email',
    date: '2025-04-18T09:20:00',
    notes: 'Customer confirmed satisfaction with revised statement',
    agentName: 'Aarav Singh',
  },
];

// Mock Dashboard Metrics
export const dashboardMetrics: DashboardMetrics = {
  totalCustomers: 5,
  activeCustomers: 4,
  inactiveCustomers: 1,
  openComplaints: 2,
  inProgressComplaints: 2,
  resolvedComplaints: 1,
  recentInteractions: 7,
};

// Mock Chat Messages
export const chatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    sender: 'user',
    content: 'Hello, I need help with my loan application.',
    timestamp: '2025-04-20T10:15:00',
  },
  {
    id: 'msg2',
    sender: 'bot',
    content: 'Hello! I\'d be happy to help you with your loan application. Could you please provide your loan ID?',
    timestamp: '2025-04-20T10:15:10',
  },
  {
    id: 'msg3',
    sender: 'user',
    content: 'My loan ID is LOAN005.',
    timestamp: '2025-04-20T10:15:30',
  },
  {
    id: 'msg4',
    sender: 'bot',
    content: 'Thank you. I can see that your application is currently being processed. The status shows "In Progress" and it has been escalated for expedited processing. Is there anything specific you\'d like to know about your application?',
    timestamp: '2025-04-20T10:15:45',
  },
  {
    id: 'msg5',
    sender: 'user',
    content: 'When can I expect a decision?',
    timestamp: '2025-04-20T10:16:00',
  },
  {
    id: 'msg6',
    sender: 'bot',
    content: 'Based on our records, you should receive a decision within 3-5 business days. Would you like me to send you an email notification when the decision is made?',
    timestamp: '2025-04-20T10:16:15',
  },
];

// Mock IVR Calls
export const ivrCalls: IVRCall[] = [
  {
    id: 'IVR001',
    customerId: 'CUST001',
    customerName: 'Rahul Sharma',
    phone: '+91-98765-43210',
    status: 'Completed',
    duration: 340,
    startTime: '2025-04-19T10:30:00',
    endTime: '2025-04-19T10:35:40',
    notes: 'Asked about loan statement. Transferred to agent.',
  },
  {
    id: 'IVR002',
    customerId: 'CUST003',
    customerName: 'Vikram Desai',
    phone: '+91-91234-56789',
    status: 'Missed',
    startTime: '2025-04-19T14:20:00',
  },
  {
    id: 'IVR003',
    customerId: 'CUST004',
    customerName: 'Amitabh Verma',
    phone: '+91-99887-77665',
    status: 'In Progress',
    startTime: '2025-04-20T11:15:00',
  },
  {
    id: 'IVR004',
    customerId: 'CUST005',
    customerName: 'Sneha Iyer',
    phone: '+91-90909-80808',
    status: 'In Queue',
    startTime: '2025-04-20T11:18:00',
  },
];


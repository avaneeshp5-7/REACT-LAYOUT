
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { dashboardMetrics, complaints, interactions } from "@/data/mockData";
import {
  BarChart, PieChart, LineChart, Activity, Users, AlertCircle,
  CheckCircle, Clock, Home, Filter, ArrowRight, MoreVertical,
  Plus, Upload, ChevronLeft, ChevronRight, Search
} from "lucide-react";
import {
  ResponsiveContainer, PieChart as RechartPieChart, Pie, Cell,
  LineChart as RechartLineChart, Line, BarChart as RechartBarChart,
  Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState("week");
  const [sortField, setSortField] = useState("dateCreated");
  const [currentPage, setCurrentPage] = useState(1);
  const [chartView, setChartView] = useState("day");

  // Summary metrics cards data
  const summaryMetrics = [
    { title: "New Tickets", value: "2458", icon: Home, color: "text-blue-500", percent: "", trend: "" },
    { title: "Unassigned Tickets", value: "284", icon: AlertCircle, color: "text-green-500", percent: "8%", trend: "up" },
    { title: "In Progress Tickets", value: "98", icon: Clock, color: "text-blue-500", percent: "16%", trend: "down" },
    { title: "Closed Tickets", value: "45", icon: CheckCircle, color: "text-yellow-500", percent: "17%", trend: "up" },
    { title: "Unassigned", value: "14", icon: Users, color: "text-red-500", percent: "10%", trend: "up" },
  ];

  // Ticket trends data
  const trendData = [
    { name: "Monday 15", newTickets: 35, resolvedTickets: 25 },
    { name: "Tuesday 16", newTickets: 28, resolvedTickets: 32 },
    { name: "Wednesday 17", newTickets: 45, resolvedTickets: 30 },
    { name: "Thursday 18", newTickets: 30, resolvedTickets: 35 },
    { name: "Friday 19", newTickets: 25, resolvedTickets: 40 },
    { name: "Saturday 20", newTickets: 15, resolvedTickets: 20 },
    { name: "Sunday 21", newTickets: 20, resolvedTickets: 25 },
  ];

  // Categories distribution data
  const categoryData = [
    { name: 'Technical', value: 35, color: '#3b82f6' },
    { name: 'Billing', value: 25, color: '#f97316' },
    { name: 'Feature', value: 20, color: '#8b5cf6' },
    { name: 'General', value: 20, color: '#14b8a6' },
  ];

  // First response time data
  const responseTimeData = {
    title: "186",
    subtitle: "Avg. Minutes Elapsed",
    percentage: 62
  };

  // Returning vs new data
  const returningData = [
    { name: "Group 1", returning: 40, new: 50 },
    { name: "Group 2", returning: 60, new: 35 },
    { name: "Group 3", returning: 25, new: 15 },
    { name: "Group 4", returning: 10, new: 8 },
    { name: "Group 5", returning: 5, new: 12 },
    { name: "Group 6", returning: 15, new: 5 },
  ];

  // Customer satisfaction data
  const satisfactionData = {
    positive: { value: 10, percent: "10%" },
    neutral: { value: 0, percent: "02%" },
    negative: { value: 0, percent: "03%" },
    responses: 50
  };

  // Recent tickets data
  const recentTickets = complaints.slice(0, 8).map(complaint => ({
    id: complaint.id,
    customer: complaint.customerName,
    title: complaint.issueDescription,
    status: complaint.status,
    priority: complaint.priority,
    agent: complaint.assignedTo || "Unassigned",
    date: new Date(complaint.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tickets Summary</h1>
          <p className="text-muted-foreground">The ticketing status from Support Tickets</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {summaryMetrics.map((metric, index) => (
          <Card key={metric.title} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">{metric.title}</p>
                  <div className="flex items-baseline mt-1 gap-2">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    {metric.percent && (
                      <Badge variant={metric.trend === "up" ? "outline" : "destructive"} className="text-xs">
                        {metric.percent}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className={`h-10 w-10 flex items-center justify-center rounded-md ${index % 2 === 0 ? 'bg-blue-100' : index % 3 === 0 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <metric.icon className={`h-6 w-6 ${index % 2 === 0 ? 'text-blue-600' : index % 3 === 0 ? 'text-green-600' : 'text-yellow-600'}`} />
                </div>
              </div>
              <div className="text-sm mt-2 text-muted-foreground">
                {index === 0 ? 'OPEN TICKETS' :
                  index === 1 ? 'IN-PROGRESS TICKETS' :
                    index === 2 ? 'HOLD TICKETS' :
                      index === 3 ? 'OPEN TICKETS' : 'CLOSED TICKETS'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trends and Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Trends Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Ticket Trends</CardTitle>
            <div className="flex items-center gap-2">
              <Tabs defaultValue="day" value={chartView} onValueChange={setChartView}>
                <TabsList className="h-8">
                  <TabsTrigger value="day" className="text-xs px-3">Day</TabsTrigger>
                  <TabsTrigger value="week" className="text-xs px-3">Weekly</TabsTrigger>
                  <TabsTrigger value="month" className="text-xs px-3">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartLineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="newTickets"
                  stroke="#e11d48"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="New Tickets"
                />
                <Line
                  type="monotone"
                  dataKey="resolvedTickets"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  name="Resolved Tickets"
                />
              </RechartLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Satisfaction Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Customer Satisfaction</CardTitle>
            <Button variant="link" className="text-blue-600 p-0">View Details</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className="text-muted-foreground text-sm mb-1">Response Received</div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">{satisfactionData.responses}</span>
                  <Button variant="ghost" className="rounded-full p-1 h-8 w-8">
                    <i className="text-blue-500">✓</i>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="text-muted-foreground text-sm mb-1">Positive</div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">{satisfactionData.positive.percent}</span>
                  <Button variant="ghost" className="rounded-full p-1 h-8 w-8">
                    <i className="text-green-500">✓</i>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="text-muted-foreground text-sm mb-1">Neutral</div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">{satisfactionData.neutral.percent}</span>
                  <Button variant="ghost" className="rounded-full p-1 h-8 w-8">
                    <i className="text-yellow-500">○</i>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="text-muted-foreground text-sm mb-1">Negative</div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">{satisfactionData.negative.percent}</span>
                  <Button variant="ghost" className="rounded-full p-1 h-8 w-8">
                    <i className="text-red-500">○</i>
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-8">
              NOTE: This data is calculated based on the total feedback that are received from the customers.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets Categories</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <RechartPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartPieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl font-bold">186</div>
              <div className="text-xs text-muted-foreground">Total tickets raised</div>
            </div>
          </CardContent>
          <div className="px-6 pb-4">
            <div className="flex justify-between gap-2 text-xs">
              <Badge className="bg-orange-500">Urgent</Badge>
              <Badge className="bg-purple-500">High</Badge>
              <Badge className="bg-green-500">Normal</Badge>
            </div>
          </div>
        </Card>

        {/* First response time */}
        <Card>
          <CardHeader>
            <CardTitle>First response received</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px] flex flex-col items-center justify-center">
            <div className="relative h-40 w-40">
              <RechartPieChart width={160} height={160}>
                <Pie
                  data={[
                    { name: 'Completed', value: responseTimeData.percentage },
                    { name: 'Remaining', value: 100 - responseTimeData.percentage }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={70}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill="#2563eb" />
                  <Cell fill="#e2e8f0" />
                </Pie>
              </RechartPieChart>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-2xl font-bold">{responseTimeData.title}</div>
                <div className="text-xs text-muted-foreground">{responseTimeData.subtitle}</div>
              </div>
            </div>
            <div className="flex mt-4 text-xs justify-between w-full">
              <div>First Response</div>
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Last 7 Days
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Returning vs New */}
        <Card>
          <CardHeader>
            <CardTitle>Returning vs New</CardTitle>
          </CardHeader>
          <CardContent className="h-[270px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartBarChart data={returningData} barGap={4} margin={{ top: 20, right: 30, left: 5, bottom: 20 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="returning" name="Returning Tickets" fill="#f97316" />
                <Bar dataKey="new" name="New Tickets" fill="#0ea5e9" />
              </RechartBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Support Tickets</CardTitle>
            <p className="text-sm text-muted-foreground">List of tickets ordered by Customer</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm">Latest Tickets (Showing 01 to 08 of 45 Tickets)</p>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort By:</span>
              <Button variant="outline" className="text-sm h-8 px-3">
                {sortField === "dateCreated" ? "Date Created" : "Priority"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Create Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">#{ticket.id}</TableCell>
                    <TableCell>{ticket.customer}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{ticket.title}</TableCell>
                    <TableCell>
                      <StatusBadge status={ticket.status} />
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={ticket.priority} />
                    </TableCell>
                    <TableCell>{ticket.agent}</TableCell>
                    <TableCell>{ticket.date}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className={`h-8 w-8 p-0 ${currentPage === 1 ? 'bg-blue-600 text-white' : ''}`} onClick={() => setCurrentPage(1)}>
              1
            </Button>
            <Button variant="outline" size="sm" className={`h-8 w-8 p-0 ${currentPage === 2 ? 'bg-blue-600 text-white' : ''}`} onClick={() => setCurrentPage(2)}>
              2
            </Button>
            <Button variant="outline" size="sm" className={`h-8 w-8 p-0 ${currentPage === 3 ? 'bg-blue-600 text-white' : ''}`} onClick={() => setCurrentPage(3)}>
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => setCurrentPage(prev => prev + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="text-sm text-muted-foreground ml-2">
              Page {currentPage} of 3
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper components
const ChevronDown = ({ className }: { className?: string }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
}

const StatusBadge = ({ status }: { status: string }) => {
  let color = "bg-gray-100 text-gray-800";

  if (status === "Open") color = "bg-green-100 text-green-800";
  else if (status === "In Progress") color = "bg-blue-100 text-blue-800";
  else if (status === "Closed") color = "bg-orange-100 text-orange-800";
  else if (status === "Pending") color = "bg-yellow-100 text-yellow-800";

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${color}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  let color = "bg-gray-100 text-gray-800";

  if (priority === "High") color = "bg-red-100 text-red-800";
  else if (priority === "Medium") color = "bg-yellow-100 text-yellow-800";
  else if (priority === "Low") color = "bg-green-100 text-green-800";

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${color}`}>
      {priority}
    </span>
  );
};

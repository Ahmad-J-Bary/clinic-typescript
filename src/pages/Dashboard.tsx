import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Plus,
  UserPlus,
  Clock,
  Activity
} from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data
const upcomingAppointments = [
  {
    id: 1,
    patient: "John Smith",
    doctor: "Dr. Sarah Johnson",
    time: "09:00 AM",
    date: "Today",
    status: "scheduled" as const,
    type: "Consultation"
  },
  {
    id: 2,
    patient: "Emily Davis",
    doctor: "Dr. Michael Brown",
    time: "10:30 AM",
    date: "Today",
    status: "scheduled" as const,
    type: "Follow-up"
  },
  {
    id: 3,
    patient: "Robert Wilson",
    doctor: "Dr. Sarah Johnson",
    time: "02:00 PM",
    date: "Today",
    status: "completed" as const,
    type: "Check-up"
  },
  {
    id: 4,
    patient: "Lisa Anderson",
    doctor: "Dr. Jennifer Lee",
    time: "03:30 PM",
    date: "Today",
    status: "pending" as const,
    type: "Consultation"
  },
  {
    id: 5,
    patient: "David Miller",
    doctor: "Dr. Michael Brown",
    time: "04:15 PM",
    date: "Today",
    status: "cancelled" as const,
    type: "Surgery Consult"
  }
];

const recentActivity = [
  {
    id: 1,
    action: "New patient registered",
    user: "John Smith",
    time: "5 minutes ago"
  },
  {
    id: 2,
    action: "Appointment completed",
    user: "Dr. Sarah Johnson",
    time: "12 minutes ago"
  },
  {
    id: 3,
    action: "Prescription issued",
    user: "Dr. Michael Brown",
    time: "25 minutes ago"
  },
  {
    id: 4,
    action: "Lab results uploaded",
    user: "Lab Tech - Maria",
    time: "1 hour ago"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. Johnson. Here's what's happening at your clinic today.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-secondary hover:bg-secondary-dark">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
          <Button className="medical-gradient hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Patients"
          value="1,284"
          change={{ value: "+12% from last month", trend: "up" }}
          icon={Users}
          variant="primary"
        />
        <StatsCard
          title="Today's Appointments"
          value="24"
          change={{ value: "+3 from yesterday", trend: "up" }}
          icon={Calendar}
          variant="secondary"
        />
        <StatsCard
          title="Monthly Revenue"
          value="$48,392"
          change={{ value: "+8.2% from last month", trend: "up" }}
          icon={DollarSign}
          variant="success"
        />
        <StatsCard
          title="Success Rate"
          value="98.2%"
          change={{ value: "+0.5% from last month", trend: "up" }}
          icon={TrendingUp}
          variant="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Today's Appointments
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingAppointments.map((appointment) => (
                    <TableRow key={appointment.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{appointment.patient}</TableCell>
                      <TableCell className="text-muted-foreground">{appointment.doctor}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>
                        <StatusBadge status={appointment.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.user}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
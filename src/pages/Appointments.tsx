import { useState } from "react";
import { 
  Calendar,
  Plus,
  Filter,
  Clock,
  User,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";

// Sample appointment data
const appointments = [
  {
    id: 1,
    patient: "John Smith",
    doctor: "Dr. Sarah Johnson",
    date: "2024-01-25",
    time: "09:00",
    duration: 30,
    type: "Consultation",
    status: "scheduled" as const,
    notes: "Regular checkup"
  },
  {
    id: 2,
    patient: "Emily Davis",
    doctor: "Dr. Michael Brown",
    date: "2024-01-25",
    time: "10:30",
    duration: 45,
    type: "Follow-up",
    status: "scheduled" as const,
    notes: "Post-surgery follow-up"
  },
  {
    id: 3,
    patient: "Robert Wilson",
    doctor: "Dr. Sarah Johnson",
    date: "2024-01-25",
    time: "14:00",
    duration: 30,
    type: "Check-up",
    status: "completed" as const,
    notes: "Annual physical examination"
  },
  {
    id: 4,
    patient: "Lisa Anderson",
    doctor: "Dr. Jennifer Lee",
    date: "2024-01-25",
    time: "15:30",
    duration: 60,
    type: "Consultation",
    status: "pending" as const,
    notes: "Initial consultation"
  },
  {
    id: 5,
    patient: "David Miller",
    doctor: "Dr. Michael Brown",
    date: "2024-01-25",
    time: "16:15",
    duration: 45,
    type: "Surgery Consult",
    status: "cancelled" as const,
    notes: "Knee surgery consultation"
  }
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
];

const doctors = [
  "Dr. Sarah Johnson",
  "Dr. Michael Brown", 
  "Dr. Jennifer Lee",
  "Dr. Robert Davis"
];

export default function Appointments() {
  const [currentDate, setCurrentDate] = useState(new Date("2024-01-25"));
  const [selectedView, setSelectedView] = useState<"day" | "week" | "month">("day");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (selectedView === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (selectedView === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointment Scheduling</h1>
          <p className="text-muted-foreground">Manage and schedule patient appointments</p>
        </div>
        <Button className="medical-gradient hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Date Navigation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-[200px] text-center">
              <h2 className="text-lg font-semibold">{formatDate(currentDate)}</h2>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* View Switcher */}
          <div className="flex rounded-lg border">
            {(["day", "week", "month"] as const).map((view) => (
              <Button
                key={view}
                variant={selectedView === view ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView(view)}
                className={`rounded-none first:rounded-l-lg last:rounded-r-lg ${
                  selectedView === view ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Daily Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Time Slots Column */}
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground mb-4">TIME SLOTS</h3>
                  {timeSlots.map((time) => {
                    const appointment = filteredAppointments.find(apt => apt.time === time);
                    return (
                      <div key={time} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-smooth">
                        <div className="text-sm font-medium text-muted-foreground w-16">
                          {time}
                        </div>
                        {appointment ? (
                          <div className="flex-1 bg-primary/5 border border-primary/20 rounded-lg p-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-sm">{appointment.patient}</p>
                                <p className="text-xs text-muted-foreground">{appointment.doctor}</p>
                                <p className="text-xs text-primary font-medium">{appointment.type}</p>
                              </div>
                              <StatusBadge status={appointment.status} />
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 border-2 border-dashed border-muted rounded-lg p-3 text-center">
                            <p className="text-xs text-muted-foreground">Available</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Appointments List */}
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground mb-4">TODAY'S APPOINTMENTS</h3>
                  {filteredAppointments.map((appointment) => (
                    <Card key={appointment.id} className="p-4 hover-shadow transition-smooth">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.patient}</p>
                            <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                          </div>
                        </div>
                        <StatusBadge status={appointment.status} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {appointment.time} ({appointment.duration} min)
                          </div>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </div>
                        
                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
                            {appointment.notes}
                          </p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-semibold">{appointments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="font-semibold text-success">
                  {appointments.filter(a => a.status === "completed").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Scheduled</span>
                <span className="font-semibold text-secondary">
                  {appointments.filter(a => a.status === "scheduled").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Cancelled</span>
                <span className="font-semibold text-destructive">
                  {appointments.filter(a => a.status === "cancelled").length}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Available Doctors */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Available Doctors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {doctors.map((doctor, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{doctor}</p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  User,
  Edit,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Sample patient data
const patients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    age: 45,
    gender: "Male",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-02-01",
    status: "Active",
    medicalHistory: ["Hypertension", "Diabetes Type 2"]
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily.davis@email.com", 
    phone: "(555) 234-5678",
    age: 32,
    gender: "Female",
    lastVisit: "2024-01-20",
    nextAppointment: "2024-01-25",
    status: "Active",
    medicalHistory: ["Asthma"]
  },
  {
    id: 3,
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "(555) 345-6789",
    age: 58,
    gender: "Male",
    lastVisit: "2024-01-10",
    nextAppointment: null,
    status: "Inactive",
    medicalHistory: ["Heart Disease", "High Cholesterol"]
  },
  {
    id: 4,
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "(555) 456-7890",
    age: 28,
    gender: "Female",
    lastVisit: "2024-01-22",
    nextAppointment: "2024-02-05",
    status: "Active",
    medicalHistory: ["Allergies"]
  },
  {
    id: 5,
    name: "David Miller",
    email: "david.miller@email.com",
    phone: "(555) 567-8901",
    age: 41,
    gender: "Male",
    lastVisit: "2024-01-18",
    nextAppointment: "2024-01-30",
    status: "Active",
    medicalHistory: ["Arthritis", "Back Pain"]
  }
];

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patient Management</h1>
          <p className="text-muted-foreground">Manage patient records and information</p>
        </div>
        <Button className="medical-gradient hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="card-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search patients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-2">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Patients ({filteredPatients.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow 
                      key={patient.id} 
                      className={`hover:bg-muted/50 cursor-pointer transition-smooth ${
                        selectedPatient === patient.id ? 'bg-accent/50' : ''
                      }`}
                      onClick={() => setSelectedPatient(patient.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">{patient.gender}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3" />
                            {patient.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3" />
                            {patient.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={patient.status === "Active" ? "default" : "secondary"}
                          className={patient.status === "Active" ? "bg-success text-success-foreground" : ""}
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Patient
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule Appointment
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Patient
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Patient Details */}
        <div>
          {selectedPatient ? (
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Patient Details</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const patient = patients.find(p => p.id === selectedPatient);
                  if (!patient) return null;
                  
                  return (
                    <div className="space-y-6">
                      {/* Basic Info */}
                      <div className="text-center">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <User className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">{patient.name}</h3>
                        <p className="text-muted-foreground">{patient.age} years old • {patient.gender}</p>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-3">
                        <h4 className="font-medium">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {patient.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            {patient.phone}
                          </div>
                        </div>
                      </div>

                      {/* Visit History */}
                      <div className="space-y-3">
                        <h4 className="font-medium">Visit History</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Visit:</span>
                            <span>{patient.lastVisit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Next Appointment:</span>
                            <span>{patient.nextAppointment || "Not scheduled"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Medical History */}
                      <div className="space-y-3">
                        <h4 className="font-medium">Medical History</h4>
                        <div className="space-y-2">
                          {patient.medicalHistory.map((condition, index) => (
                            <Badge key={index} variant="secondary" className="mr-2 mb-2">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button className="w-full medical-gradient">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Appointment
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Patient
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          ) : (
            <Card className="card-shadow">
              <CardContent className="p-8 text-center">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Patient</h3>
                <p className="text-muted-foreground">Choose a patient from the list to view their details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
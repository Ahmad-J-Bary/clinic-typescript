import { useState } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  User,
  Phone,
  Mail,
  Calendar,
  Award,
  Clock,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample staff data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    email: "sarah.johnson@clinic.com",
    phone: "(555) 123-4567",
    experience: "15 years",
    qualifications: ["MD - Harvard Medical School", "Board Certified Cardiologist", "FACC"],
    schedule: "Monday - Friday, 8:00 AM - 5:00 PM",
    availability: "Available",
    patients: 156,
    rating: 4.9,
    department: "Cardiology"
  },
  {
    id: 2,
    name: "Dr. Michael Brown",
    specialty: "Orthopedics",
    email: "michael.brown@clinic.com",
    phone: "(555) 234-5678",
    experience: "12 years",
    qualifications: ["MD - Johns Hopkins", "Orthopedic Surgery Residency", "Sports Medicine Fellowship"],
    schedule: "Monday - Thursday, 9:00 AM - 6:00 PM",
    availability: "In Surgery",
    patients: 134,
    rating: 4.8,
    department: "Orthopedics"
  },
  {
    id: 3,
    name: "Dr. Jennifer Lee",
    specialty: "Pediatrics",
    email: "jennifer.lee@clinic.com",
    phone: "(555) 345-6789",
    experience: "8 years",
    qualifications: ["MD - Stanford Medical", "Pediatric Residency", "Board Certified Pediatrician"],
    schedule: "Tuesday - Saturday, 8:00 AM - 4:00 PM",
    availability: "Available",
    patients: 98,
    rating: 4.9,
    department: "Pediatrics"
  },
  {
    id: 4,
    name: "Dr. Robert Davis",
    specialty: "Dermatology",
    email: "robert.davis@clinic.com",
    phone: "(555) 456-7890",
    experience: "20 years",
    qualifications: ["MD - UCLA Medical", "Dermatology Residency", "Cosmetic Surgery Certification"],
    schedule: "Monday - Friday, 10:00 AM - 7:00 PM",
    availability: "On Leave",
    patients: 187,
    rating: 4.7,
    department: "Dermatology"
  }
];

const nurses = [
  {
    id: 1,
    name: "Maria Rodriguez",
    title: "Head Nurse",
    email: "maria.rodriguez@clinic.com",
    phone: "(555) 567-8901",
    experience: "12 years",
    qualifications: ["BSN - Nursing", "Critical Care Certification"],
    schedule: "Monday - Friday, 7:00 AM - 7:00 PM",
    availability: "Available",
    department: "Emergency"
  },
  {
    id: 2,
    name: "James Wilson",
    title: "ICU Nurse",
    email: "james.wilson@clinic.com",
    phone: "(555) 678-9012",
    experience: "8 years",
    qualifications: ["BSN - Nursing", "ICU Certification", "BLS Instructor"],
    schedule: "Tuesday - Saturday, 6:00 AM - 6:00 PM",
    availability: "Available",
    department: "ICU"
  }
];

const adminStaff = [
  {
    id: 1,
    name: "Lisa Thompson",
    title: "Office Manager",
    email: "lisa.thompson@clinic.com",
    phone: "(555) 789-0123",
    experience: "10 years",
    qualifications: ["Healthcare Administration", "Medical Office Management"],
    schedule: "Monday - Friday, 8:00 AM - 5:00 PM",
    availability: "Available",
    department: "Administration"
  },
  {
    id: 2,
    name: "David Chen",
    title: "IT Support Specialist",
    email: "david.chen@clinic.com",
    phone: "(555) 890-1234",
    experience: "5 years",
    qualifications: ["Computer Science Degree", "Healthcare IT Certification"],
    schedule: "Monday - Friday, 9:00 AM - 6:00 PM",
    availability: "Available",
    department: "IT"
  }
];

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty)));

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-success text-success-foreground";
      case "In Surgery":
        return "bg-warning text-warning-foreground";
      case "On Leave":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  interface StaffMember {
    id: number;
    name: string;
    email: string;
    phone: string;
    experience: string;
    qualifications: string[];
    schedule: string;
    availability: string;
    department: string;
    specialty?: string;
    title?: string;
    patients?: number;
    rating?: number;
  }

  const StaffCard = ({ staff, type }: { staff: StaffMember, type: string }) => (
    <Card className="card-shadow hover-shadow transition-smooth">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold">{staff.name}</h3>
              <p className="text-primary font-medium">
                {type === "doctor" ? staff.specialty : staff.title}
              </p>
              <Badge className={getAvailabilityColor(staff.availability)}>
                {staff.availability}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {staff.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {staff.phone}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {staff.experience} experience
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {staff.department}
              </div>
            </div>

            {type === "doctor" && (
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {staff.patients} patients
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  {staff.rating}/5.0 rating
                </div>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Qualifications:</p>
              <div className="flex flex-wrap gap-1">
                {staff.qualifications.map((qual: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {qual}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Schedule:</span>
              <span>{staff.schedule}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">Manage medical staff and their schedules</p>
        </div>
        <Button className="medical-gradient hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="card-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search staff by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={selectedSpecialty === null ? "default" : "outline"}
                onClick={() => setSelectedSpecialty(null)}
                size="sm"
              >
                All Specialties
              </Button>
              {specialties.map(specialty => (
                <Button
                  key={specialty}
                  variant={selectedSpecialty === specialty ? "default" : "outline"}
                  onClick={() => setSelectedSpecialty(specialty)}
                  size="sm"
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Tabs */}
      <Tabs defaultValue="doctors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="doctors">Doctors ({doctors.length})</TabsTrigger>
          <TabsTrigger value="nurses">Nurses ({nurses.length})</TabsTrigger>
          <TabsTrigger value="admin">Admin Staff ({adminStaff.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="doctors" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => (
              <StaffCard key={doctor.id} staff={doctor} type="doctor" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nurses" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {nurses.map((nurse) => (
              <StaffCard key={nurse.id} staff={nurse} type="nurse" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {adminStaff.map((admin) => (
              <StaffCard key={admin.id} staff={admin} type="admin" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
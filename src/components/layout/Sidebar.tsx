import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserCheck,
  Settings,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    name: "Appointments",
    href: "/appointments",
    icon: Calendar,
  },
  {
    name: "Staff",
    href: "/staff",
    icon: UserCheck,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground transition-all duration-300 flex flex-col h-screen relative",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-primary-light/20">
        <div className="flex items-center gap-3">
          <div className="bg-primary-foreground/10 p-2 rounded-lg">
            <Stethoscope className="h-6 w-6" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg">MediCare</h1>
              <p className="text-primary-foreground/70 text-sm">Clinic Management</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="absolute -right-3 top-20 bg-background text-foreground border border-border rounded-full p-1.5 h-7 w-7 hover:bg-muted"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth group",
                isActive
                  ? "bg-primary-foreground/10 text-primary-foreground border border-primary-light/20"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-primary-foreground" : "text-primary-foreground/70"
                )}
              />
              {!collapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-primary-light/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">DR</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Dr. Sarah Johnson</p>
              <p className="text-xs text-primary-foreground/70 truncate">Administrator</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
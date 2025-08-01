import { useState } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-0" : "ml-0"
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
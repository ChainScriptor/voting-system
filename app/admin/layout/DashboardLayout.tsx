'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart,
  PieChart,
  Settings,
  Users,
  CalendarClock,
  List,
} from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/admin', icon: BarChart, label: 'Επισκόπηση' },
  { href: '/admin/polls', icon: PieChart, label: 'Ψηφοφορίες' },
  { href: '/admin/candidates', icon: Users, label: 'Υποψήφιοι' },
  { href: '/admin/schedule', icon: CalendarClock, label: 'Χρονοδιάγραμμα' },
  { href: '/admin/settings', icon: Settings, label: 'Ρυθμίσεις' },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 p-6 bg-white border-r shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">Πίνακας Διαχείρισης</h2>

        <nav className="space-y-4">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link key={href} href={href} className="block">
                <Card
                  className={`transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg ${
                    isActive ? 'border-poll-purple bg-poll-purple-light' : ''
                  }`}
                >
                  <CardHeader className="flex flex-row items-center space-x-3">
                    <Icon className={`h-6 w-6 ${isActive ? 'text-poll-purple' : 'text-gray-500'}`} />
                    <CardTitle className="text-base font-medium text-gray-700">
                      {label}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white h-16 border-b flex items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <List className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              {pathname.split('/')[1]?.charAt(0).toUpperCase() + pathname.split('/')[1]?.slice(1) || 'Επισκόπηση'}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

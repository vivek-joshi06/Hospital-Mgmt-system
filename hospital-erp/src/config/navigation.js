// ============================================================
// SIDEBAR NAVIGATION CONFIG
// ============================================================

import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Building2,
  CalendarDays,
  FileText,
  Settings,
  Activity,
} from 'lucide-react';

export const navItems = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard',     path: '/',              icon: LayoutDashboard },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Appointments',  path: '/appointments',  icon: CalendarDays   },
      { label: 'Patients',      path: '/patients',      icon: Users          },
      { label: 'Doctors',       path: '/doctors',       icon: Stethoscope    },
      { label: 'Departments',   path: '/departments',   icon: Building2      },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Reports',       path: '/reports',       icon: FileText       },
      { label: 'Activity',      path: '/activity',      icon: Activity       },
      { label: 'Settings',      path: '/settings',      icon: Settings       },
    ],
  },
];

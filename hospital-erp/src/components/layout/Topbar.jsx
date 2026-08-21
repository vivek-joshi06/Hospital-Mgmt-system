// ============================================================
// Topbar / Header Component — MediCore ERP
// ============================================================
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Search, ChevronDown, User, Settings,
  LogOut, Moon, Sun, X,
} from 'lucide-react';
import Avatar from '../ui/Avatar';

const PAGE_TITLES = {
  '/':             { title: 'Dashboard',    desc: 'Hospital operations overview' },
  '/appointments': { title: 'Appointments', desc: 'Manage patient appointments'  },
  '/patients':     { title: 'Patients',     desc: 'Patient records & management' },
  '/doctors':      { title: 'Doctors',      desc: 'Doctor profiles & schedules'  },
  '/departments':  { title: 'Departments',  desc: 'Hospital department overview' },
  '/reports':      { title: 'Reports',      desc: 'Analytics & reports'          },
  '/activity':     { title: 'Activity',     desc: 'System activity log'          },
  '/settings':     { title: 'Settings',     desc: 'System configuration'         },
};

export default function Topbar({ sidebarWidth }) {
  const location = useLocation();
  const page = PAGE_TITLES[location.pathname] || { title: 'MediCore ERP', desc: '' };
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handle = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const notifications = [
    { id: 1, msg: 'New appointment booked — Emily Johnson', time: '5m ago',  unread: true  },
    { id: 2, msg: 'Dr. Sarah Mitchell updated schedule',   time: '22m ago', unread: true  },
    { id: 3, msg: 'Patient Luna Zhang registered',         time: '1h ago',  unread: false },
    { id: 4, msg: 'Appointment #5 was cancelled',          time: '2h ago',  unread: false },
  ];
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <motion.header
      animate={{ left: sidebarWidth }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 right-0 z-20 flex items-center justify-between px-6"
      style={{
        left: sidebarWidth,
        height: 68,
        background: 'rgba(248,250,252,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      {/* Left — Page Title */}
      <div>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
          {page.title}
        </h1>
        <p style={{ fontSize: 13, color: '#64748B', marginTop: 1 }}>{page.desc}</p>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotifs((v) => !v); setShowProfile(false); }}
            className="relative flex items-center justify-center rounded-xl transition-all duration-150"
            style={{
              width: 38, height: 38,
              background: showNotifs ? '#EEF2FF' : 'transparent',
              border: '1.5px solid',
              borderColor: showNotifs ? '#C7D2FE' : '#E2E8F0',
              color: showNotifs ? '#4F46E5' : '#64748B',
              cursor: 'pointer',
            }}
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span
                className="absolute flex items-center justify-center rounded-full text-white"
                style={{
                  top: -5, right: -5,
                  width: 16, height: 16,
                  fontSize: 9, fontWeight: 700,
                  background: '#EF4444',
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 card"
                style={{
                  top: 46, width: 320,
                  boxShadow: 'var(--shadow-dropdown)',
                  overflow: 'hidden',
                }}
              >
                <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Notifications</span>
                  <span className="badge badge-confirmed">{unreadCount} new</span>
                </div>
                <div>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start gap-3 px-4 py-3 transition-colors duration-100"
                      style={{
                        background: n.unread ? '#F8FAFF' : 'transparent',
                        borderBottom: '1px solid #F8FAFC',
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        className="rounded-full shrink-0 mt-0.5"
                        style={{
                          width: 7, height: 7,
                          background: n.unread ? '#4F46E5' : 'transparent',
                          border: n.unread ? 'none' : '1.5px solid #CBD5E1',
                          marginTop: 6,
                        }}
                      />
                      <div className="flex-1">
                        <p style={{ fontSize: 13, color: '#0F172A', lineHeight: 1.4 }}>{n.msg}</p>
                        <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 text-center" style={{ borderTop: '1px solid #F1F5F9' }}>
                  <button style={{ fontSize: 13, color: '#4F46E5', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: '#E2E8F0', margin: '0 4px' }} />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile((v) => !v); setShowNotifs(false); }}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-all duration-150"
            style={{
              background: showProfile ? '#F1F5F9' : 'transparent',
              border: 'none', cursor: 'pointer',
            }}
          >
            <Avatar name="Admin User" size={32} />
            <div className="text-left hidden sm:block">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Admin User</div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>Super Admin</div>
            </div>
            <ChevronDown size={14} color="#94A3B8" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 card py-1.5"
                style={{ top: 46, width: 180, boxShadow: 'var(--shadow-dropdown)' }}
              >
                {[
                  { label: 'Profile',   icon: User,     action: () => {} },
                  { label: 'Settings',  icon: Settings,  action: () => {} },
                ].map(({ label, icon: Icon, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-left transition-colors duration-100"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#374151' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <Icon size={14} color="#64748B" />
                    {label}
                  </button>
                ))}
                <div style={{ borderTop: '1px solid #F1F5F9', margin: '4px 0' }} />
                <button
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-left transition-colors duration-100"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#EF4444' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#FEF2F2'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}

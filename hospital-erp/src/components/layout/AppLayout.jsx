// ============================================================
// Main Layout Shell — MediCore ERP
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 72 : 240;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      {/* Main Content */}
      <motion.main
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="flex-1 flex flex-col min-h-screen"
        style={{ minWidth: 0 }}
      >
        {/* Topbar */}
        <Topbar sidebarWidth={sidebarWidth} />

        {/* Page Content */}
        <div style={{ marginTop: 68, padding: '28px 28px', flex: 1 }}>
          {children}
        </div>
      </motion.main>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            borderRadius: 12,
            border: '1px solid #E2E8F0',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            padding: '12px 16px',
          },
          success: {
            iconTheme: { primary: '#22C55E', secondary: '#F0FDF4' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#FEF2F2' },
          },
        }}
      />
    </div>
  );
}

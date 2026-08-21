// ============================================================
// Sidebar Component — MediCore ERP
// ============================================================
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, Bell, Search } from 'lucide-react';
import { navItems } from '../../config/navigation';

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen z-30 flex flex-col overflow-hidden"
      style={{
        background: '#0F172A',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* ---- Logo ---- */}
      <div
        className="flex items-center gap-3 px-4 py-5"
        style={{ minHeight: 68, borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{
            width: 40, height: 40,
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          }}
        >
          <Heart size={18} color="#fff" fill="#fff" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
            >
              <div style={{ color: '#fff', fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>
                MediCore
              </div>
              <div style={{ color: '#64748B', fontSize: 11, fontWeight: 500 }}>
                Hospital ERP
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---- Navigation ---- */}
      <nav className="flex-1 overflow-y-auto py-4 px-3" style={{ scrollbarWidth: 'none' }}>
        {navItems.map((group) => (
          <div key={group.label} className="mb-5">
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#475569',
                    padding: '0 8px 6px',
                  }}
                >
                  {group.label}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={collapsed ? item.label : undefined}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="flex items-center gap-3 rounded-xl transition-all duration-150"
                      style={{
                        padding: collapsed ? '10px 10px' : '9px 12px',
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        background: isActive
                          ? 'rgba(79, 70, 229, 0.15)'
                          : 'transparent',
                        color: isActive ? '#818CF8' : '#64748B',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                          e.currentTarget.style.color = '#94A3B8';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#64748B';
                        }
                      }}
                    >
                      <Icon
                        size={17}
                        style={{
                          color: isActive ? '#818CF8' : 'inherit',
                          shrink: 0,
                        }}
                      />
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.15 }}
                            style={{ fontSize: 14, fontWeight: isActive ? 600 : 500 }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {isActive && !collapsed && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className="ml-auto"
                          style={{
                            width: 6, height: 6,
                            borderRadius: '50%',
                            background: '#818CF8',
                          }}
                        />
                      )}
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ---- Collapse Toggle ---- */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center rounded-xl transition-all duration-150"
          style={{
            padding: '9px',
            background: 'rgba(255,255,255,0.04)',
            color: '#475569',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#94A3B8'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#475569'; }}
        >
          {collapsed ? <ChevronRight size={16} /> : (
            <div className="flex items-center gap-2" style={{ fontSize: 12, fontWeight: 500 }}>
              <ChevronLeft size={15} />
              Collapse
            </div>
          )}
        </button>
      </div>
    </motion.aside>
  );
}

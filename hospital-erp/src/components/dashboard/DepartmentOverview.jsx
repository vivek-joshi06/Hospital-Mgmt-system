// ============================================================
// DepartmentOverview — Department bento card
// ============================================================
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { departments } from '../../data/dummyData';

export default function DepartmentOverview() {
  const topDepts = departments.slice(0, 8);

  return (
    <div className="card">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid #F1F5F9' }}
      >
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Departments</h3>
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>{departments.length} active departments</p>
        </div>
        <Building2 size={16} color="#64748B" />
      </div>

      {/* Grid */}
      <div
        className="p-4"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 10,
        }}
      >
        {topDepts.map((dept, i) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className="flex flex-col items-center justify-center rounded-xl py-4 px-2 transition-all duration-200 cursor-pointer"
            style={{ background: '#F8FAFC', border: '1.5px solid #F1F5F9' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F0F4FF';
              e.currentTarget.style.borderColor = '#C7D2FE';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.borderColor = '#F1F5F9';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: 22 }}>{dept.icon}</span>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#0F172A', marginTop: 6, textAlign: 'center', lineHeight: 1.3 }}>
              {dept.name}
            </div>
            <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 3 }}>
              {dept.doctors} doctors
            </div>
            <div
              className="mt-2 px-2 py-0.5 rounded-full"
              style={{ background: dept.color + '18', fontSize: 10, fontWeight: 700, color: dept.color }}
            >
              {dept.patients}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

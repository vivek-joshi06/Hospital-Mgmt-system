// ============================================================
// TopDoctors — Top performing doctors card
// ============================================================
import { motion } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';
import { doctors } from '../../data/dummyData';
import Avatar from '../ui/Avatar';

const topDocs = [...doctors]
  .filter((d) => d.isActive)
  .sort((a, b) => b.consultations - a.consultations)
  .slice(0, 5);

export default function TopDoctors() {
  const maxC = topDocs[0]?.consultations || 1;

  return (
    <div className="card">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid #F1F5F9' }}
      >
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Top Performing Doctors</h3>
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>Ranked by consultations</p>
        </div>
        <TrendingUp size={16} color="#22C55E" />
      </div>

      {/* Doctors */}
      <div className="px-5 py-3">
        {topDocs.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            className="flex items-center gap-3 py-3"
            style={{ borderBottom: i < topDocs.length - 1 ? '1px solid #F8FAFC' : 'none' }}
          >
            {/* Rank */}
            <div
              className="flex items-center justify-center rounded-lg shrink-0"
              style={{
                width: 22, height: 22,
                background: i === 0 ? '#FFFBEB' : '#F8FAFC',
                fontSize: 11, fontWeight: 700,
                color: i === 0 ? '#D97706' : '#94A3B8',
              }}
            >
              {i + 1}
            </div>

            {/* Avatar */}
            <Avatar name={doc.name} size={34} />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {doc.name}
              </div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>{doc.specialization}</div>
            </div>

            {/* Progress + Count */}
            <div className="flex flex-col items-end gap-1" style={{ minWidth: 80 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>
                {doc.consultations.toLocaleString()}
              </span>
              <div style={{ width: 80, height: 4, borderRadius: 99, background: '#F1F5F9' }}>
                <div
                  style={{
                    width: `${(doc.consultations / maxC) * 100}%`,
                    height: '100%',
                    borderRadius: 99,
                    background: i === 0
                      ? 'linear-gradient(90deg, #4F46E5, #7C3AED)'
                      : 'linear-gradient(90deg, #06B6D4, #0891B2)',
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

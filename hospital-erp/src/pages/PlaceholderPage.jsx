// ============================================================
// Placeholder page — shown for unbuilt pages
// ============================================================
import { motion } from 'framer-motion';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PlaceholderPage({ title = 'Coming Soon', description = 'This page will be built next.' }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <div
        className="flex items-center justify-center rounded-2xl mb-5"
        style={{ width: 72, height: 72, background: '#FEF3C7' }}
      >
        <Construction size={32} color="#D97706" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>{title}</h2>
      <p style={{ fontSize: 14, color: '#64748B', maxWidth: 360, lineHeight: 1.6 }}>{description}</p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mt-8 btn btn-secondary"
      >
        <ArrowLeft size={14} />
        Go Back
      </button>
    </motion.div>
  );
}

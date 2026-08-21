// ============================================================
// Delete Confirmation Modal — Reusable
// ============================================================
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title       = 'Delete Patient',
  description = 'This action cannot be undone.',
  itemName,
  itemSubtitle,
}) {
  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="modal-overlay"
          style={{ zIndex: 60 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="modal-content"
            style={{ maxWidth: 420 }}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Close */}
              <div className="flex justify-end mb-1">
                <button
                  onClick={onClose}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#94A3B8', padding: 4,
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Icon */}
              <div className="flex flex-col items-center text-center">
                <div
                  className="flex items-center justify-center rounded-2xl mb-4"
                  style={{ width: 64, height: 64, background: '#FEF2F2' }}
                >
                  <Trash2 size={28} color="#DC2626" />
                </div>

                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>
                  {title}
                </h2>

                {/* Patient Card */}
                {itemName && (
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3 mb-4 w-full"
                    style={{ background: '#FEF2F2', border: '1px solid #FEE2E2' }}
                  >
                    <Avatar name={itemName} size={36} />
                    <div className="text-left">
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{itemName}</div>
                      {itemSubtitle && (
                        <div style={{ fontSize: 11, color: '#94A3B8' }}>{itemSubtitle}</div>
                      )}
                    </div>
                  </div>
                )}

                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, marginBottom: 6 }}>
                  Are you sure you want to delete this patient record?{' '}
                  <span style={{ fontWeight: 600, color: '#DC2626' }}>{description}</span>
                </p>

                {/* Warning */}
                <div
                  className="flex items-start gap-2 rounded-xl px-4 py-3 w-full mt-2"
                  style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
                >
                  <AlertTriangle size={14} color="#D97706" style={{ marginTop: 1, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: '#92400E', textAlign: 'left', lineHeight: 1.5 }}>
                    All associated appointments and medical records linked to this patient will also be affected.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  id="delete-cancel-btn"
                  onClick={onClose}
                  className="btn btn-secondary flex-1"
                  disabled={loading}
                >
                  Cancel
                </button>
                <motion.button
                  id="delete-confirm-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onConfirm}
                  className="btn btn-danger flex-1"
                  disabled={loading}
                >
                  {loading ? <><span className="spinner" /> Deleting…</> : 'Yes, Delete'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

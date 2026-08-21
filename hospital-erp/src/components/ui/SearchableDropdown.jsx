// ============================================================
// SearchableDropdown — Custom searchable select component
// ============================================================
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, X, Check } from 'lucide-react';
import Avatar from './Avatar';

export default function SearchableDropdown({
  id,
  placeholder = 'Search and select…',
  options = [],          // [{ value, label, sublabel, sublabel2, avatar }]
  value,                 // currently selected value (id)
  onChange,
  error,
  disabled,
}) {
  const [open,   setOpen]   = useState(false);
  const [query,  setQuery]  = useState('');
  const ref      = useRef(null);
  const inputRef = useRef(null);

  const selected = options.find((o) => o.value === value);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase()) ||
    (o.sublabel  || '').toLowerCase().includes(query.toLowerCase()) ||
    (o.sublabel2 || '').toLowerCase().includes(query.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Focus search on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const handleSelect = (opt) => {
    onChange(opt.value);
    setOpen(false);
    setQuery('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
    setQuery('');
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger */}
      <div
        id={id}
        onClick={() => !disabled && setOpen((v) => !v)}
        className="form-input flex items-center gap-2 cursor-pointer select-none"
        style={{
          borderColor: error ? '#EF4444' : open ? '#4F46E5' : undefined,
          boxShadow: open ? '0 0 0 3px rgba(79,70,229,0.1)' : undefined,
          cursor: disabled ? 'not-allowed' : 'pointer',
          background: disabled ? '#F8FAFC' : '#fff',
          padding: '8px 12px',
        }}
      >
        {selected ? (
          <>
            {selected.avatar && <Avatar name={selected.avatar} size={24} />}
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {selected.label}
              </div>
              {selected.sublabel && (
                <div style={{ fontSize: 11, color: '#94A3B8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selected.sublabel}
                  {selected.sublabel2 ? ` · ${selected.sublabel2}` : ''}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleClear}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 2, flexShrink: 0 }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
            >
              <X size={12} />
            </button>
          </>
        ) : (
          <>
            <span style={{ fontSize: 13, color: '#94A3B8', flex: 1 }}>{placeholder}</span>
            <ChevronDown size={14} color="#94A3B8" style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
              zIndex: 100,
              background: '#fff',
              border: '1.5px solid #E2E8F0',
              borderRadius: 12,
              boxShadow: '0 10px 40px -4px rgba(0,0,0,0.12)',
              overflow: 'hidden',
            }}
          >
            {/* Search inside dropdown */}
            <div style={{ padding: '10px 12px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ position: 'relative' }}>
                <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type to search…"
                  style={{
                    width: '100%', padding: '6px 10px 6px 30px',
                    border: '1.5px solid #E2E8F0', borderRadius: 8,
                    fontSize: 12, outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#4F46E5'}
                  onBlur={(e)  => e.currentTarget.style.borderColor = '#E2E8F0'}
                />
              </div>
            </div>

            {/* Options */}
            <div style={{ maxHeight: 240, overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <div style={{ padding: '20px 16px', textAlign: 'center', fontSize: 13, color: '#94A3B8' }}>
                  No results found
                </div>
              ) : (
                filtered.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => handleSelect(opt)}
                      className="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors duration-100"
                      style={{ background: isSelected ? '#F5F3FF' : 'transparent' }}
                      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#F8FAFC'; }}
                      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                    >
                      {opt.avatar && <Avatar name={opt.avatar} size={30} />}
                      <div className="flex-1 min-w-0">
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{opt.label}</div>
                        {opt.sublabel && (
                          <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>
                            {opt.sublabel}
                            {opt.sublabel2 ? ` · ${opt.sublabel2}` : ''}
                          </div>
                        )}
                      </div>
                      {isSelected && <Check size={14} color="#4F46E5" />}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

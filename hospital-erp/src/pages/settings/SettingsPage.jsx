// ============================================================
// Settings Page — Focused & Clean
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Home, ChevronRight,
  Building2, Bell, Shield, Palette,
  Globe, Save, ToggleLeft, ToggleRight,
  Info, User, Mail, Phone, MapPin,
  CheckCircle2, AlertCircle, ChevronDown,
} from 'lucide-react';

// ============================================================
// TOGGLE SWITCH
// ============================================================
function Toggle({ value, onChange, id }) {
  return (
    <button
      id={id}
      type="button"
      onClick={() => onChange(!value)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      {value
        ? <ToggleRight size={30} color="#4F46E5" />
        : <ToggleLeft  size={30} color="#CBD5E1" />}
    </button>
  );
}

// ============================================================
// SECTION CARD
// ============================================================
function Section({ icon: Icon, title, description, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden mb-4"
    >
      {/* Section header */}
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{ borderBottom: '1px solid #F1F5F9', background: '#FAFAFA' }}
      >
        <div
          className="flex items-center justify-center rounded-xl"
          style={{ width: 36, height: 36, background: '#EEF2FF' }}
        >
          <Icon size={16} color="#4F46E5" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{title}</div>
          {description && <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>{description}</div>}
        </div>
      </div>
      {/* Section content */}
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

// ============================================================
// FORM ROW — label + control side-by-side
// ============================================================
function Row({ label, description, children }) {
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: '1px solid #F8FAFC' }}
    >
      <div className="pr-6">
        <div style={{ fontSize: 13, fontWeight: 500, color: '#0F172A' }}>{label}</div>
        {description && <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>{description}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

const inputStyle = {
  padding: '7px 12px', borderRadius: 8, fontSize: 13,
  border: '1.5px solid #E2E8F0', background: '#fff',
  color: '#0F172A', outline: 'none', fontFamily: 'Inter, sans-serif',
  width: 220,
  transition: 'border-color 0.15s',
};

const selectStyle = {
  ...inputStyle,
  appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
  paddingRight: 28,
};

// ============================================================
// ACCENT COLOR PICKER (6 swatches)
// ============================================================
const ACCENTS = [
  { label: 'Indigo', value: '#4F46E5' },
  { label: 'Blue',   value: '#2563EB' },
  { label: 'Teal',   value: '#0D9488' },
  { label: 'Green',  value: '#16A34A' },
  { label: 'Rose',   value: '#E11D48' },
  { label: 'Purple', value: '#7C3AED' },
];

function AccentPicker({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {ACCENTS.map((c) => (
        <button
          key={c.value}
          title={c.label}
          type="button"
          onClick={() => onChange(c.value)}
          style={{
            width: 24, height: 24, borderRadius: '50%',
            background: c.value, border: '2.5px solid',
            borderColor: value === c.value ? '#0F172A' : 'transparent',
            cursor: 'pointer', transition: 'all 0.15s',
            transform: value === c.value ? 'scale(1.2)' : 'scale(1)',
            boxShadow: value === c.value ? `0 0 0 2px #fff, 0 0 0 4px ${c.value}` : 'none',
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// MAIN SETTINGS PAGE
// ============================================================
export default function SettingsPage() {
  // ---- Hospital Profile ----
  const [profile, setProfile] = useState({
    hospitalName:  'MediCore General Hospital',
    tagline:       'Caring for life, every step of the way',
    email:         'admin@medicore.com',
    phone:         '+1-555-0000',
    address:       '123 Healthcare Ave, New York, NY 10001',
    website:       'https://medicore.com',
    registrationNo:'MED-2019-00421',
  });

  // ---- Appearance ----
  const [accent,   setAccent]   = useState('#4F46E5');
  const [fontSize, setFontSize] = useState('medium');

  // ---- Notifications ----
  const [notif, setNotif] = useState({
    emailAppointments: true,
    emailPatients:     true,
    emailReports:      false,
    smsReminders:      true,
    smsEmergency:      true,
    browserAlerts:     true,
  });

  // ---- System ----
  const [system, setSystem] = useState({
    language:     'en-US',
    timezone:     'America/New_York',
    dateFormat:   'MM/DD/YYYY',
    currency:     'USD',
    sessionTimeout: '30',
  });

  // ---- Security ----
  const [security, setSecurity] = useState({
    twoFactor:    false,
    loginAlerts:  true,
    auditLog:     true,
  });

  const handleSave = (section) => {
    toast.success(`${section} settings saved successfully!`);
  };

  const setNotifKey = (key) => (val) => setNotif((p) => ({ ...p, [key]: val }));
  const setSecKey   = (key) => (val) => setSecurity((p) => ({ ...p, [key]: val }));

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* ---- Breadcrumb ---- */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-5"
        style={{ fontSize: 12, color: '#94A3B8' }}
      >
        <Home size={13} />
        <span>Dashboard</span>
        <ChevronRight size={12} />
        <span style={{ color: '#4F46E5', fontWeight: 600 }}>Settings</span>
      </motion.div>

      {/* ---- Page Header ---- */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6"
      >
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
          Settings
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
          Configure hospital profile, appearance, notifications, and system preferences.
        </p>
      </motion.div>

      {/* ================================================================
          1. HOSPITAL PROFILE
      ================================================================ */}
      <Section icon={Building2} title="Hospital Profile" description="Your hospital's public information and identity">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 4 }}>
          {[
            { key: 'hospitalName',   label: 'Hospital Name',       icon: Building2 },
            { key: 'tagline',        label: 'Tagline / Motto',     icon: Info },
            { key: 'email',          label: 'Contact Email',        icon: Mail },
            { key: 'phone',          label: 'Contact Phone',        icon: Phone },
            { key: 'website',        label: 'Website',              icon: Globe },
            { key: 'registrationNo', label: 'Registration No.',    icon: CheckCircle2 },
          ].map(({ key, label, icon: Icon }) => (
            <div key={key}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Icon size={10} style={{ display: 'inline', marginRight: 5 }} />
                {label}
              </label>
              <input
                value={profile[key]}
                onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                style={{ ...inputStyle, width: '100%' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#4F46E5'}
                onBlur={(e)  => e.currentTarget.style.borderColor = '#E2E8F0'}
              />
            </div>
          ))}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <MapPin size={10} style={{ display: 'inline', marginRight: 5 }} />
              Full Address
            </label>
            <textarea
              value={profile.address}
              onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
              rows={2}
              style={{ ...inputStyle, width: '100%', resize: 'none' }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#4F46E5'}
              onBlur={(e)  => e.currentTarget.style.borderColor = '#E2E8F0'}
            />
          </div>
        </div>
        <div className="flex justify-end pt-3" style={{ borderTop: '1px solid #F1F5F9' }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => handleSave('Hospital profile')} className="btn btn-primary flex items-center gap-2">
            <Save size={14} /> Save Profile
          </motion.button>
        </div>
      </Section>

      {/* ================================================================
          2. APPEARANCE
      ================================================================ */}
      <Section icon={Palette} title="Appearance" description="Customize the look and feel of the interface">
        <Row label="Accent Color" description="Used for buttons, links, and highlights">
          <AccentPicker value={accent} onChange={setAccent} />
        </Row>
        <Row label="Font Size" description="Controls the global text size">
          <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} style={selectStyle}>
            <option value="small">Small (13px)</option>
            <option value="medium">Medium (14px)</option>
            <option value="large">Large (16px)</option>
          </select>
        </Row>
        <Row label="Compact Mode" description="Reduce spacing for denser information display">
          <Toggle id="compact-toggle" value={false} onChange={() => toast('Compact mode — coming soon!')} />
        </Row>
        <div className="flex justify-end pt-3" style={{ borderTop: '1px solid #F1F5F9', marginTop: 4 }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => handleSave('Appearance')} className="btn btn-primary flex items-center gap-2">
            <Save size={14} /> Save Appearance
          </motion.button>
        </div>
      </Section>

      {/* ================================================================
          3. NOTIFICATIONS
      ================================================================ */}
      <Section icon={Bell} title="Notifications" description="Control when and how you receive alerts">
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
            Email Notifications
          </div>
          <Row label="Appointment updates" description="Booking, confirmation, cancellations">
            <Toggle id="notif-email-appt" value={notif.emailAppointments} onChange={setNotifKey('emailAppointments')} />
          </Row>
          <Row label="Patient registrations" description="New patient sign-ups and updates">
            <Toggle id="notif-email-pat" value={notif.emailPatients} onChange={setNotifKey('emailPatients')} />
          </Row>
          <Row label="Weekly reports" description="Automated PDF reports every Monday">
            <Toggle id="notif-email-rep" value={notif.emailReports} onChange={setNotifKey('emailReports')} />
          </Row>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4, marginTop: 12 }}>
            SMS & Browser
          </div>
          <Row label="SMS reminders" description="24-hour appointment reminders to patients">
            <Toggle id="notif-sms" value={notif.smsReminders} onChange={setNotifKey('smsReminders')} />
          </Row>
          <Row label="Emergency SMS alerts" description="Immediately notify staff on emergency cases">
            <Toggle id="notif-sms-emg" value={notif.smsEmergency} onChange={setNotifKey('smsEmergency')} />
          </Row>
          <Row label="Browser push alerts" description="In-app notifications while using the system">
            <Toggle id="notif-browser" value={notif.browserAlerts} onChange={setNotifKey('browserAlerts')} />
          </Row>
        </div>
        <div className="flex justify-end pt-3" style={{ borderTop: '1px solid #F1F5F9', marginTop: 4 }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => handleSave('Notification')} className="btn btn-primary flex items-center gap-2">
            <Save size={14} /> Save Notifications
          </motion.button>
        </div>
      </Section>

      {/* ================================================================
          4. SYSTEM PREFERENCES
      ================================================================ */}
      <Section icon={Globe} title="System Preferences" description="Localization, timezone, and formatting">
        <Row label="Language" description="Interface display language">
          <select value={system.language} onChange={(e) => setSystem((p) => ({ ...p, language: e.target.value }))} style={selectStyle}>
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="ar">Arabic (RTL)</option>
          </select>
        </Row>
        <Row label="Timezone" description="Used for appointment scheduling">
          <select value={system.timezone} onChange={(e) => setSystem((p) => ({ ...p, timezone: e.target.value }))} style={selectStyle}>
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="Europe/London">London (GMT)</option>
            <option value="Asia/Kolkata">India (IST)</option>
            <option value="Asia/Dubai">Dubai (GST)</option>
          </select>
        </Row>
        <Row label="Date Format" description="How dates are displayed across the system">
          <select value={system.dateFormat} onChange={(e) => setSystem((p) => ({ ...p, dateFormat: e.target.value }))} style={selectStyle}>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
          </select>
        </Row>
        <Row label="Currency" description="Used in billing and reports">
          <select value={system.currency} onChange={(e) => setSystem((p) => ({ ...p, currency: e.target.value }))} style={selectStyle}>
            <option value="USD">USD — US Dollar</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="INR">INR — Indian Rupee</option>
            <option value="AED">AED — UAE Dirham</option>
          </select>
        </Row>
        <Row label="Session Timeout" description="Auto-logout after inactivity">
          <select value={system.sessionTimeout} onChange={(e) => setSystem((p) => ({ ...p, sessionTimeout: e.target.value }))} style={selectStyle}>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="0">Never</option>
          </select>
        </Row>
        <div className="flex justify-end pt-3" style={{ borderTop: '1px solid #F1F5F9', marginTop: 4 }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => handleSave('System preferences')} className="btn btn-primary flex items-center gap-2">
            <Save size={14} /> Save Preferences
          </motion.button>
        </div>
      </Section>

      {/* ================================================================
          5. SECURITY
      ================================================================ */}
      <Section icon={Shield} title="Security" description="Account protection and access control">
        <Row label="Two-Factor Authentication" description="Require OTP on every login">
          <Toggle id="2fa-toggle" value={security.twoFactor} onChange={setSecKey('twoFactor')} />
        </Row>
        <Row label="Login activity alerts" description="Email on new login from unrecognized device">
          <Toggle id="login-alert-toggle" value={security.loginAlerts} onChange={setSecKey('loginAlerts')} />
        </Row>
        <Row label="Audit log" description="Record all admin actions for compliance">
          <Toggle id="audit-toggle" value={security.auditLog} onChange={setSecKey('auditLog')} />
        </Row>

        {/* Danger zone */}
        <div
          className="rounded-xl p-4 mt-5"
          style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: '#DC2626', marginBottom: 8 }}>
            Danger Zone
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#0F172A' }}>Reset all settings</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>Restore all settings to factory defaults</div>
            </div>
            <button
              onClick={() => toast.error('Factory reset — this action is irreversible. Contact your administrator.')}
              style={{ padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: '#FEF2F2', border: '1.5px solid #FCA5A5', color: '#DC2626', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              Reset to defaults
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-3 mt-2" style={{ borderTop: '1px solid #F1F5F9' }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => handleSave('Security')} className="btn btn-primary flex items-center gap-2">
            <Save size={14} /> Save Security
          </motion.button>
        </div>
      </Section>

      {/* ================================================================
          6. ABOUT
      ================================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-5 mb-4"
        style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-2xl text-2xl"
              style={{ width: 48, height: 48, background: '#EEF2FF' }}
            >
              🏥
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>MediCore ERP</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>
                Version 1.0.0 — Hospital Management System
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#94A3B8' }}>Built with React + Tailwind CSS</div>
            <div style={{ fontSize: 11, color: '#4F46E5', fontWeight: 600, marginTop: 2 }}>
              © 2026 MediCore Inc.
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ height: 24 }} />
    </div>
  );
}

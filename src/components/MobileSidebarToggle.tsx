import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, LayoutDashboard, UtensilsCrossed, Package, CreditCard, Users, Gift, Settings } from 'lucide-react';
import { useState } from 'react';

interface MobileSidebarToggleProps {
  tenant: string;
  branch: string;
}

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={16} />, active: true },
  { label: 'Menú & Platos', icon: <UtensilsCrossed size={16} /> },
  { label: 'Inventario', icon: <Package size={16} />, badge: '2' },
  { label: 'Finanzas', icon: <CreditCard size={16} /> },
  { label: 'Clientes', icon: <Users size={16} /> },
  { label: 'Cumpleaños', icon: <Gift size={16} />, badge: '4' },
  { label: 'Configuración', icon: <Settings size={16} /> },
];

export function MobileSidebarToggle({ tenant, branch }: MobileSidebarToggleProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          color: '#94A3B8',
          cursor: 'pointer',
        }}
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 50,
                backdropFilter: 'blur(4px)',
              }}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                width: 240,
                background: '#15191E',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                zIndex: 60,
                padding: '24px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}
            >
              {/* Logo */}
              <div style={{ padding: '0 20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Zap size={16} color="#0B0E11" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', lineHeight: 1.2 }}>{tenant}</p>
                    <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.2 }}>{branch}</p>
                  </div>
                </div>
              </div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 8 }} />

              <nav>
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    onClick={() => setOpen(false)}
                    className={`nav-item${item.active ? ' active' : ''}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <span style={{ opacity: item.active ? 1 : 0.7 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          background: item.active ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.08)',
                          color: item.active ? '#F59E0B' : '#94A3B8',
                          padding: '2px 7px',
                          borderRadius: 99,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

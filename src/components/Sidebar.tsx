import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Package,
  CreditCard,
  Users,
  Gift,
  Settings,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard size={16} />, active: true },
  { label: 'Menú & Platos', icon: <UtensilsCrossed size={16} /> },
  { label: 'Inventario', icon: <Package size={16} />, badge: '2' },
  { label: 'Finanzas', icon: <CreditCard size={16} /> },
  { label: 'Clientes', icon: <Users size={16} /> },
  { label: 'Cumpleaños', icon: <Gift size={16} />, badge: '4' },
];

const bottomItems: NavItem[] = [
  { label: 'Configuración', icon: <Settings size={16} /> },
];

interface SidebarProps {
  tenant: string;
  branch: string;
}

export function Sidebar({ tenant, branch }: SidebarProps) {
  return (
    <motion.aside
      className="sidebar"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <div style={{ padding: '0 20px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Zap size={16} color="#0B0E11" strokeWidth={2.5} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', lineHeight: 1.2 }}>
              {tenant}
            </p>
            <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.2 }}>{branch}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider" style={{ marginBottom: 8 }} />

      {/* Section label */}
      <p
        className="section-label"
        style={{ padding: '12px 20px 8px', display: 'block' }}
      >
        Principal
      </p>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        {navItems.map((item) => (
          <a
            key={item.label}
            className={`nav-item${item.active ? ' active' : ''}`}
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
                  letterSpacing: '0.02em',
                }}
              >
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* Bottom */}
      <div>
        <div className="divider" style={{ marginBottom: 8 }} />
        {bottomItems.map((item) => (
          <a key={item.label} className="nav-item">
            <span style={{ opacity: 0.7 }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            <ChevronRight size={13} style={{ opacity: 0.3 }} />
          </a>
        ))}

        {/* Plan badge */}
        <div style={{ padding: '16px 20px 0' }}>
          <div
            style={{
              background: 'rgba(245,158,11,0.07)',
              border: '1px solid rgba(245,158,11,0.14)',
              borderRadius: 10,
              padding: '10px 12px',
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 600, color: '#F59E0B', marginBottom: 2 }}>
              Plan Enterprise
            </p>
            <p style={{ fontSize: 11, color: '#475569' }}>Todas las funciones activas</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

import { motion } from 'framer-motion';
import { Bell, Search, ChevronDown, CircleUser } from 'lucide-react';
import { MobileSidebarToggle } from './MobileSidebarToggle';

interface TopbarProps {
  title: string;
  tenant?: string;
  branch?: string;
}

export function Topbar({ title, tenant = 'Animal Cocina', branch = 'Sucursal Centro' }: TopbarProps) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  return (
    <motion.header
      className="topbar"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Mobile menu toggle */}
        <div className="mobile-menu-btn">
          <MobileSidebarToggle tenant={tenant} branch={branch} />
        </div>
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#F1F5F9', lineHeight: 1.2 }}>
            {title}
          </p>
          <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.2 }}>{formattedDate}</p>
        </div>
      </div>

      {/* Right: actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Search — hidden on mobile */}
        <button
          className="search-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 14px',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: '#475569',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <Search size={14} />
          <span>Buscar…</span>
          <span
            style={{
              fontSize: 10,
              padding: '1px 5px',
              borderRadius: 4,
              background: 'rgba(255,255,255,0.06)',
              color: '#475569',
            }}
          >
            ⌘K
          </span>
        </button>

        {/* Notifications */}
        <button
          style={{
            position: 'relative',
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94A3B8',
            cursor: 'pointer',
          }}
        >
          <Bell size={15} />
          <span
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#F59E0B',
              border: '1.5px solid #0B0E11',
            }}
          />
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.06)' }} />

        {/* User */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 10px 5px 5px',
            borderRadius: 8,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: 'linear-gradient(135deg, #1E2A38 0%, #2D3A4A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircleUser size={16} color="#94A3B8" />
          </div>
          <span className="user-label" style={{ fontSize: 13, fontWeight: 500, color: '#94A3B8' }}>
            Admin
          </span>
          <ChevronDown size={13} color="#475569" />
        </button>
      </div>
    </motion.header>
  );
}

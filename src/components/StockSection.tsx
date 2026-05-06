import { motion } from 'framer-motion';
import { AlertTriangle, Package } from 'lucide-react';
import { StockItem, stockPercent } from '../lib/data';

interface StockSectionProps {
  items: StockItem[];
}

const getBarColor = (pct: number, critical: boolean) => {
  if (critical || pct <= 30) return '#F87171';
  if (pct <= 55) return '#F59E0B';
  return '#34D399';
};

const getBarBg = (pct: number, critical: boolean) => {
  if (critical || pct <= 30) return 'rgba(248,113,113,0.08)';
  if (pct <= 55) return 'rgba(245,158,11,0.08)';
  return 'rgba(52,211,153,0.08)';
};

export function StockSection({ items }: StockSectionProps) {
  const criticalCount = items.filter(i => i.critical).length;

  return (
    <motion.div
      className="glass-card"
      style={{ padding: 24 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Package size={15} color="#475569" />
          <p className="section-label">Lo que queda — Inventario</p>
        </div>
        {criticalCount > 0 && (
          <span
            className="accent-pill"
            style={{
              background: 'var(--red-dim)',
              color: 'var(--red)',
            }}
          >
            <AlertTriangle size={10} />
            {criticalCount} crítico{criticalCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((item, i) => {
          const pct = stockPercent(item.available, item.total);
          const barColor = getBarColor(pct, item.critical);
          const barBg = getBarBg(pct, item.critical);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#F1F5F9' }}>
                    {item.name}
                  </span>
                  {item.critical && (
                    <AlertTriangle size={11} color="#F87171" />
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, color: '#475569' }}>
                    {item.available} / {item.total} {item.unit}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: barColor,
                      background: barBg,
                      padding: '2px 7px',
                      borderRadius: 99,
                    }}
                  >
                    {pct}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${pct}%`,
                    background: barColor,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

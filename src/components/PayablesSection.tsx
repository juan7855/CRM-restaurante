import { motion } from 'framer-motion';
import { CreditCard, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PayableItem, formatCurrency } from '../lib/data';

interface PayablesSectionProps {
  items: PayableItem[];
}

const statusConfig = {
  pending: { label: 'Pendiente', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', icon: <Clock size={11} /> },
  overdue: { label: 'Vencido', color: '#F87171', bg: 'rgba(248,113,113,0.1)', icon: <AlertCircle size={11} /> },
  paid: { label: 'Pagado', color: '#34D399', bg: 'rgba(52,211,153,0.1)', icon: <CheckCircle2 size={11} /> },
};

export function PayablesSection({ items }: PayablesSectionProps) {
  const total = items.reduce((acc, item) => acc + (item.status !== 'paid' ? item.amount : 0), 0);
  const overdueTotal = items.filter(i => i.status === 'overdue').reduce((acc, i) => acc + i.amount, 0);

  return (
    <motion.div
      className="glass-card"
      style={{ padding: 24 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
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
          <CreditCard size={15} color="#475569" />
          <p className="section-label">Próximos Pagos — Cuentas por Pagar</p>
        </div>
      </div>

      {/* Summary row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 20,
          padding: 16,
          background: 'rgba(255,255,255,0.02)',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div>
          <p style={{ fontSize: 11, color: '#475569', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            Total por Pagar
          </p>
          <p className="kpi-medium" style={{ color: '#F1F5F9' }}>
            {formatCurrency(total)}
          </p>
        </div>
        <div>
          <p style={{ fontSize: 11, color: '#475569', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            Vencido Hoy
          </p>
          <p className="kpi-medium" style={{ color: overdueTotal > 0 ? '#F87171' : '#34D399' }}>
            {overdueTotal > 0 ? formatCurrency(overdueTotal) : '—'}
          </p>
        </div>
      </div>

      {/* Payables list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map((item, i) => {
          const cfg = statusConfig[item.status];
          const isUrgent = item.daysUntilDue <= 3 && item.status !== 'paid';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 + i * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#F1F5F9',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.vendor}
                  </p>
                  {isUrgent && (
                    <AlertCircle size={11} color="#F87171" />
                  )}
                </div>
                <p style={{ fontSize: 12, color: '#475569' }}>{item.description}</p>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9', marginBottom: 4 }}>
                  {formatCurrency(item.amount)}
                </p>
                <span
                  className="accent-pill"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {cfg.icon}
                  {item.status === 'overdue'
                    ? 'Vencido'
                    : item.daysUntilDue === 0
                    ? 'Hoy'
                    : `${item.daysUntilDue}d`}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

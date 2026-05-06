import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  action?: string;
}

const alerts: Alert[] = [
  { id: '1', type: 'critical', message: 'Gas Natural Bajío — pago vencido hoy. Riesgo de corte de servicio.', action: 'Pagar ahora' },
  { id: '2', type: 'warning', message: 'Costilla de Res al 30% de inventario. Solicitar reabastecimiento.', action: 'Ver stock' },
  { id: '3', type: 'warning', message: 'IMSS vence en 2 días — $23,100 MXN pendiente.', action: 'Ver pagos' },
];

const typeConfig = {
  critical: { bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.18)', color: '#F87171', dot: '#F87171' },
  warning: { bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.14)', color: '#F59E0B', dot: '#F59E0B' },
  info: { bg: 'rgba(96,165,250,0.06)', border: 'rgba(96,165,250,0.14)', color: '#60A5FA', dot: '#60A5FA' },
};

export function AlertsBanner() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = alerts.filter(a => !dismissed.includes(a.id));

  if (visible.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <AnimatePresence>
        {visible.map((alert) => {
          const cfg = typeConfig[alert.type];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                borderRadius: 10,
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: cfg.dot,
                  flexShrink: 0,
                }}
              />
              <AlertTriangle size={13} color={cfg.color} style={{ flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: '#94A3B8', flex: 1 }}>
                {alert.message}
              </p>
              {alert.action && (
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    color: cfg.color,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px 0',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {alert.action}
                  <ArrowRight size={11} />
                </button>
              )}
              <button
                onClick={() => setDismissed(d => [...d, alert.id])}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  background: 'rgba(255,255,255,0.05)',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#475569',
                  flexShrink: 0,
                }}
              >
                <X size={11} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

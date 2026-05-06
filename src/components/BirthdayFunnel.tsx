import { motion } from 'framer-motion';
import { Gift, Send, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { BirthdayTrigger } from '../lib/data';

interface BirthdayFunnelProps {
  triggers: BirthdayTrigger[];
}

const statusConfig = {
  scheduled: {
    label: 'Programado',
    color: '#60A5FA',
    bg: 'rgba(96,165,250,0.10)',
    icon: <Clock size={11} />,
  },
  sent: {
    label: 'Enviado',
    color: '#34D399',
    bg: 'rgba(52,211,153,0.10)',
    icon: <CheckCircle2 size={11} />,
  },
  pending_review: {
    label: 'Revisar',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.10)',
    icon: <AlertCircle size={11} />,
  },
};

const urgencyColor = (days: number) => {
  if (days <= 1) return '#F87171';
  if (days <= 3) return '#F59E0B';
  return '#94A3B8';
};

export function BirthdayFunnel({ triggers }: BirthdayFunnelProps) {
  const scheduled = triggers.filter(t => t.automationStatus === 'scheduled').length;
  const needsReview = triggers.filter(t => t.automationStatus === 'pending_review').length;

  return (
    <motion.div
      className="glass-card"
      style={{ padding: 24 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
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
          <Gift size={15} color="#F59E0B" />
          <p className="section-label">Funnel de Cumpleaños — CRM</p>
        </div>
        {needsReview > 0 && (
          <span
            className="accent-pill"
            style={{ background: 'rgba(245,158,11,0.10)', color: '#F59E0B' }}
          >
            <AlertCircle size={10} />
            {needsReview} para revisar
          </span>
        )}
      </div>

      {/* Stats row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
          marginBottom: 20,
        }}
      >
        {[
          { label: 'Esta Semana', value: triggers.length, color: '#F1F5F9' },
          { label: 'Programados', value: scheduled, color: '#60A5FA' },
          { label: 'Revisar', value: needsReview, color: '#F59E0B' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: '12px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.04)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 22, fontWeight: 700, color: stat.color, letterSpacing: '-0.02em', lineHeight: 1 }}>
              {stat.value}
            </p>
            <p style={{ fontSize: 10, color: '#475569', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Trigger cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {triggers.map((trigger, i) => {
          const cfg = statusConfig[trigger.automationStatus];

          return (
            <motion.div
              key={trigger.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 14,
                }}
              >
                🎂
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9' }}>
                    {trigger.clientName}
                  </p>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: urgencyColor(trigger.daysUntil),
                    }}
                  >
                    {trigger.daysUntil === 0
                      ? '¡Hoy!'
                      : trigger.daysUntil === 1
                      ? 'Mañana'
                      : `en ${trigger.daysUntil}d`}
                  </span>
                </div>
                <p style={{ fontSize: 11, color: '#475569' }}>
                  {trigger.offerType} · {trigger.lastVisit}
                </p>
              </div>

              {/* Status + Action */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <span
                  className="accent-pill"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {cfg.icon}
                  {cfg.label}
                </span>
                <button
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: 'rgba(245,158,11,0.08)',
                    border: '1px solid rgba(245,158,11,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background 180ms',
                  }}
                  title="Enviar ahora"
                >
                  <Send size={12} color="#F59E0B" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Automation note */}
      <div
        style={{
          marginTop: 16,
          padding: '10px 14px',
          background: 'rgba(96,165,250,0.05)',
          borderRadius: 8,
          border: '1px solid rgba(96,165,250,0.10)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <CheckCircle2 size={13} color="#60A5FA" />
        <p style={{ fontSize: 12, color: '#475569' }}>
          Reenvíos automáticos activos · Disparador: 24h antes del cumpleaños
        </p>
      </div>
    </motion.div>
  );
}

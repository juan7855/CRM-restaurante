import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { KPIData } from '../lib/data';
import { Sparkline } from './Sparkline';

interface KPICardProps {
  data: KPIData;
  index: number;
  hero?: boolean;
}

export function KPICard({ data, index, hero = false }: KPICardProps) {
  const isPositive = data.change >= 0;

  return (
    <motion.div
      className="glass-card"
      style={{ padding: hero ? 28 : 24, height: '100%' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Label */}
      <p
        className="section-label"
        style={{ marginBottom: hero ? 20 : 16 }}
      >
        {data.label}
      </p>

      {/* Value */}
      <p
        className={hero ? 'kpi-hero' : 'kpi-large'}
        style={{ marginBottom: 8 }}
      >
        {data.value}
      </p>

      {/* Change */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 20,
        }}
      >
        <span
          className="accent-pill"
          style={{
            background: isPositive ? 'var(--green-dim)' : 'var(--red-dim)',
            color: isPositive ? 'var(--green)' : 'var(--red)',
          }}
        >
          {isPositive ? (
            <TrendingUp size={10} strokeWidth={2.5} />
          ) : (
            <TrendingDown size={10} strokeWidth={2.5} />
          )}
          {isPositive ? '+' : ''}
          {data.change}%
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{data.period}</span>
      </div>

      {/* Sparkline */}
      <Sparkline data={data.sparkline} positive={isPositive} />
    </motion.div>
  );
}

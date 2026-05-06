import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';
import { FavoriteDish, formatCurrency, formatNumber } from '../lib/data';

interface FavoriteDishesSectionProps {
  dishes: FavoriteDish[];
}

const trendIcon = {
  up: <TrendingUp size={11} strokeWidth={2.5} />,
  down: <TrendingDown size={11} strokeWidth={2.5} />,
  stable: <Minus size={11} strokeWidth={2.5} />,
};

const trendColor = {
  up: '#34D399',
  down: '#F87171',
  stable: '#94A3B8',
};

const trendBg = {
  up: 'rgba(52,211,153,0.10)',
  down: 'rgba(248,113,113,0.10)',
  stable: 'rgba(255,255,255,0.05)',
};

export function FavoriteDishesSection({ dishes }: FavoriteDishesSectionProps) {
  const maxOrders = Math.max(...dishes.map(d => d.ordersThisWeek));

  return (
    <motion.div
      className="glass-card"
      style={{ padding: 24 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 20,
        }}
      >
        <Flame size={15} color="#F59E0B" />
        <p className="section-label">Platos Favoritos — Esta Semana</p>
      </div>

      {/* Column headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 80px 100px 64px',
          gap: 8,
          padding: '0 0 8px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          marginBottom: 4,
        }}
      >
        {['Plato', 'Pedidos', 'Ingresos', 'Tendencia'].map(h => (
          <p
            key={h}
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#475569',
              textAlign: h === 'Pedidos' || h === 'Ingresos' ? 'right' : 'left',
            }}
          >
            {h}
          </p>
        ))}
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {dishes.map((dish, i) => {
          const pct = (dish.ordersThisWeek / maxOrders) * 100;
          const isTop = dish.ordersThisWeek === maxOrders;

          return (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 + i * 0.06 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 80px 100px 64px',
                gap: 8,
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: i < dishes.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
              }}
            >
              {/* Name */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  {isTop && (
                    <span style={{ fontSize: 10, background: 'rgba(245,158,11,0.15)', color: '#F59E0B', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>
                      #1
                    </span>
                  )}
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#F1F5F9' }}>{dish.name}</p>
                </div>
                {/* Mini bar */}
                <div className="progress-track" style={{ width: '80%' }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${pct}%`,
                      background: isTop ? '#F59E0B' : 'rgba(245,158,11,0.4)',
                    }}
                  />
                </div>
              </div>

              {/* Orders */}
              <p style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9', textAlign: 'right' }}>
                {formatNumber(dish.ordersThisWeek)}
              </p>

              {/* Revenue */}
              <p style={{ fontSize: 13, color: '#94A3B8', textAlign: 'right' }}>
                {formatCurrency(dish.revenue)}
              </p>

              {/* Trend */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span
                  className="accent-pill"
                  style={{
                    background: trendBg[dish.trend],
                    color: trendColor[dish.trend],
                  }}
                >
                  {trendIcon[dish.trend]}
                  {dish.trend !== 'stable' && `${Math.abs(dish.trendPercent)}%`}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import {
  getTenant,
  getKPIs,
  getSalesTrend,
  getFavoriteDishes,
  getStockItems,
  getPayables,
  getBirthdayTriggers,
} from '../lib/data';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { KPICard } from '../components/KPICard';
import { SalesTrendChart } from '../components/SalesTrendChart';
import { FavoriteDishesSection } from '../components/FavoriteDishesSection';
import { StockSection } from '../components/StockSection';
import { PayablesSection } from '../components/PayablesSection';
import { BirthdayFunnel } from '../components/BirthdayFunnel';
import { AlertsBanner } from '../components/AlertsBanner';
import { ArrowUpRight } from 'lucide-react';

const TENANT_ID = 'animal-cocina';

export default function Dashboard() {
  const tenant = getTenant(TENANT_ID);
  const kpis = getKPIs();
  const salesTrend = getSalesTrend();
  const dishes = getFavoriteDishes();
  const stock = getStockItems();
  const payables = getPayables();
  const birthdays = getBirthdayTriggers();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0B0E11' }}>
      {/* Desktop Sidebar */}
      <Sidebar tenant={tenant.name} branch={tenant.branch} />

      {/* Main */}
      <div className="main-layout" style={{ flex: 1 }}>
        <Topbar
          title="Command Center"
          tenant={tenant.name}
          branch={tenant.branch}
        />

        <main className="dashboard-main">
          {/* ── Alerts ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            style={{ marginBottom: 32 }}
          >
            <AlertsBanner />
          </motion.div>

          {/* ── KPI Section ─────────────────────────────────── */}
          <p className="section-label" style={{ marginBottom: 16 }}>
            Resumen General
          </p>

          {/* Hero + secondary KPIs */}
          <div className="kpi-grid" style={{ marginBottom: 32 }}>
            <div className="kpi-hero-cell">
              <KPICard data={kpis[0]} index={0} hero />
            </div>
            {kpis.slice(1).map((kpi, i) => (
              <div key={kpi.label} className="kpi-secondary-cell">
                <KPICard data={kpi} index={i + 1} />
              </div>
            ))}
          </div>

          {/* ── Tendencia + Platos ──────────────────────────── */}
          <div className="two-col-grid" style={{ marginBottom: 32 }}>
            {/* Sales Trend */}
            <motion.div
              className="glass-card"
              style={{ padding: 24 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                <p className="section-label">Tendencia de Ventas — Esta Semana</p>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 11,
                    color: '#F59E0B',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Ver detalles
                  <ArrowUpRight size={11} />
                </button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <p className="kpi-large">$495,000</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <span
                    className="accent-pill"
                    style={{ background: 'rgba(52,211,153,0.10)', color: '#34D399' }}
                  >
                    +18.4%
                  </span>
                  <span style={{ fontSize: 12, color: '#475569' }}>vs. semana pasada</span>
                </div>
              </div>

              <SalesTrendChart data={salesTrend} />

              <p style={{ fontSize: 11, color: '#475569', marginTop: 12 }}>
                Línea punteada = Meta semanal ($50,000 / día)
              </p>
            </motion.div>

            {/* Favorite Dishes */}
            <FavoriteDishesSection dishes={dishes} />
          </div>

          {/* ── Stock + Pagos ────────────────────────────────── */}
          <p className="section-label" style={{ marginBottom: 16 }}>
            Operaciones
          </p>
          <div className="two-col-grid ops-grid" style={{ marginBottom: 32 }}>
            <StockSection items={stock} />
            <PayablesSection items={payables} />
          </div>

          {/* ── CRM Birthday Funnel ──────────────────────────── */}
          <p className="section-label" style={{ marginBottom: 16 }}>
            CRM · Retención de Clientes
          </p>
          <BirthdayFunnel triggers={birthdays} />

          {/* Footer */}
          <div
            style={{
              marginTop: 48,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ fontSize: 12, color: '#2D3748' }}>
              Animal Cocina Command Center · v2.0 · {new Date().getFullYear()}
            </p>
            <p style={{ fontSize: 12, color: '#2D3748' }}>
              Última sincronización: hace 2 minutos
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ANIMAL COCINA — Business Logic / Data Layer
// 100% decoupled from UI components
// ─────────────────────────────────────────────────────────────

export interface Tenant {
  id: string;
  name: string;
  branch: string;
  plan: 'pro' | 'enterprise';
}

export interface KPIData {
  label: string;
  value: string;
  change: number; // percentage, positive = up
  period: string;
  sparkline: number[];
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  available: number;
  total: number;
  unit: string;
  critical: boolean;
}

export interface PayableItem {
  id: string;
  vendor: string;
  description: string;
  amount: number;
  currency: string;
  dueDate: string;
  daysUntilDue: number;
  status: 'pending' | 'overdue' | 'paid';
}

export interface FavoriteDish {
  id: string;
  name: string;
  ordersThisWeek: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
}

export interface BirthdayTrigger {
  id: string;
  clientName: string;
  birthday: string;
  daysUntil: number;
  lastVisit: string;
  phone: string;
  automationStatus: 'scheduled' | 'sent' | 'pending_review';
  offerType: string;
}

export interface SalesTrendPoint {
  day: string;
  ventas: number;
  meta: number;
}

// ─── Tenant Config ───────────────────────────────────────────
export const getTenant = (tenantId: string): Tenant => ({
  id: tenantId,
  name: 'Animal Cocina',
  branch: 'Sucursal Centro',
  plan: 'enterprise',
});

// ─── KPI Cards ───────────────────────────────────────────────
export const getKPIs = (): KPIData[] => [
  {
    label: 'Ingresos del Mes',
    value: '$184,320',
    change: +12.4,
    period: 'vs. mes anterior',
    sparkline: [42, 38, 55, 48, 62, 58, 71, 66, 79, 74, 88, 92],
  },
  {
    label: 'Ticket Promedio',
    value: '$387',
    change: +5.1,
    period: 'vs. semana pasada',
    sparkline: [310, 295, 320, 340, 355, 370, 360, 387, 380, 387, 392, 387],
  },
  {
    label: 'Clientes Nuevos',
    value: '248',
    change: +18.7,
    period: 'este mes',
    sparkline: [18, 22, 19, 24, 28, 31, 25, 29, 34, 38, 35, 42],
  },
  {
    label: 'Mesas Ocupadas (Ahora)',
    value: '14 / 22',
    change: -3.2,
    period: 'vs. mismo horario ayer',
    sparkline: [8, 12, 16, 18, 14, 20, 22, 18, 16, 14, 14, 14],
  },
];

// ─── Sales Trend ─────────────────────────────────────────────
export const getSalesTrend = (): SalesTrendPoint[] => [
  { day: 'L', ventas: 42000, meta: 50000 },
  { day: 'M', ventas: 58000, meta: 50000 },
  { day: 'X', ventas: 51000, meta: 50000 },
  { day: 'J', ventas: 67000, meta: 50000 },
  { day: 'V', ventas: 89000, meta: 50000 },
  { day: 'S', ventas: 112000, meta: 50000 },
  { day: 'D', ventas: 76000, meta: 50000 },
];

// ─── Favorite Dishes ─────────────────────────────────────────
export const getFavoriteDishes = (): FavoriteDish[] => [
  { id: '1', name: 'Costilla BBQ Animal', ordersThisWeek: 312, revenue: 124800, trend: 'up', trendPercent: 14 },
  { id: '2', name: 'Burger Smash Doble', ordersThisWeek: 287, revenue: 101668, trend: 'up', trendPercent: 8 },
  { id: '3', name: 'Tabla Carnívora Premium', ordersThisWeek: 201, revenue: 160800, trend: 'stable', trendPercent: 0 },
  { id: '4', name: 'Wings Crispy x12', ordersThisWeek: 198, revenue: 59400, trend: 'up', trendPercent: 22 },
  { id: '5', name: 'Asado de Tira Slow', ordersThisWeek: 144, revenue: 115200, trend: 'down', trendPercent: -5 },
];

// ─── Stock / Inventario ───────────────────────────────────────
export const getStockItems = (): StockItem[] => [
  { id: '1', name: 'Costilla de Res', category: 'Carnes', available: 18, total: 60, unit: 'kg', critical: true },
  { id: '2', name: 'Pechuga de Pollo', category: 'Carnes', available: 34, total: 80, unit: 'kg', critical: false },
  { id: '3', name: 'Papas Prefritas', category: 'Congelados', available: 22, total: 40, unit: 'kg', critical: false },
  { id: '4', name: 'Cerveza Artesanal IPA', category: 'Bebidas', available: 48, total: 144, unit: 'uds', critical: false },
  { id: '5', name: 'Chimichurri House', category: 'Salsas', available: 4, total: 20, unit: 'lts', critical: true },
  { id: '6', name: 'Pan Brioche', category: 'Panadería', available: 35, total: 120, unit: 'uds', critical: false },
];

// ─── Cuentas por Pagar ────────────────────────────────────────
export const getPayables = (): PayableItem[] => [
  { id: '1', vendor: 'Distribuidora El Gaucho', description: 'Carnes seleccionadas — sem. 28', amount: 42800, currency: 'MXN', dueDate: '2025-07-18', daysUntilDue: 3, status: 'pending' },
  { id: '2', vendor: 'Gas Natural Bajío', description: 'Servicio mensual — julio', amount: 8400, currency: 'MXN', dueDate: '2025-07-15', daysUntilDue: 0, status: 'overdue' },
  { id: '3', vendor: 'Sysco México', description: 'Insumos cocina — pedido #7821', amount: 19350, currency: 'MXN', dueDate: '2025-07-25', daysUntilDue: 10, status: 'pending' },
  { id: '4', vendor: 'Arrendamiento Plaza Central', description: 'Renta agosto 2025', amount: 68000, currency: 'MXN', dueDate: '2025-08-01', daysUntilDue: 17, status: 'pending' },
  { id: '5', vendor: 'IMSS', description: 'Cuotas patronales julio', amount: 23100, currency: 'MXN', dueDate: '2025-07-17', daysUntilDue: 2, status: 'pending' },
];

// ─── Birthday Funnel ─────────────────────────────────────────
export const getBirthdayTriggers = (): BirthdayTrigger[] => [
  { id: '1', clientName: 'Mariana Ríos', birthday: '2025-07-16', daysUntil: 1, lastVisit: 'hace 12 días', phone: '+52 55 1234 5678', automationStatus: 'scheduled', offerType: 'Postre gratis + 20% off' },
  { id: '2', clientName: 'Jorge Castellanos', birthday: '2025-07-18', daysUntil: 3, lastVisit: 'hace 5 días', phone: '+52 55 8765 4321', automationStatus: 'pending_review', offerType: 'Bebida gratis' },
  { id: '3', clientName: 'Sofía Mendoza', birthday: '2025-07-20', daysUntil: 5, lastVisit: 'hace 31 días', phone: '+52 55 2345 6789', automationStatus: 'scheduled', offerType: 'Tabla para 2 personas' },
  { id: '4', clientName: 'Andrés Fuentes', birthday: '2025-07-22', daysUntil: 7, lastVisit: 'hace 8 días', phone: '+52 55 9876 5432', automationStatus: 'sent', offerType: 'Postre gratis + 20% off' },
];

// ─── Formatters ───────────────────────────────────────────────
export const formatCurrency = (amount: number, currency = 'MXN'): string =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

export const formatNumber = (n: number): string =>
  new Intl.NumberFormat('es-MX').format(n);

export const stockPercent = (available: number, total: number): number =>
  Math.round((available / total) * 100);

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell,
} from 'recharts';
import { SalesTrendPoint } from '../lib/data';

interface SalesTrendChartProps {
  data: SalesTrendPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    const ventas = payload.find((p: any) => p.dataKey === 'ventas');
    return (
      <div
        style={{
          background: '#1A1F26',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          padding: '10px 14px',
          fontSize: 13,
          color: '#F1F5F9',
          minWidth: 140,
        }}
      >
        <p style={{ color: '#94A3B8', fontSize: 11, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </p>
        <p style={{ fontWeight: 600, fontSize: 15 }}>
          ${(ventas?.value / 1000).toFixed(0)}k
        </p>
      </div>
    );
  }
  return null;
};

export function SalesTrendChart({ data }: SalesTrendChartProps) {
  const maxVal = Math.max(...data.map(d => d.ventas));

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} barSize={28} margin={{ top: 8, right: 0, bottom: 0, left: -20 }}>
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#475569', fontSize: 12, fontFamily: 'Inter' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#475569', fontSize: 11, fontFamily: 'Inter' }}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          width={48}
        />
        <ReferenceLine y={50000} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 6 }} />
        <Bar dataKey="ventas" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.day}
              fill={entry.ventas === maxVal ? '#F59E0B' : 'rgba(245,158,11,0.22)'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

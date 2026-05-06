import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

interface SparklineProps {
  data: number[];
  color?: string;
  positive?: boolean;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: '#1A1F26',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 8,
          padding: '4px 10px',
          fontSize: 12,
          color: '#F1F5F9',
        }}
      >
        {payload[0].value}
      </div>
    );
  }
  return null;
};

export function Sparkline({ data, positive = true }: SparklineProps) {
  const color = positive ? '#F59E0B' : '#F87171';
  const chartData = data.map((v, i) => ({ i, v }));

  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.18} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#sg-${color.replace('#','')})`}
          dot={false}
          activeDot={{ r: 3, fill: color, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

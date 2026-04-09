import { AnalysisResult } from "@/lib/energyEngine";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { TrendingDown, Lightbulb, AlertTriangle, Sun, ArrowDown, Zap, DollarSign, Clock } from "lucide-react";

interface Props {
  result: AnalysisResult;
  onBack: () => void;
}

const CATEGORY_ICONS = {
  Reduce: <TrendingDown className="h-5 w-5" />,
  Reuse: <Clock className="h-5 w-5" />,
  Recycle: <Lightbulb className="h-5 w-5" />,
  Recover: <Sun className="h-5 w-5" />,
};

const CATEGORY_COLORS = {
  Reduce: "bg-energy-green-light text-energy-green border-energy-green/20",
  Reuse: "bg-energy-blue-light text-energy-blue border-energy-blue/20",
  Recycle: "bg-energy-amber-light text-energy-amber border-energy-amber/20",
  Recover: "bg-energy-red-light text-energy-purple border-energy-purple/20",
};

export default function ResultsDashboard({ result, onBack }: Props) {
  const barData = result.applianceEnergy.map((a) => ({
    name: a.name,
    energy: Math.round(a.energy * 100) / 100,
  }));

  const lineData = result.loadProfile.map((load, hour) => ({
    hour: `${hour}:00`,
    before: Math.round(load * 1000) / 1000,
    after: Math.round(result.optimizedLoadProfile[hour] * 1000) / 1000,
  }));

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← Back to Input
      </button>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={<Zap className="h-5 w-5" />} label="Daily Energy" value={`${result.totalEnergy} kWh`} color="bg-energy-green-light" iconColor="text-energy-green" />
        <SummaryCard icon={<DollarSign className="h-5 w-5" />} label="Monthly Cost" value={`₹${result.monthlyCost}`} color="bg-energy-amber-light" iconColor="text-energy-amber" />
        <SummaryCard icon={<AlertTriangle className="h-5 w-5" />} label="Peak Load" value={`${result.peakLoad} kW`} color="bg-energy-red-light" iconColor="text-energy-red" />
        <SummaryCard icon={<ArrowDown className="h-5 w-5" />} label="Potential Savings" value={`₹${result.savingsRupees}/mo`} sub={`${result.savingsPercent}% reduction`} color="bg-energy-blue-light" iconColor="text-energy-blue" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-lg p-6">
          <h3 className="font-semibold mb-4">Appliance-wise Consumption (kWh/day)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="energy" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-lg p-6">
          <h3 className="font-semibold mb-4">24-Hour Load Profile (kW)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={3} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="before" stroke="hsl(var(--energy-red))" strokeWidth={2} name="Before" dot={false} />
              <Line type="monotone" dataKey="after" stroke="hsl(var(--energy-green))" strokeWidth={2} name="After Optimization" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Peak Analysis */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-energy-amber" /> Peak Usage Hours
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.peakHours.map((h) => (
            <span key={h} className="px-3 py-1.5 rounded-full bg-energy-amber-light text-energy-amber font-mono text-sm font-medium">
              {h}:00 – {h + 1}:00
            </span>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="font-semibold mb-4 text-lg">4R Recommendations</h3>
        <div className="space-y-4">
          {result.recommendations.map((rec, i) => (
            <div key={i} className={`p-4 rounded-lg border ${CATEGORY_COLORS[rec.category]}`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{CATEGORY_ICONS[rec.category]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider opacity-70">{rec.category}</span>
                  </div>
                  <p className="font-semibold text-sm">{rec.action}</p>
                  <p className="text-xs mt-1 opacity-80">{rec.reason}</p>
                  <p className="text-xs mt-2 font-mono font-semibold">
                    Save ₹{rec.savingsRupees}/month ({rec.savingsPercent}%)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before vs After */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="font-semibold mb-4 text-lg">Before vs After Optimization</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div />
          <div className="text-sm font-semibold text-muted-foreground">Before</div>
          <div className="text-sm font-semibold text-energy-green">After</div>

          <div className="text-sm font-medium text-left">Daily Energy</div>
          <div className="font-mono">{result.totalEnergy} kWh</div>
          <div className="font-mono text-energy-green">{result.optimizedEnergy} kWh</div>

          <div className="text-sm font-medium text-left">Daily Cost</div>
          <div className="font-mono">₹{result.cost}</div>
          <div className="font-mono text-energy-green">₹{result.optimizedCost}</div>

          <div className="text-sm font-medium text-left">Peak Load</div>
          <div className="font-mono">{result.peakLoad} kW</div>
          <div className="font-mono text-energy-green">{result.optimizedPeakLoad} kW</div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, sub, color, iconColor }: {
  icon: React.ReactNode; label: string; value: string; sub?: string; color: string; iconColor: string;
}) {
  return (
    <div className="glass-card rounded-lg p-4">
      <div className={`inline-flex p-2 rounded-lg ${color} ${iconColor} mb-2`}>{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
      {sub && <p className="text-xs text-energy-green font-medium mt-0.5">{sub}</p>}
    </div>
  );
}

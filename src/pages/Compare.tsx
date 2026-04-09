import { useState } from "react";
import { INDIAN_TARIFFS, calculateSlabBill } from "@/lib/indianTariffs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { IndianRupee, Plus, X, Search } from "lucide-react";

export default function Compare() {
  const [units, setUnits] = useState(250);
  const [selectedStates, setSelectedStates] = useState<string[]>(["Delhi", "Maharashtra", "Tamil Nadu", "Karnataka", "Uttar Pradesh"]);
  const [search, setSearch] = useState("");

  const availableStates = INDIAN_TARIFFS.filter(
    (t) => !selectedStates.includes(t.state) && t.state.toLowerCase().includes(search.toLowerCase())
  );

  const comparison = selectedStates.map((state) => {
    const bill = calculateSlabBill(state, units);
    const tariff = INDIAN_TARIFFS.find((t) => t.state === state)!;
    return {
      state,
      code: tariff.code,
      total: bill.total,
      effectiveRate: Math.round((bill.total / Math.max(units, 1)) * 100) / 100,
      fixedCharge: tariff.fixedCharge,
      breakdown: bill.breakdown,
    };
  }).sort((a, b) => a.total - b.total);

  const chartData = comparison.map((c) => ({
    name: c.code,
    bill: c.total,
    rate: c.effectiveRate,
  }));

  const cheapest = comparison[0];
  const expensive = comparison[comparison.length - 1];
  const savings = expensive && cheapest ? Math.round(expensive.total - cheapest.total) : 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">⚖️ State Bill Comparison</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Compare electricity bills across Indian states for the same consumption level. See how much you'd pay in each state.
        </p>
      </div>

      {/* Controls */}
      <div className="glass-card rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <Label className="text-sm font-medium">Monthly Consumption (kWh/units)</Label>
            <Input type="number" value={units} onChange={(e) => setUnits(Math.max(0, Number(e.target.value)))} min={0} max={2000} className="mt-1" />
          </div>
          <div className="flex-1">
            <Label className="text-sm font-medium">Add State</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search & add state..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            {search && availableStates.length > 0 && (
              <div className="absolute z-10 mt-1 bg-card border border-border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {availableStates.slice(0, 6).map((t) => (
                  <button
                    key={t.code}
                    onClick={() => { setSelectedStates([...selectedStates, t.state]); setSearch(""); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    {t.state}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected States Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedStates.map((state) => (
            <span key={state} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {state}
              <button onClick={() => setSelectedStates(selectedStates.filter((s) => s !== state))} className="hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {selectedStates.length < 3 && (
            <span className="text-xs text-muted-foreground py-1">Add at least 3 states to compare</span>
          )}
        </div>
      </div>

      {comparison.length >= 2 && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="glass-card rounded-lg p-4 text-center border-l-4 border-energy-green">
              <p className="text-xs text-muted-foreground">Cheapest</p>
              <p className="font-bold text-lg text-energy-green">{cheapest.state}</p>
              <p className="font-mono text-sm">₹{cheapest.total} for {units} units</p>
              <p className="text-xs text-muted-foreground">₹{cheapest.effectiveRate}/kWh effective</p>
            </div>
            <div className="glass-card rounded-lg p-4 text-center border-l-4 border-energy-amber">
              <p className="text-xs text-muted-foreground">You Could Save</p>
              <p className="font-bold text-2xl text-energy-amber font-mono">₹{savings}</p>
              <p className="text-xs text-muted-foreground">per month by living in {cheapest.state} vs {expensive.state}</p>
            </div>
            <div className="glass-card rounded-lg p-4 text-center border-l-4 border-energy-red">
              <p className="text-xs text-muted-foreground">Most Expensive</p>
              <p className="font-bold text-lg text-energy-red">{expensive.state}</p>
              <p className="font-mono text-sm">₹{expensive.total} for {units} units</p>
              <p className="text-xs text-muted-foreground">₹{expensive.effectiveRate}/kWh effective</p>
            </div>
          </div>

          {/* Chart */}
          <div className="glass-card rounded-lg p-6 mb-6">
            <h2 className="font-semibold mb-4">Bill Comparison Chart ({units} units/month)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: number, name: string) =>
                    name === "bill" ? [`₹${value}`, "Total Bill"] : [`₹${value}/kWh`, "Effective Rate"]
                  }
                />
                <Legend />
                <Bar dataKey="bill" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Total Bill (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Table */}
          <div className="glass-card rounded-lg p-6">
            <h2 className="font-semibold mb-4">Detailed Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3">Rank</th>
                    <th className="text-left py-2 px-3">State</th>
                    <th className="text-right py-2 px-3">Fixed Charge</th>
                    <th className="text-right py-2 px-3">Energy Charge</th>
                    <th className="text-right py-2 px-3">Total Bill</th>
                    <th className="text-right py-2 px-3">Eff. Rate</th>
                    <th className="text-right py-2 px-3">vs Cheapest</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((c, i) => {
                    const diff = c.total - cheapest.total;
                    return (
                      <tr key={c.state} className={`border-b border-border/50 ${i === 0 ? "bg-energy-green-light/50" : i === comparison.length - 1 ? "bg-energy-red-light/50" : ""}`}>
                        <td className="py-2 px-3 font-bold">{i + 1}</td>
                        <td className="py-2 px-3 font-medium">{c.state}</td>
                        <td className="py-2 px-3 text-right font-mono">₹{c.fixedCharge}</td>
                        <td className="py-2 px-3 text-right font-mono">₹{Math.round((c.total - c.fixedCharge) * 100) / 100}</td>
                        <td className="py-2 px-3 text-right font-mono font-bold">₹{c.total}</td>
                        <td className="py-2 px-3 text-right font-mono">₹{c.effectiveRate}/kWh</td>
                        <td className={`py-2 px-3 text-right font-mono ${diff === 0 ? "text-energy-green" : "text-energy-red"}`}>
                          {diff === 0 ? "—" : `+₹${Math.round(diff)}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

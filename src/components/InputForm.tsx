import { useState } from "react";
import { Appliance } from "@/lib/energyEngine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Zap } from "lucide-react";

interface Props {
  onAnalyze: (appliances: Appliance[], tariff: number, peakStart: number, peakEnd: number) => void;
}

const DEFAULT_APPLIANCES: Partial<Appliance>[] = [
  { name: "Air Conditioner", power: 1500, usageHours: 8, startHour: 14, endHour: 22, type: "flexible" },
  { name: "Refrigerator", power: 150, usageHours: 24, startHour: 0, endHour: 24, type: "fixed" },
  { name: "Washing Machine", power: 500, usageHours: 2, startHour: 18, endHour: 20, type: "flexible" },
];

export default function InputForm({ onAnalyze }: Props) {
  const [appliances, setAppliances] = useState<Appliance[]>(
    DEFAULT_APPLIANCES.map((a, i) => ({ id: String(i), ...a } as Appliance))
  );
  const [tariff, setTariff] = useState(8);
  const [peakStart, setPeakStart] = useState(18);
  const [peakEnd, setPeakEnd] = useState(22);
  const [newApp, setNewApp] = useState<Partial<Appliance>>({
    name: "", power: 0, usageHours: 1, startHour: 8, endHour: 10, type: "flexible",
  });

  const addAppliance = () => {
    if (!newApp.name || !newApp.power) return;
    setAppliances([...appliances, { ...newApp, id: Date.now().toString() } as Appliance]);
    setNewApp({ name: "", power: 0, usageHours: 1, startHour: 8, endHour: 10, type: "flexible" });
  };

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Tariff & Peak Config */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-accent" />
          Tariff & Peak Hours
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label>Tariff (₹/kWh)</Label>
            <Input type="number" value={tariff} onChange={(e) => setTariff(Number(e.target.value))} min={1} />
          </div>
          <div>
            <Label>Peak Start Hour</Label>
            <Input type="number" value={peakStart} onChange={(e) => setPeakStart(Number(e.target.value))} min={0} max={23} />
          </div>
          <div>
            <Label>Peak End Hour</Label>
            <Input type="number" value={peakEnd} onChange={(e) => setPeakEnd(Number(e.target.value))} min={0} max={24} />
          </div>
        </div>
      </div>

      {/* Appliance List */}
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Appliances</h3>
        <div className="space-y-3">
          {appliances.map((a) => (
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-md bg-muted/50 text-sm">
              <div className="flex-1 font-medium">{a.name}</div>
              <span className="text-muted-foreground">{a.power}W</span>
              <span className="text-muted-foreground">{a.usageHours}h</span>
              <span className="text-muted-foreground">{a.startHour}:00–{a.endHour}:00</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${a.type === "fixed" ? "bg-energy-red-light text-energy-red" : "bg-energy-green-light text-energy-green"}`}>
                {a.type}
              </span>
              <button onClick={() => removeAppliance(a.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add new */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm font-medium text-muted-foreground mb-3">Add Appliance</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Appliance Name</Label>
              <Input placeholder="e.g. Fan" value={newApp.name} onChange={(e) => setNewApp({ ...newApp, name: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Power (Watts)</Label>
              <Input type="number" placeholder="75" value={newApp.power || ""} onChange={(e) => setNewApp({ ...newApp, power: Number(e.target.value) })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Usage (Hours/day)</Label>
              <Input type="number" placeholder="8" value={newApp.usageHours || ""} onChange={(e) => setNewApp({ ...newApp, usageHours: Number(e.target.value) })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Start Hour (0-23)</Label>
              <Input type="number" placeholder="8" value={newApp.startHour ?? ""} onChange={(e) => setNewApp({ ...newApp, startHour: Number(e.target.value) })} min={0} max={23} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">End Hour (0-24)</Label>
              <Input type="number" placeholder="20" value={newApp.endHour ?? ""} onChange={(e) => setNewApp({ ...newApp, endHour: Number(e.target.value) })} min={0} max={24} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Type</Label>
              <Select value={newApp.type} onValueChange={(v) => setNewApp({ ...newApp, type: v as "fixed" | "flexible" })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="flexible">Flexible</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
              </SelectContent>
            </Select>
            </div>
          </div>
          <Button onClick={addAppliance} variant="outline" className="mt-3" size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full gradient-energy text-primary-foreground font-semibold text-base h-12 animate-pulse-glow"
        onClick={() => onAnalyze(appliances, tariff, peakStart, peakEnd)}
        disabled={appliances.length === 0}
      >
        <Zap className="h-5 w-5 mr-2" /> Analyze Energy Usage
      </Button>
    </div>
  );
}

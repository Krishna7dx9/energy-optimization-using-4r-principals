import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, TrendingDown, IndianRupee, Lightbulb, ArrowRight, Sun, Droplets, Wind, Factory, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INDIAN_TARIFFS } from "@/lib/indianTariffs";

const INDIA_ENERGY_FACTS = [
  { icon: <Zap className="h-5 w-5" />, title: "India's Power Capacity", value: "442 GW+", desc: "4th largest power capacity globally (2024)" },
  { icon: <Sun className="h-5 w-5" />, title: "Solar Installed", value: "82 GW+", desc: "National Solar Mission target: 280 GW by 2030" },
  { icon: <Wind className="h-5 w-5" />, title: "Wind Energy", value: "46 GW+", desc: "4th largest wind power capacity in the world" },
  { icon: <Factory className="h-5 w-5" />, title: "Renewable Share", value: "43%+", desc: "Non-fossil fuel share in installed capacity" },
  { icon: <Droplets className="h-5 w-5" />, title: "Hydro Power", value: "52 GW+", desc: "Large & small hydro power combined" },
  { icon: <Lightbulb className="h-5 w-5" />, title: "LED Distribution", value: "370 Cr+", desc: "UJALA scheme — world's largest LED program" },
];

const QUICK_TIPS = [
  "Set AC to 24°C — saves 6% energy per degree higher",
  "Switch to BLDC fans — save 65% over regular fans",
  "Replace all bulbs with LED — save ₹400/bulb/year",
  "Use 5-star rated appliances — 30-45% less consumption",
  "Run washing machine only on full loads",
  "Unplug phone chargers when not in use",
  "Use pressure cooker — 70% less energy than open cooking",
  "Solar water heater saves 70-80% on hot water bills",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [tipIndex, setTipIndex] = useState(0);
  
  const avgTariffs = useMemo(() => {
    const sorted = [...INDIAN_TARIFFS].sort((a, b) => a.slab4.rate - b.slab4.rate);
    return { cheapest: sorted[0], expensive: sorted[sorted.length - 1], avg: Math.round(sorted.reduce((s, t) => s + t.slab2.rate, 0) / sorted.length * 100) / 100 };
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="gradient-energy rounded-2xl p-8 text-primary-foreground">
        <h1 className="text-3xl font-bold mb-2">🇮🇳 Home Energy Optimization</h1>
        <p className="text-sm opacity-90 max-w-2xl mb-6">
          India's comprehensive household energy analysis tool — powered by real state tariffs, BEE star ratings, and 4R optimization principles. Free for all Indian citizens.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => navigate("/analyzer")} variant="secondary" className="font-semibold">
            <Zap className="h-4 w-4 mr-2" /> Start Analysis <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button onClick={() => navigate("/tariffs")} variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
            <MapPin className="h-4 w-4 mr-2" /> View State Tariffs
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {INDIA_ENERGY_FACTS.map((fact, i) => (
          <div key={i} className="glass-card rounded-lg p-4">
            <div className="inline-flex p-2 rounded-lg bg-energy-green-light text-energy-green mb-2">{fact.icon}</div>
            <p className="text-xs text-muted-foreground">{fact.title}</p>
            <p className="text-xl font-bold mt-0.5">{fact.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{fact.desc}</p>
          </div>
        ))}
      </div>

      {/* Tariff Snapshot */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <IndianRupee className="h-5 w-5 text-energy-amber" /> National Tariff Snapshot
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-energy-green-light rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground">Cheapest State</p>
            <p className="font-bold text-lg text-energy-green">{avgTariffs.cheapest.state}</p>
            <p className="text-sm font-mono">₹{avgTariffs.cheapest.slab1.rate}/kWh (Slab 1)</p>
          </div>
          <div className="bg-energy-blue-light rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground">National Average (Slab 2)</p>
            <p className="font-bold text-lg text-energy-blue">₹{avgTariffs.avg}/kWh</p>
            <p className="text-sm text-muted-foreground">Across {INDIAN_TARIFFS.length} states/UTs</p>
          </div>
          <div className="bg-energy-red-light rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground">Most Expensive State</p>
            <p className="font-bold text-lg text-energy-red">{avgTariffs.expensive.state}</p>
            <p className="text-sm font-mono">₹{avgTariffs.expensive.slab4.rate}/kWh (Slab 4)</p>
          </div>
        </div>
      </div>

      {/* Daily Tip */}
      <div className="glass-card rounded-lg p-6 border-l-4 border-energy-amber">
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-energy-amber" /> Energy Saving Tip
        </h2>
        <p className="text-sm text-muted-foreground">{QUICK_TIPS[tipIndex]}</p>
        <Button variant="ghost" size="sm" className="mt-2 text-xs" onClick={() => setTipIndex((tipIndex + 1) % QUICK_TIPS.length)}>
          Next Tip →
        </Button>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickLink title="Energy Analyzer" desc="Analyze your home's energy consumption" icon={<Zap className="h-6 w-6" />} onClick={() => navigate("/analyzer")} color="bg-energy-green-light text-energy-green" />
        <QuickLink title="Appliance Guide" desc="50+ appliances with BEE star ratings" icon={<Lightbulb className="h-6 w-6" />} onClick={() => navigate("/appliances")} color="bg-energy-amber-light text-energy-amber" />
        <QuickLink title="State Tariffs" desc="Electricity rates for all Indian states" icon={<MapPin className="h-6 w-6" />} onClick={() => navigate("/tariffs")} color="bg-energy-blue-light text-energy-blue" />
      </div>

      {/* Government Schemes */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="font-semibold text-lg mb-4">🏛️ Government Energy Schemes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SchemeCard name="PM-KUSUM" desc="Solar pump & grid-connected solar for farmers — 60% subsidy" />
          <SchemeCard name="UJALA Scheme" desc="LED bulbs at ₹70-80 each — replaced 370 Cr+ bulbs nationwide" />
          <SchemeCard name="Rooftop Solar Subsidy" desc="Up to 40% subsidy for 1-3kW and 20% for 3-10kW rooftop solar" />
          <SchemeCard name="BEE Star Labeling" desc="Mandatory energy efficiency labels on 28+ appliance categories" />
          <SchemeCard name="National Smart Grid Mission" desc="Smart meters & grid modernization across India" />
          <SchemeCard name="PAT Scheme" desc="Perform, Achieve & Trade — energy efficiency certificates for industry" />
        </div>
      </div>
    </div>
  );
}

function QuickLink({ title, desc, icon, onClick, color }: { title: string; desc: string; icon: React.ReactNode; onClick: () => void; color: string }) {
  return (
    <button onClick={onClick} className="glass-card rounded-lg p-5 text-left hover:shadow-xl transition-shadow group">
      <div className={`inline-flex p-3 rounded-lg ${color} mb-3`}>{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      <span className="text-xs text-primary font-medium mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        Open <ArrowRight className="h-3 w-3" />
      </span>
    </button>
  );
}

function SchemeCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="p-3 rounded-lg bg-muted/50 border border-border/40">
      <p className="font-semibold text-sm">{name}</p>
      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
    </div>
  );
}

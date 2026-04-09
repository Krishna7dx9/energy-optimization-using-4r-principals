import { Leaf, Zap, RefreshCw, Recycle, Sun, Target, Shield, Globe } from "lucide-react";

export default function About() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">ℹ️ About This Project</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Home Energy Optimization System — A national-level solution for Indian households.
        </p>
      </div>

      {/* Mission */}
      <div className="gradient-energy rounded-2xl p-8 text-primary-foreground mb-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2"><Target className="h-6 w-6" /> Our Mission</h2>
        <p className="text-sm opacity-90 max-w-2xl">
          To empower every Indian household with data-driven energy optimization tools — completely free. We aim to contribute to India's 
          goal of reducing energy intensity by 45% by 2030 and achieving net-zero emissions by 2070, as committed at COP26.
        </p>
      </div>

      {/* 4R Framework */}
      <div className="glass-card rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">🔄 The 4R Framework</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FrameworkCard
            icon={<Zap className="h-6 w-6" />}
            title="Reduce"
            desc="Cut unnecessary energy consumption by identifying wasteful patterns — like reducing AC usage by 1 hour or switching off standby appliances."
            color="bg-energy-green-light text-energy-green"
          />
          <FrameworkCard
            icon={<RefreshCw className="h-6 w-6" />}
            title="Reuse"
            desc="Shift flexible appliance usage from peak to off-peak hours — like running washing machines early morning or late night."
            color="bg-energy-blue-light text-energy-blue"
          />
          <FrameworkCard
            icon={<Recycle className="h-6 w-6" />}
            title="Recycle"
            desc="Replace high-consumption appliances with energy-efficient alternatives — like switching from regular fans to BLDC fans or upgrading to 5-star ACs."
            color="bg-energy-amber-light text-energy-amber"
          />
          <FrameworkCard
            icon={<Sun className="h-6 w-6" />}
            title="Recover"
            desc="Generate your own energy through rooftop solar panels, solar water heaters, and net metering — with government subsidies up to 40%."
            color="bg-energy-red-light text-energy-purple"
          />
        </div>
      </div>

      {/* How It Works */}
      <div className="glass-card rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">⚙️ How It Works</h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "Input Your Appliances", desc: "Add each appliance with its power rating (watts), daily usage hours, operating time window, and whether it's fixed or flexible." },
            { step: "2", title: "Set Tariff & Peak Hours", desc: "Select your state to auto-fill tariff slabs, or enter custom rates. Define peak hours for your electricity provider." },
            { step: "3", title: "Analysis Engine Runs", desc: "Our engine calculates: per-appliance energy (kWh = W × h ÷ 1000), builds a 24-hour load profile, identifies peak usage patterns, and computes slab-based costs." },
            { step: "4", title: "4R Optimization", desc: "The optimizer applies Reduce (cut top consumer usage), Reuse (shift flexible loads), Recycle (flag inefficient appliances), and Recover (solar estimation)." },
            { step: "5", title: "Actionable Results", desc: "Get a complete before/after comparison with exact savings in ₹, personalized recommendations, and an optimized 24-hour load profile." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-energy text-primary-foreground flex items-center justify-center font-bold text-sm">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Details */}
      <div className="glass-card rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">🔬 Technical Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Data Sources</h3>
            <ul className="space-y-1 text-muted-foreground text-xs">
              <li>• State tariffs from official SERC/DISCOM websites (2024-25)</li>
              <li>• Appliance ratings from BEE star label database</li>
              <li>• Solar data from MNRE & ISRO solar radiation atlas</li>
              <li>• Peak hour data from respective state load dispatch centres</li>
              <li>• Government scheme data from official ministry portals</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Calculation Methods</h3>
            <ul className="space-y-1 text-muted-foreground text-xs">
              <li>• Energy: E(kWh) = P(W) × t(h) ÷ 1000</li>
              <li>• Load Profile: 24-bin hourly distribution</li>
              <li>• Cost: Slab-wise tariff with peak multiplier (1.5×)</li>
              <li>• Peak Detection: 85th percentile threshold</li>
              <li>• Solar Estimation: Based on avg 5.5 peak sun hours</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">✨ Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Feature icon={<Globe className="h-5 w-5" />} title="Pan-India Coverage" desc="Tariffs for all 28 states and 8 union territories" />
          <Feature icon={<Zap className="h-5 w-5" />} title="Real Calculations" desc="No dummy values — accurate physics-based formulas" />
          <Feature icon={<Shield className="h-5 w-5" />} title="100% Free & Private" desc="No login, no data collection, runs entirely in your browser" />
          <Feature icon={<Leaf className="h-5 w-5" />} title="4R Optimization" desc="Reduce, Reuse, Recycle, Recover — actionable recommendations" />
          <Feature icon={<Sun className="h-5 w-5" />} title="Solar Estimation" desc="ROI calculation with government subsidy information" />
          <Feature icon={<Recycle className="h-5 w-5" />} title="BEE Star Guide" desc="50+ appliances with star ratings and efficiency tips" />
        </div>
      </div>
    </div>
  );
}

function FrameworkCard({ icon, title, desc, color }: { icon: React.ReactNode; title: string; desc: string; color: string }) {
  return (
    <div className="p-4 rounded-lg border border-border/40 bg-muted/20">
      <div className={`inline-flex p-2 rounded-lg ${color} mb-2`}>{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
      <div className="text-primary mb-1">{icon}</div>
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}

import { Sun, Thermometer, Lightbulb, Droplets, Plug, Clock, Home, Leaf } from "lucide-react";

const SECTIONS = [
  {
    title: "🔴 Reduce — Cut Unnecessary Usage",
    icon: <Thermometer className="h-5 w-5" />,
    color: "border-energy-green",
    tips: [
      { tip: "Set AC to 24°C", detail: "Each degree below 24°C increases energy consumption by 6%. At 24°C, a 1.5T AC uses ~1.2 kW vs 1.6 kW at 20°C.", savings: "₹500-800/month" },
      { tip: "Switch off appliances at main switch", detail: "Standby power (vampire load) of TV, set-top box, chargers etc. can total 50-100W continuously.", savings: "₹100-200/month" },
      { tip: "Use natural light during daytime", detail: "Open curtains and use north-facing windows. Reduces lighting energy by 50% during daytime hours.", savings: "₹50-100/month" },
      { tip: "Reduce geyser thermostat to 50°C", detail: "Factory default is often 60-70°C. Water at 50°C is comfortable and uses 15% less energy.", savings: "₹200-400/month" },
      { tip: "Use pressure cooker for cooking", detail: "Pressure cooking uses 70% less energy than open pot cooking. LPG savings translate to ₹200+/month.", savings: "₹200-300/month" },
      { tip: "Limit fridge door openings", detail: "Each door opening lets cold air escape, making the compressor work harder. Organize items to find things quickly.", savings: "₹50-100/month" },
    ],
  },
  {
    title: "🔵 Reuse — Shift Usage to Off-Peak",
    icon: <Clock className="h-5 w-5" />,
    color: "border-energy-blue",
    tips: [
      { tip: "Run washing machine before 6 PM or after 10 PM", detail: "Peak hours (6-10 PM) have 50% higher tariff in most states. Shifting 500W for 1.5h saves significantly.", savings: "₹150-250/month" },
      { tip: "Charge devices overnight", detail: "Electricity is cheapest during 11 PM - 6 AM. Charge laptops, phones, and power banks during this time.", savings: "₹30-50/month" },
      { tip: "Use iron in batches during off-peak", detail: "Iron all clothes at once instead of daily. Reheating the iron wastes 30% energy. Do it during off-peak.", savings: "₹100-150/month" },
      { tip: "Pre-cool rooms before peak hours", detail: "Run AC at 22°C from 4-6 PM, then set to 26°C during peak. The room stays cool longer.", savings: "₹200-400/month" },
      { tip: "Schedule water heater with timer", detail: "Install a ₹300 timer switch on your geyser. Heat water only when needed, never leave it on.", savings: "₹300-500/month" },
    ],
  },
  {
    title: "🟡 Recycle — Upgrade to Efficient Appliances",
    icon: <Lightbulb className="h-5 w-5" />,
    color: "border-energy-amber",
    tips: [
      { tip: "Replace regular fans with BLDC fans", detail: "BLDC fans consume 28-35W vs 75W for regular fans. With 4-5 fans running 16h/day, annual savings are huge.", savings: "₹3,000-5,000/year" },
      { tip: "Switch to LED lighting everywhere", detail: "9W LED = 60W incandescent = 15W CFL. LEDs last 25,000 hours (10+ years). Buy from UJALA at ₹70.", savings: "₹400/bulb/year" },
      { tip: "Upgrade to 5-star refrigerator", detail: "A 5-star 260L fridge uses 110W vs 160W for 3-star. Running 24/7, the difference is 438 kWh/year.", savings: "₹2,000-3,000/year" },
      { tip: "Replace old AC with inverter AC", detail: "Inverter ACs adjust compressor speed — no on/off cycles. A 5-star inverter 1.5T AC saves 30-40% vs non-inverter.", savings: "₹3,000-6,000/year" },
      { tip: "Use induction cooktop over electric coil", detail: "Induction is 85-90% efficient vs 40% for resistance coils. Faster cooking, lower bills.", savings: "₹500-800/year" },
    ],
  },
  {
    title: "🟢 Recover — Generate Your Own Energy",
    icon: <Sun className="h-5 w-5" />,
    color: "border-primary",
    tips: [
      { tip: "Install rooftop solar panels", detail: "A 3kW system costs ₹1.5-2L after 40% govt subsidy (PM Surya Ghar). Generates ~400 units/month. Payback in 3-4 years.", savings: "₹2,000-3,500/month" },
      { tip: "Use solar water heater", detail: "100L solar water heater costs ₹15,000-25,000. Eliminates electric geyser usage for 8-9 months/year.", savings: "₹500-800/month" },
      { tip: "Install solar-powered garden/security lights", detail: "Solar LED lights for outdoor areas cost ₹500-2,000 each. Zero running cost, auto on/off.", savings: "₹100-200/month" },
      { tip: "Consider net metering", detail: "Export excess solar power to grid and get credits on your bill. Available in all Indian states.", savings: "₹500-2,000/month" },
      { tip: "Explore PM Surya Ghar Yojana", detail: "Government provides ₹30,000 subsidy for 1kW, ₹60,000 for 2kW, ₹78,000 for 3kW+ rooftop solar.", savings: "Lifetime savings: ₹5-10 Lakh" },
    ],
  },
];

export default function Tips() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">📘 Energy Saving Guide</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Comprehensive 4R-based energy optimization guide for Indian households — with real savings estimates based on average Indian tariffs.
        </p>
      </div>

      {/* India Average Context */}
      <div className="glass-card rounded-lg p-5 mb-6 border-l-4 border-primary">
        <h2 className="font-semibold mb-2 flex items-center gap-2"><Home className="h-5 w-5 text-primary" /> Average Indian Household</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div><span className="text-muted-foreground">Avg Monthly Bill:</span> <span className="font-bold">₹1,200-2,500</span></div>
          <div><span className="text-muted-foreground">Avg Units:</span> <span className="font-bold">150-300 kWh</span></div>
          <div><span className="text-muted-foreground">Potential Savings:</span> <span className="font-bold text-energy-green">20-40%</span></div>
          <div><span className="text-muted-foreground">Peak Hours:</span> <span className="font-bold">6 PM - 10 PM</span></div>
        </div>
      </div>

      {/* 4R Sections */}
      <div className="space-y-6">
        {SECTIONS.map((section, si) => (
          <div key={si} className={`glass-card rounded-lg p-6 border-l-4 ${section.color}`}>
            <h2 className="font-semibold text-lg mb-4">{section.title}</h2>
            <div className="space-y-3">
              {section.tips.map((tip, ti) => (
                <div key={ti} className="p-4 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{tip.tip}</p>
                      <p className="text-xs text-muted-foreground mt-1">{tip.detail}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-energy-green bg-energy-green-light px-2 py-1 rounded-full whitespace-nowrap">
                      {tip.savings}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* BEE Star Rating Guide */}
      <div className="glass-card rounded-lg p-6 mt-6">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Leaf className="h-5 w-5 text-energy-green" /> BEE Star Rating Guide
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Bureau of Energy Efficiency (BEE) star labels are mandatory on ACs, refrigerators, geysers, fans, TVs, washing machines, and more. Higher stars = lower running cost.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className={`text-center p-3 rounded-lg ${star >= 4 ? "bg-energy-green-light" : star >= 3 ? "bg-energy-amber-light" : "bg-energy-red-light"}`}>
              <div className="flex justify-center gap-0.5 mb-1">
                {Array.from({ length: star }).map((_, i) => (
                  <span key={i} className="text-energy-amber">★</span>
                ))}
              </div>
              <p className="text-xs font-semibold">
                {star === 1 && "Least Efficient"}
                {star === 2 && "Below Average"}
                {star === 3 && "Average"}
                {star === 4 && "Good"}
                {star === 5 && "Most Efficient"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {star === 1 && "~45% more cost"}
                {star === 2 && "~30% more cost"}
                {star === 3 && "Baseline"}
                {star === 4 && "~15% savings"}
                {star === 5 && "~30% savings"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

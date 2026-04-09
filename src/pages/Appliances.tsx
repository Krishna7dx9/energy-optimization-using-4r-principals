import { useState } from "react";
import { APPLIANCE_DATABASE, CATEGORIES } from "@/lib/applianceDatabase";
import { Input } from "@/components/ui/input";
import { Search, Star, Zap, Lightbulb } from "lucide-react";

export default function Appliances() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = APPLIANCE_DATABASE.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || a.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">📦 Appliance Database</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {APPLIANCE_DATABASE.length}+ common Indian household appliances with real power ratings, BEE star labels & energy-saving tips.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search appliances..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                category === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((a, i) => (
          <div key={i} className="glass-card rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm">{a.name}</h3>
              {a.starRating && (
                <div className="flex items-center gap-0.5 bg-energy-green-light text-energy-green px-2 py-0.5 rounded-full">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-xs font-bold">{a.starRating}</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{a.category}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-energy-amber-light text-energy-amber font-mono">
                <Zap className="h-3 w-3 inline mr-0.5" />{a.power}W
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-energy-blue-light text-energy-blue">{a.typicalHours}h/day</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${a.type === "fixed" ? "bg-energy-red-light text-energy-red" : "bg-energy-green-light text-energy-green"}`}>
                {a.type}
              </span>
            </div>
            <div className="text-xs space-y-1">
              <p className="font-mono text-muted-foreground">
                Daily: {((a.power * a.typicalHours) / 1000).toFixed(2)} kWh • Monthly: {((a.power * a.typicalHours * 30) / 1000).toFixed(1)} kWh
              </p>
            </div>
            <div className="mt-3 p-2 rounded-md bg-energy-amber-light/50 border border-energy-amber/10">
              <p className="text-xs text-muted-foreground flex items-start gap-1">
                <Lightbulb className="h-3 w-3 text-energy-amber mt-0.5 shrink-0" /> {a.tip}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No appliances found matching your search.</p>
        </div>
      )}
    </div>
  );
}

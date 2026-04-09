import { useState } from "react";
import { INDIAN_TARIFFS, calculateSlabBill } from "@/lib/indianTariffs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin, IndianRupee } from "lucide-react";

export default function Tariffs() {
  const [search, setSearch] = useState("");
  const [units, setUnits] = useState(200);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const filtered = INDIAN_TARIFFS.filter((t) =>
    t.state.toLowerCase().includes(search.toLowerCase()) || t.code.toLowerCase().includes(search.toLowerCase())
  );

  const selectedTariff = selectedState ? INDIAN_TARIFFS.find((t) => t.state === selectedState) : null;
  const bill = selectedTariff ? calculateSlabBill(selectedState!, units) : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">🗺️ State Electricity Tariffs</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real domestic electricity tariff slabs for all {INDIAN_TARIFFS.length} Indian states & union territories. Select a state to calculate your bill.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* State List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search state..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((t) => (
              <button
                key={t.code}
                onClick={() => setSelectedState(t.state)}
                className={`glass-card rounded-lg p-4 text-left hover:shadow-lg transition-all ${
                  selectedState === t.state ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm">{t.state}</h3>
                  <span className="text-xs text-muted-foreground ml-auto">{t.code}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2 truncate">{t.utility}</p>
                <div className="grid grid-cols-4 gap-1 text-xs">
                  <div className="text-center p-1 bg-energy-green-light rounded">
                    <p className="text-muted-foreground">S1</p>
                    <p className="font-mono font-bold text-energy-green">₹{t.slab1.rate}</p>
                  </div>
                  <div className="text-center p-1 bg-energy-blue-light rounded">
                    <p className="text-muted-foreground">S2</p>
                    <p className="font-mono font-bold text-energy-blue">₹{t.slab2.rate}</p>
                  </div>
                  <div className="text-center p-1 bg-energy-amber-light rounded">
                    <p className="text-muted-foreground">S3</p>
                    <p className="font-mono font-bold text-energy-amber">₹{t.slab3.rate}</p>
                  </div>
                  <div className="text-center p-1 bg-energy-red-light rounded">
                    <p className="text-muted-foreground">S4</p>
                    <p className="font-mono font-bold text-energy-red">₹{t.slab4.rate}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Peak: {t.peakStart}:00–{t.peakEnd}:00 • Fixed: ₹{t.fixedCharge}/mo</p>
              </button>
            ))}
          </div>
        </div>

        {/* Bill Calculator */}
        <div className="space-y-4">
          <div className="glass-card rounded-lg p-6 sticky top-4">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-energy-amber" /> Bill Calculator
            </h2>
            
            {selectedTariff ? (
              <>
                <p className="text-sm font-medium mb-3">{selectedTariff.state}</p>
                <div className="mb-4">
                  <Label>Monthly Units (kWh)</Label>
                  <Input type="number" value={units} onChange={(e) => setUnits(Number(e.target.value))} min={0} />
                </div>

                {bill && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      {bill.breakdown.map((b, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{b.slab} units × ₹{b.rate}</span>
                          <span className="font-mono">₹{b.amount.toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm border-t pt-2">
                        <span className="text-muted-foreground">Fixed Charge</span>
                        <span className="font-mono">₹{selectedTariff.fixedCharge}</span>
                      </div>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-3">
                      <span>Total Bill</span>
                      <span className="text-primary font-mono">₹{bill.total}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Effective rate: ₹{(bill.total / Math.max(units, 1)).toFixed(2)}/kWh
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Select a state from the list to calculate your electricity bill.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

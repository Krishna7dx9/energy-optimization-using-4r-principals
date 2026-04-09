import { useState } from "react";
import InputForm from "@/components/InputForm";
import ResultsDashboard from "@/components/ResultsDashboard";
import { analyzeEnergy, Appliance, AnalysisResult } from "@/lib/energyEngine";
import { Leaf } from "lucide-react";

export default function Index() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = (appliances: Appliance[], tariff: number, peakStart: number, peakEnd: number) => {
    const res = analyzeEnergy({ appliances, tariff, peakStart, peakEnd });
    setResult(res);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-energy px-6 py-8 text-primary-foreground">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="h-8 w-8" />
            <h1 className="text-2xl font-bold tracking-tight">Home Energy Optimization</h1>
          </div>
          <p className="text-sm opacity-90">
            Analyze usage, reduce costs & optimize with 4R principles — Reduce, Reuse, Recycle, Recover
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {result ? (
          <ResultsDashboard result={result} onBack={() => setResult(null)} />
        ) : (
          <InputForm onAnalyze={handleAnalyze} />
        )}
      </main>
    </div>
  );
}

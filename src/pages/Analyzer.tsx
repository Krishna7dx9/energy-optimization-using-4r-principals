import { useState } from "react";
import InputForm from "@/components/InputForm";
import ResultsDashboard from "@/components/ResultsDashboard";
import { analyzeEnergy, Appliance, AnalysisResult } from "@/lib/energyEngine";

export default function Analyzer() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = (appliances: Appliance[], tariff: number, peakStart: number, peakEnd: number) => {
    const res = analyzeEnergy({ appliances, tariff, peakStart, peakEnd });
    setResult(res);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">⚡ Energy Analyzer</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add your appliances, set your tariff & peak hours, and get personalized optimization results.
        </p>
      </div>
      {result ? (
        <ResultsDashboard result={result} onBack={() => setResult(null)} />
      ) : (
        <InputForm onAnalyze={handleAnalyze} />
      )}
    </div>
  );
}

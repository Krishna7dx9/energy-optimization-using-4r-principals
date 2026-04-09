// Types
export interface Appliance {
  id: string;
  name: string;
  power: number; // watts
  usageHours: number;
  startHour: number;
  endHour: number;
  type: "fixed" | "flexible";
}

export interface AnalysisInput {
  appliances: Appliance[];
  tariff: number; // ₹ per kWh
  peakStart: number;
  peakEnd: number;
}

export interface Recommendation {
  action: string;
  reason: string;
  savingsRupees: number;
  savingsPercent: number;
  category: "Reduce" | "Reuse" | "Recycle" | "Recover";
}

export interface AnalysisResult {
  totalEnergy: number; // kWh
  monthlyEnergy: number;
  cost: number;
  monthlyCost: number;
  loadProfile: number[]; // 24 hours
  applianceEnergy: { name: string; energy: number }[];
  peakHours: number[];
  peakLoad: number;
  recommendations: Recommendation[];
  optimizedLoadProfile: number[];
  optimizedEnergy: number;
  optimizedCost: number;
  optimizedPeakLoad: number;
  savingsRupees: number;
  savingsPercent: number;
}

function getActiveHours(startHour: number, endHour: number): number[] {
  const hours: number[] = [];
  if (startHour <= endHour) {
    for (let h = startHour; h < endHour && h < 24; h++) hours.push(h);
  } else {
    for (let h = startHour; h < 24; h++) hours.push(h);
    for (let h = 0; h < endHour; h++) hours.push(h);
  }
  return hours;
}

function buildLoadProfile(appliances: Appliance[]): number[] {
  const profile = new Array(24).fill(0);
  for (const a of appliances) {
    const powerKw = a.power / 1000;
    const activeHours = getActiveHours(a.startHour, a.endHour);
    // Only fill up to usageHours within the active window
    const hoursToFill = Math.min(a.usageHours, activeHours.length);
    for (let i = 0; i < hoursToFill; i++) {
      profile[activeHours[i]] += powerKw;
    }
  }
  return profile;
}

function calcCost(profile: number[], tariff: number, peakStart: number, peakEnd: number): number {
  let cost = 0;
  for (let h = 0; h < 24; h++) {
    const isPeak = isPeakHour(h, peakStart, peakEnd);
    cost += profile[h] * tariff * (isPeak ? 1.5 : 1);
  }
  return cost;
}

function isPeakHour(h: number, peakStart: number, peakEnd: number): boolean {
  return peakStart <= peakEnd
    ? h >= peakStart && h < peakEnd
    : h >= peakStart || h < peakEnd;
}

function findPeakHours(profile: number[]): number[] {
  const max = Math.max(...profile);
  if (max === 0) return [];
  const threshold = max * 0.85;
  return profile.map((v, i) => (v >= threshold ? i : -1)).filter((i) => i >= 0);
}

export function analyzeEnergy(input: AnalysisInput): AnalysisResult {
  const { appliances, tariff, peakStart, peakEnd } = input;

  if (appliances.length === 0) {
    return {
      totalEnergy: 0, monthlyEnergy: 0, cost: 0, monthlyCost: 0,
      loadProfile: new Array(24).fill(0), applianceEnergy: [],
      peakHours: [], peakLoad: 0, recommendations: [],
      optimizedLoadProfile: new Array(24).fill(0),
      optimizedEnergy: 0, optimizedCost: 0, optimizedPeakLoad: 0,
      savingsRupees: 0, savingsPercent: 0,
    };
  }

  // Per-appliance energy
  const applianceEnergy = appliances.map((a) => ({
    name: a.name,
    energy: Math.round((a.power * a.usageHours) / 1000 * 100) / 100,
  }));

  const totalEnergy = applianceEnergy.reduce((s, a) => s + a.energy, 0);
  const loadProfile = buildLoadProfile(appliances);
  const cost = calcCost(loadProfile, tariff, peakStart, peakEnd);
  const peakHours = findPeakHours(loadProfile);
  const peakLoad = Math.max(...loadProfile);

  // --- Optimization: create deep copy ---
  const optimizedAppliances: Appliance[] = appliances.map((a) => ({ ...a }));
  const recommendations: Recommendation[] = [];

  // 1. REDUCE: shrink endHour for the highest consumer (if usageHours > 2)
  const sorted = [...optimizedAppliances].sort((a, b) => b.power * b.usageHours - a.power * a.usageHours);
  const topConsumer = sorted[0];
  if (topConsumer && topConsumer.usageHours > 2) {
    const savedEnergy = topConsumer.power / 1000;
    const savedCost = savedEnergy * tariff * 1.25;
    recommendations.push({
      action: `Reduce ${topConsumer.name} usage by 1 hour/day`,
      reason: `${topConsumer.name} is your highest energy consumer at ${((topConsumer.power * topConsumer.usageHours) / 1000).toFixed(2)} kWh/day`,
      savingsRupees: Math.round(savedCost * 30),
      savingsPercent: totalEnergy > 0 ? Math.round((savedEnergy / totalEnergy) * 100) : 0,
      category: "Reduce",
    });
    const idx = optimizedAppliances.findIndex((a) => a.id === topConsumer.id);
    if (idx >= 0) {
      optimizedAppliances[idx].usageHours -= 1;
      // Also shrink the time window so buildLoadProfile reflects the change
      const activeLen = getActiveHours(optimizedAppliances[idx].startHour, optimizedAppliances[idx].endHour).length;
      if (activeLen > optimizedAppliances[idx].usageHours && optimizedAppliances[idx].endHour > optimizedAppliances[idx].startHour) {
        optimizedAppliances[idx].endHour = optimizedAppliances[idx].startHour + optimizedAppliances[idx].usageHours;
      }
    }
  }

  // 2. REUSE (shift): move flexible appliances out of peak
  const flexInPeak = optimizedAppliances.filter(
    (a) => a.type === "flexible" && isPeakHour(a.startHour, peakStart, peakEnd)
  );
  if (flexInPeak.length > 0) {
    const best = [...flexInPeak].sort((a, b) => b.power - a.power)[0];
    const duration = best.endHour > best.startHour
      ? best.endHour - best.startHour
      : 24 - best.startHour + best.endHour;
    const newStart = peakEnd;
    const newEnd = (newStart + duration) % 24;
    const savedCost = (best.power / 1000) * duration * tariff * 0.5;
    recommendations.push({
      action: `Shift ${best.name} to ${newStart}:00–${newEnd || 24}:00 (off-peak)`,
      reason: `Running ${best.name} during peak hours costs 50% more`,
      savingsRupees: Math.round(savedCost * 30),
      savingsPercent: cost > 0 ? Math.round((savedCost / (cost / 30)) * 100) : 0,
      category: "Reuse",
    });
    const idx = optimizedAppliances.findIndex((a) => a.id === best.id);
    if (idx >= 0) {
      optimizedAppliances[idx].startHour = newStart;
      optimizedAppliances[idx].endHour = newEnd || 24;
    }
  }

  // 3. RECYCLE: flag appliances with very high wattage
  const highPower = sorted.find((a) => a.power >= 1500);
  if (highPower) {
    const upgradeSaving = highPower.power * 0.3 / 1000 * highPower.usageHours * tariff;
    recommendations.push({
      action: `Replace ${highPower.name} with an energy-efficient model`,
      reason: `${highPower.name} draws ${highPower.power}W — modern alternatives use ~30% less`,
      savingsRupees: Math.round(upgradeSaving * 30),
      savingsPercent: totalEnergy > 0 ? Math.round(((highPower.power * 0.3 / 1000 * highPower.usageHours) / totalEnergy) * 100) : 0,
      category: "Recycle",
    });
  }

  // 4. RECOVER: solar suggestion
  if (totalEnergy > 3) {
    const solarCoverage = Math.min(totalEnergy * 0.4, 5);
    const solarSaving = solarCoverage * tariff;
    recommendations.push({
      action: `Install a ${Math.ceil(solarCoverage)}kW rooftop solar panel`,
      reason: `Solar can offset ~${Math.round((solarCoverage / totalEnergy) * 100)}% of your daily consumption`,
      savingsRupees: Math.round(solarSaving * 30),
      savingsPercent: totalEnergy > 0 ? Math.round((solarCoverage / totalEnergy) * 100) : 0,
      category: "Recover",
    });
  }

  // Build optimized profile
  const optimizedLoadProfile = buildLoadProfile(optimizedAppliances);
  const optimizedEnergy = optimizedAppliances.reduce((s, a) => s + (a.power * a.usageHours) / 1000, 0);
  const optimizedCost = calcCost(optimizedLoadProfile, tariff, peakStart, peakEnd);
  const optimizedPeakLoad = Math.max(...optimizedLoadProfile);

  return {
    totalEnergy: Math.round(totalEnergy * 100) / 100,
    monthlyEnergy: Math.round(totalEnergy * 30 * 100) / 100,
    cost: Math.round(cost * 100) / 100,
    monthlyCost: Math.round(cost * 30 * 100) / 100,
    loadProfile,
    applianceEnergy,
    peakHours,
    peakLoad: Math.round(peakLoad * 100) / 100,
    recommendations: recommendations.slice(0, 4),
    optimizedLoadProfile,
    optimizedEnergy: Math.round(optimizedEnergy * 100) / 100,
    optimizedCost: Math.round(optimizedCost * 100) / 100,
    optimizedPeakLoad: Math.round(optimizedPeakLoad * 100) / 100,
    savingsRupees: Math.round((cost - optimizedCost) * 30 * 100) / 100,
    savingsPercent: cost > 0 ? Math.round(((cost - optimizedCost) / cost) * 100) : 0,
  };
}

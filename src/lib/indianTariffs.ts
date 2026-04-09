// Real Indian state electricity tariffs (domestic, 2024-25 approx ₹/kWh)
export interface StateTariff {
  state: string;
  code: string;
  utility: string;
  slab1: { limit: number; rate: number }; // 0-100 units
  slab2: { limit: number; rate: number }; // 101-200 units
  slab3: { limit: number; rate: number }; // 201-300 units
  slab4: { rate: number }; // 300+ units
  peakStart: number;
  peakEnd: number;
  fixedCharge: number; // ₹/month
}

export const INDIAN_TARIFFS: StateTariff[] = [
  { state: "Andhra Pradesh", code: "AP", utility: "APSPDCL / APEPDCL", slab1: { limit: 50, rate: 1.9 }, slab2: { limit: 100, rate: 3.05 }, slab3: { limit: 200, rate: 4.5 }, slab4: { rate: 6.0 }, peakStart: 18, peakEnd: 22, fixedCharge: 30 },
  { state: "Bihar", code: "BR", utility: "NBPDCL / SBPDCL", slab1: { limit: 50, rate: 3.75 }, slab2: { limit: 100, rate: 4.35 }, slab3: { limit: 200, rate: 5.6 }, slab4: { rate: 6.2 }, peakStart: 17, peakEnd: 22, fixedCharge: 50 },
  { state: "Chhattisgarh", code: "CG", utility: "CSPDCL", slab1: { limit: 100, rate: 2.5 }, slab2: { limit: 200, rate: 3.7 }, slab3: { limit: 400, rate: 5.0 }, slab4: { rate: 5.8 }, peakStart: 18, peakEnd: 22, fixedCharge: 40 },
  { state: "Delhi", code: "DL", utility: "BSES / TPDDL", slab1: { limit: 200, rate: 3.0 }, slab2: { limit: 400, rate: 4.5 }, slab3: { limit: 800, rate: 6.5 }, slab4: { rate: 7.75 }, peakStart: 14, peakEnd: 17, fixedCharge: 25 },
  { state: "Goa", code: "GA", utility: "Goa Electricity Dept", slab1: { limit: 100, rate: 1.5 }, slab2: { limit: 200, rate: 2.5 }, slab3: { limit: 400, rate: 3.5 }, slab4: { rate: 4.5 }, peakStart: 18, peakEnd: 22, fixedCharge: 30 },
  { state: "Gujarat", code: "GJ", utility: "UGVCL / MGVCL / PGVCL / DGVCL", slab1: { limit: 50, rate: 3.05 }, slab2: { limit: 100, rate: 3.5 }, slab3: { limit: 200, rate: 4.0 }, slab4: { rate: 5.2 }, peakStart: 18, peakEnd: 22, fixedCharge: 35 },
  { state: "Haryana", code: "HR", utility: "UHBVNL / DHBVNL", slab1: { limit: 50, rate: 2.0 }, slab2: { limit: 150, rate: 3.8 }, slab3: { limit: 250, rate: 5.0 }, slab4: { rate: 6.5 }, peakStart: 18, peakEnd: 22, fixedCharge: 40 },
  { state: "Himachal Pradesh", code: "HP", utility: "HPSEB", slab1: { limit: 60, rate: 2.3 }, slab2: { limit: 125, rate: 3.55 }, slab3: { limit: 300, rate: 4.65 }, slab4: { rate: 5.4 }, peakStart: 18, peakEnd: 22, fixedCharge: 25 },
  { state: "Jharkhand", code: "JH", utility: "JBVNL", slab1: { limit: 100, rate: 3.2 }, slab2: { limit: 200, rate: 4.6 }, slab3: { limit: 400, rate: 5.4 }, slab4: { rate: 6.0 }, peakStart: 17, peakEnd: 22, fixedCharge: 45 },
  { state: "Karnataka", code: "KA", utility: "BESCOM / MESCOM / HESCOM / GESCOM / CESC", slab1: { limit: 50, rate: 4.1 }, slab2: { limit: 100, rate: 5.55 }, slab3: { limit: 200, rate: 7.1 }, slab4: { rate: 8.15 }, peakStart: 18, peakEnd: 22, fixedCharge: 45 },
  { state: "Kerala", code: "KL", utility: "KSEB", slab1: { limit: 50, rate: 3.15 }, slab2: { limit: 100, rate: 3.7 }, slab3: { limit: 150, rate: 4.8 }, slab4: { rate: 6.4 }, peakStart: 18, peakEnd: 22, fixedCharge: 35 },
  { state: "Madhya Pradesh", code: "MP", utility: "MPPKVVCL", slab1: { limit: 50, rate: 3.7 }, slab2: { limit: 150, rate: 4.9 }, slab3: { limit: 300, rate: 6.2 }, slab4: { rate: 7.2 }, peakStart: 17, peakEnd: 22, fixedCharge: 40 },
  { state: "Maharashtra", code: "MH", utility: "MSEDCL / BEST / TPC / AEML", slab1: { limit: 100, rate: 4.71 }, slab2: { limit: 300, rate: 7.88 }, slab3: { limit: 500, rate: 10.08 }, slab4: { rate: 11.69 }, peakStart: 18, peakEnd: 22, fixedCharge: 100 },
  { state: "Odisha", code: "OD", utility: "TPCODL / TPNODL / TPSODL / TPWODL", slab1: { limit: 50, rate: 3.0 }, slab2: { limit: 200, rate: 4.8 }, slab3: { limit: 400, rate: 5.8 }, slab4: { rate: 6.2 }, peakStart: 17, peakEnd: 21, fixedCharge: 30 },
  { state: "Punjab", code: "PB", utility: "PSPCL", slab1: { limit: 100, rate: 4.19 }, slab2: { limit: 300, rate: 6.81 }, slab3: { limit: 500, rate: 7.31 }, slab4: { rate: 8.0 }, peakStart: 18, peakEnd: 22, fixedCharge: 30 },
  { state: "Rajasthan", code: "RJ", utility: "JDVVNL / AVVNL / JdVVNL", slab1: { limit: 50, rate: 3.85 }, slab2: { limit: 150, rate: 5.45 }, slab3: { limit: 300, rate: 6.2 }, slab4: { rate: 7.0 }, peakStart: 18, peakEnd: 22, fixedCharge: 50 },
  { state: "Tamil Nadu", code: "TN", utility: "TANGEDCO", slab1: { limit: 100, rate: 0 }, slab2: { limit: 200, rate: 2.5 }, slab3: { limit: 500, rate: 4.6 }, slab4: { rate: 6.6 }, peakStart: 18, peakEnd: 22, fixedCharge: 20 },
  { state: "Telangana", code: "TS", utility: "TSSPDCL / TSNPDCL", slab1: { limit: 50, rate: 1.95 }, slab2: { limit: 100, rate: 3.2 }, slab3: { limit: 200, rate: 4.6 }, slab4: { rate: 6.6 }, peakStart: 18, peakEnd: 22, fixedCharge: 30 },
  { state: "Uttar Pradesh", code: "UP", utility: "UPPCL / DVVNL / PVVNL / MVVNL / PuVVNL / KESCO", slab1: { limit: 100, rate: 3.5 }, slab2: { limit: 150, rate: 4.0 }, slab3: { limit: 300, rate: 5.0 }, slab4: { rate: 6.0 }, peakStart: 17, peakEnd: 22, fixedCharge: 50 },
  { state: "Uttarakhand", code: "UK", utility: "UPCL", slab1: { limit: 100, rate: 3.2 }, slab2: { limit: 200, rate: 3.85 }, slab3: { limit: 400, rate: 4.75 }, slab4: { rate: 5.5 }, peakStart: 18, peakEnd: 22, fixedCharge: 40 },
  { state: "West Bengal", code: "WB", utility: "WBSEDCL / CESC", slab1: { limit: 75, rate: 3.58 }, slab2: { limit: 150, rate: 4.73 }, slab3: { limit: 300, rate: 6.16 }, slab4: { rate: 6.94 }, peakStart: 17, peakEnd: 21, fixedCharge: 35 },
  { state: "Assam", code: "AS", utility: "APDCL", slab1: { limit: 100, rate: 4.25 }, slab2: { limit: 200, rate: 5.35 }, slab3: { limit: 300, rate: 5.9 }, slab4: { rate: 7.2 }, peakStart: 17, peakEnd: 22, fixedCharge: 40 },
  { state: "Meghalaya", code: "ML", utility: "MeSEB", slab1: { limit: 100, rate: 3.6 }, slab2: { limit: 200, rate: 4.1 }, slab3: { limit: 300, rate: 4.6 }, slab4: { rate: 5.5 }, peakStart: 17, peakEnd: 22, fixedCharge: 30 },
  { state: "Tripura", code: "TR", utility: "TSECL", slab1: { limit: 50, rate: 3.6 }, slab2: { limit: 100, rate: 5.1 }, slab3: { limit: 200, rate: 6.5 }, slab4: { rate: 7.0 }, peakStart: 18, peakEnd: 22, fixedCharge: 25 },
  { state: "Manipur", code: "MN", utility: "MSPCL", slab1: { limit: 100, rate: 3.8 }, slab2: { limit: 200, rate: 4.5 }, slab3: { limit: 300, rate: 5.5 }, slab4: { rate: 6.5 }, peakStart: 17, peakEnd: 22, fixedCharge: 30 },
  { state: "Nagaland", code: "NL", utility: "DoP Nagaland", slab1: { limit: 100, rate: 3.5 }, slab2: { limit: 200, rate: 4.5 }, slab3: { limit: 300, rate: 5.2 }, slab4: { rate: 6.0 }, peakStart: 17, peakEnd: 21, fixedCharge: 30 },
  { state: "Mizoram", code: "MZ", utility: "P&E Dept Mizoram", slab1: { limit: 100, rate: 4.0 }, slab2: { limit: 200, rate: 5.0 }, slab3: { limit: 300, rate: 5.5 }, slab4: { rate: 6.0 }, peakStart: 17, peakEnd: 21, fixedCharge: 25 },
  { state: "Arunachal Pradesh", code: "AR", utility: "DoP Arunachal Pradesh", slab1: { limit: 100, rate: 2.5 }, slab2: { limit: 200, rate: 3.5 }, slab3: { limit: 300, rate: 4.5 }, slab4: { rate: 5.5 }, peakStart: 17, peakEnd: 21, fixedCharge: 20 },
  { state: "Sikkim", code: "SK", utility: "Energy & Power Dept Sikkim", slab1: { limit: 100, rate: 2.0 }, slab2: { limit: 200, rate: 3.0 }, slab3: { limit: 300, rate: 4.0 }, slab4: { rate: 5.0 }, peakStart: 17, peakEnd: 21, fixedCharge: 20 },
  { state: "Jammu & Kashmir", code: "JK", utility: "JKPDD", slab1: { limit: 100, rate: 1.37 }, slab2: { limit: 200, rate: 1.87 }, slab3: { limit: 400, rate: 2.47 }, slab4: { rate: 3.52 }, peakStart: 18, peakEnd: 22, fixedCharge: 20 },
  { state: "Ladakh", code: "LA", utility: "Ladakh Power Dev Dept", slab1: { limit: 100, rate: 1.5 }, slab2: { limit: 200, rate: 2.0 }, slab3: { limit: 300, rate: 2.5 }, slab4: { rate: 3.5 }, peakStart: 18, peakEnd: 22, fixedCharge: 15 },
  { state: "Puducherry", code: "PY", utility: "Puducherry Electricity Dept", slab1: { limit: 100, rate: 1.6 }, slab2: { limit: 200, rate: 2.75 }, slab3: { limit: 300, rate: 4.3 }, slab4: { rate: 5.0 }, peakStart: 18, peakEnd: 22, fixedCharge: 20 },
  { state: "Chandigarh", code: "CH", utility: "Chandigarh Electricity Dept", slab1: { limit: 150, rate: 2.0 }, slab2: { limit: 400, rate: 3.2 }, slab3: { limit: 800, rate: 4.4 }, slab4: { rate: 5.0 }, peakStart: 18, peakEnd: 22, fixedCharge: 30 },
];

export function getEffectiveTariff(state: string, monthlyUnits: number): number {
  const t = INDIAN_TARIFFS.find((s) => s.state === state);
  if (!t) return 6;
  if (monthlyUnits <= t.slab1.limit) return t.slab1.rate;
  if (monthlyUnits <= t.slab1.limit + t.slab2.limit) return t.slab2.rate;
  if (monthlyUnits <= t.slab1.limit + t.slab2.limit + t.slab3.limit) return t.slab3.rate;
  return t.slab4.rate;
}

export function calculateSlabBill(state: string, monthlyUnits: number): { total: number; breakdown: { slab: string; units: number; rate: number; amount: number }[] } {
  const t = INDIAN_TARIFFS.find((s) => s.state === state);
  if (!t) return { total: monthlyUnits * 6, breakdown: [{ slab: "Flat", units: monthlyUnits, rate: 6, amount: monthlyUnits * 6 }] };

  let remaining = monthlyUnits;
  const breakdown: { slab: string; units: number; rate: number; amount: number }[] = [];

  const s1Units = Math.min(remaining, t.slab1.limit);
  if (s1Units > 0) { breakdown.push({ slab: `0-${t.slab1.limit}`, units: s1Units, rate: t.slab1.rate, amount: s1Units * t.slab1.rate }); remaining -= s1Units; }

  const s2Units = Math.min(remaining, t.slab2.limit);
  if (s2Units > 0) { breakdown.push({ slab: `${t.slab1.limit + 1}-${t.slab1.limit + t.slab2.limit}`, units: s2Units, rate: t.slab2.rate, amount: s2Units * t.slab2.rate }); remaining -= s2Units; }

  const s3Units = Math.min(remaining, t.slab3.limit);
  if (s3Units > 0) { breakdown.push({ slab: `${t.slab1.limit + t.slab2.limit + 1}-${t.slab1.limit + t.slab2.limit + t.slab3.limit}`, units: s3Units, rate: t.slab3.rate, amount: s3Units * t.slab3.rate }); remaining -= s3Units; }

  if (remaining > 0) { breakdown.push({ slab: `${t.slab1.limit + t.slab2.limit + t.slab3.limit + 1}+`, units: remaining, rate: t.slab4.rate, amount: remaining * t.slab4.rate }); }

  const energyTotal = breakdown.reduce((s, b) => s + b.amount, 0);
  return { total: Math.round((energyTotal + t.fixedCharge) * 100) / 100, breakdown };
}

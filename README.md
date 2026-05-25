# 🇮🇳 Home Energy Optimization System

A comprehensive, free-to-use household energy analysis web app designed for Indian citizens. Analyze your home's electricity consumption, compare state tariffs, and get personalized recommendations powered by the **4R methodology** — Reduce, Reuse, Recycle, Recover.

> Built to help Indian households cut electricity bills, lower carbon footprint, and make informed appliance decisions using real BEE star ratings and actual state DISCOM tariffs.

---

## ✨ Features

- **⚡ Energy Analyzer** — Add your appliances (wattage, usage hours, time-of-day), set your local tariff and peak hours, and instantly get:
  - Daily & monthly kWh consumption
  - Daily & monthly bill estimate (₹)
  - 24-hour load profile (before vs. after optimization)
  - Peak load detection
  - 4R recommendations with rupee savings per month
- **📊 24-Hour Load Profile** — Visual comparison of your current load curve vs. the AI-optimized profile after shifting flexible loads off peak hours.
- **🏠 Appliance Database** — 50+ common Indian household appliances with typical wattages and BEE star rating guidance.
- **🗺️ State Tariff Explorer** — Real domestic electricity slab tariffs for **30+ Indian states & UTs**, including DISCOM names, fixed charges, and peak hour windows.
- **⚖️ Bill Comparison Tool** — Compare your monthly electricity bill across multiple Indian states for the same consumption — see how much you'd pay in Delhi vs. Maharashtra vs. Tamil Nadu, etc.
- **💡 Energy Saving Tips** — Curated, practical tips tailored to Indian homes (BLDC fans, AC at 24°C, LED replacements, pressure cookers, solar water heaters).
- **🏛️ Government Schemes** — Quick reference for PM-KUSUM, UJALA, Rooftop Solar Subsidy, BEE Star Labeling, PAT, and the National Smart Grid Mission.
- **🔐 Authentication** — Secure email-based signup/login with user profiles and persistent session.

---

## 🔄 The 4R Methodology

| Category | What it means | Example Action |
|---|---|---|
| **Reduce** | Cut down on overall consumption | Lower AC runtime by 1 hour/day |
| **Reuse** (Shift) | Move flexible loads out of peak hours | Run washing machine after 10 PM |
| **Recycle** (Upgrade) | Replace inefficient appliances | Swap 1500W geyser for 5-star model |
| **Recover** | Generate your own energy | Install 3 kW rooftop solar |

Each recommendation is paired with a specific rupee savings estimate based on **your** tariff and usage pattern.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript 5**
- **Vite 5** — lightning-fast dev server and build
- **Tailwind CSS v3** + **shadcn/ui** components
- **Recharts** — interactive load profile and bill comparison charts
- **TanStack Query** — data fetching & cache
- **React Router** — multi-page navigation
- **Lucide React** — icons
- **Sonner** — toast notifications

### Backend
- **PostgreSQL** database with Row-Level Security
- **Email/password authentication** with session management
- **Serverless edge functions** (TypeScript/Deno) for custom logic
- **Auto-generated typed client SDK** for type-safe queries

### Data
- Hand-curated tariff data for **30+ Indian states & UTs** (2024–25 slab rates)
- DISCOM mapping (BSES, MSEDCL, TANGEDCO, BESCOM, KSEB, UPPCL, etc.)
- BEE star rating reference for major appliance categories

---

## 📱 Screens

| Route | Screen | Purpose |
|---|---|---|
| `/` | **Dashboard** | India energy facts, tariff snapshot, daily tip, quick links, government schemes |
| `/analyzer` | **Energy Analyzer** | Add appliances → run analysis → see results & 4R recommendations |
| `/appliances` | **Appliance Guide** | Searchable database of common appliances with wattage & BEE info |
| `/tariffs` | **State Tariffs** | Slab-wise tariff explorer + monthly bill calculator |
| `/compare` | **Bill Comparison** | Compare same consumption across multiple states side-by-side |
| `/tips` | **Energy Tips** | Categorized practical saving tips |
| `/about` | **About** | Project mission, 4R methodology, credits |
| `/login` | **Login / Signup** | User authentication |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** (or **Bun**)
- A package manager: `bun`, `npm`, `pnpm`, or `yarn`

### Local Development

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd home-energy-optimization

# 2. Install dependencies
bun install
# or: npm install

# 3. Start the dev server
bun run dev
# or: npm run dev

# 4. Open the app
# Vite will print a local URL (typically http://localhost:5173)
```

### Build for Production

```bash
bun run build
bun run preview   # preview the production build locally
```

### Environment Variables

The project auto-generates a `.env` file with backend connection variables:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
```

> **Do not edit `.env`, `src/integrations/supabase/client.ts`, or `src/integrations/supabase/types.ts` manually** — they are managed automatically.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   ├── AppSidebar.tsx       # Main navigation sidebar
│   ├── InputForm.tsx        # Appliance input form
│   ├── ResultsDashboard.tsx # Analysis results + charts
│   └── NavLink.tsx
├── contexts/
│   └── AuthContext.tsx      # Auth provider & hooks
├── layouts/
│   └── AppLayout.tsx        # Shared layout with sidebar
├── lib/
│   ├── energyEngine.ts      # 4R optimization engine
│   ├── indianTariffs.ts     # 30+ state tariff data + bill calc
│   ├── applianceDatabase.ts # Appliance reference data
│   └── utils.ts
├── pages/                   # Route pages (Dashboard, Analyzer, etc.)
├── integrations/supabase/   # Auto-generated backend client
└── index.css                # Tailwind + design tokens
```

---

## 🧠 How the Optimization Engine Works

`src/lib/energyEngine.ts` runs four passes over your appliance list:

1. **REDUCE** — Identifies your highest energy consumer and suggests reducing its usage by 1 hour/day.
2. **REUSE (Shift)** — Finds flexible appliances running during peak hours and recommends shifting them to off-peak (saving ~50% peak surcharge).
3. **RECYCLE** — Flags appliances ≥ 1500 W and recommends upgrading to a 5-star rated model (~30% saving).
4. **RECOVER** — If daily usage > 3 kWh, recommends a rooftop solar system sized to your consumption.

The engine then rebuilds the 24-hour load profile with the optimizations applied and computes monthly rupee savings using your actual slab tariff and peak hour windows.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome! Open an issue or submit a pull request.

Areas where help is especially appreciated:
- More accurate, up-to-date state tariff data
- Additional regional language support (Hindi, Tamil, Telugu, Bengali, etc.)
- More appliance entries in the database
- Solar ROI calculator with PM Surya Ghar subsidy logic

---

## 📜 License

MIT — free for personal and commercial use.

---

## 🌱 Mission

Make accurate, India-specific home energy analysis available to **every household, for free** — so that families can lower their bills, the grid can handle peak loads better, and the country can move faster toward its renewable energy goals.

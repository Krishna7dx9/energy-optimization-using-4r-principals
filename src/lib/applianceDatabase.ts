// Common Indian household appliances with real-world power ratings
export interface ApplianceTemplate {
  name: string;
  category: string;
  power: number; // watts
  typicalHours: number;
  type: "fixed" | "flexible";
  starRating?: number; // BEE star rating (1-5)
  tip: string;
}

export const APPLIANCE_DATABASE: ApplianceTemplate[] = [
  // Cooling
  { name: "Split AC 1.5 Ton (5-star)", category: "Cooling", power: 1200, typicalHours: 8, type: "flexible", starRating: 5, tip: "Set AC to 24°C — each degree lower increases consumption by 6%" },
  { name: "Split AC 1.5 Ton (3-star)", category: "Cooling", power: 1600, typicalHours: 8, type: "flexible", starRating: 3, tip: "Upgrade to a 5-star AC to save up to 25% energy" },
  { name: "Window AC 1 Ton", category: "Cooling", power: 1200, typicalHours: 8, type: "flexible", starRating: 3, tip: "Clean AC filters monthly for optimal efficiency" },
  { name: "Desert Cooler", category: "Cooling", power: 200, typicalHours: 10, type: "flexible", tip: "Use a cooler instead of AC when humidity is below 50%" },
  { name: "Ceiling Fan", category: "Cooling", power: 75, typicalHours: 16, type: "fixed", starRating: 5, tip: "BLDC fans consume only 28-35W vs 75W for regular fans" },
  { name: "BLDC Ceiling Fan", category: "Cooling", power: 32, typicalHours: 16, type: "fixed", starRating: 5, tip: "BLDC fans save up to 65% energy compared to regular fans" },
  { name: "Table Fan", category: "Cooling", power: 50, typicalHours: 8, type: "flexible", tip: "Use table fans for personal cooling to avoid running AC" },
  { name: "Exhaust Fan", category: "Cooling", power: 40, typicalHours: 4, type: "flexible", tip: "Exhaust fans improve ventilation and reduce AC load" },

  // Kitchen
  { name: "Refrigerator (5-star, 260L)", category: "Kitchen", power: 110, typicalHours: 24, type: "fixed", starRating: 5, tip: "Don't put hot food directly in the fridge — let it cool first" },
  { name: "Refrigerator (3-star, 260L)", category: "Kitchen", power: 160, typicalHours: 24, type: "fixed", starRating: 3, tip: "Maintain 2-3 inch gap behind fridge for proper heat dissipation" },
  { name: "Mixer Grinder", category: "Kitchen", power: 750, typicalHours: 0.5, type: "flexible", tip: "Use appropriate jar size to reduce motor strain" },
  { name: "Microwave Oven", category: "Kitchen", power: 1200, typicalHours: 0.5, type: "flexible", tip: "Microwave uses 80% less energy than conventional oven for reheating" },
  { name: "Electric Kettle", category: "Kitchen", power: 1500, typicalHours: 0.3, type: "flexible", tip: "Boil only the amount of water you need" },
  { name: "Induction Cooktop", category: "Kitchen", power: 1800, typicalHours: 1.5, type: "flexible", tip: "Induction is 85-90% efficient vs 40% for gas stoves" },
  { name: "Water Purifier (RO)", category: "Kitchen", power: 60, typicalHours: 3, type: "fixed", tip: "Regular maintenance improves efficiency and water quality" },
  { name: "Dishwasher", category: "Kitchen", power: 1800, typicalHours: 1.5, type: "flexible", tip: "Run dishwasher only when full to maximize efficiency" },
  { name: "Toaster", category: "Kitchen", power: 800, typicalHours: 0.2, type: "flexible", tip: "Toasters are more efficient than ovens for small jobs" },

  // Laundry
  { name: "Washing Machine (Front Load)", category: "Laundry", power: 500, typicalHours: 1.5, type: "flexible", starRating: 5, tip: "Front load machines use 50% less water and 40% less energy" },
  { name: "Washing Machine (Top Load)", category: "Laundry", power: 400, typicalHours: 1, type: "flexible", starRating: 3, tip: "Always wash full loads to maximize efficiency" },
  { name: "Iron (Steam)", category: "Laundry", power: 1200, typicalHours: 1, type: "flexible", tip: "Iron clothes in bulk — reheating uses extra energy" },
  { name: "Iron (Dry)", category: "Laundry", power: 750, typicalHours: 1, type: "flexible", tip: "Iron in bulk during off-peak hours" },

  // Water Heating
  { name: "Geyser (Storage, 15L)", category: "Water Heating", power: 2000, typicalHours: 1, type: "flexible", starRating: 5, tip: "Set geyser thermostat to 50°C — reduces consumption by 15%" },
  { name: "Geyser (Instant)", category: "Water Heating", power: 3000, typicalHours: 0.5, type: "flexible", tip: "Instant geysers heat only what you need — zero standby loss" },
  { name: "Solar Water Heater (pump)", category: "Water Heating", power: 50, typicalHours: 3, type: "fixed", tip: "Solar water heaters reduce hot water bills by 70-80%" },
  { name: "Immersion Rod", category: "Water Heating", power: 1500, typicalHours: 0.5, type: "flexible", tip: "Always unplug immersion rod after use — serious safety risk" },

  // Entertainment
  { name: "LED TV 43\"", category: "Entertainment", power: 55, typicalHours: 6, type: "flexible", tip: "Reduce brightness and enable eco mode on your TV" },
  { name: "LED TV 55\"", category: "Entertainment", power: 80, typicalHours: 6, type: "flexible", tip: "Smart TVs consume 1-5W on standby — switch off from main" },
  { name: "Set-Top Box", category: "Entertainment", power: 15, typicalHours: 12, type: "fixed", tip: "Set-top boxes consume power even when TV is off" },
  { name: "Gaming Console", category: "Entertainment", power: 120, typicalHours: 3, type: "flexible", tip: "Enable power-saving mode on gaming consoles" },
  { name: "Music System", category: "Entertainment", power: 50, typicalHours: 3, type: "flexible", tip: "Modern bluetooth speakers use just 5-15W" },

  // Lighting
  { name: "LED Bulb (9W)", category: "Lighting", power: 9, typicalHours: 8, type: "fixed", tip: "1 LED bulb replaces a 60W incandescent — 85% savings" },
  { name: "LED Tube Light (18W)", category: "Lighting", power: 18, typicalHours: 8, type: "fixed", tip: "LED tubes save 50% over CFL tubes and last 3x longer" },
  { name: "CFL (15W)", category: "Lighting", power: 15, typicalHours: 8, type: "fixed", tip: "Replace CFLs with LEDs for 40% more savings" },
  { name: "Incandescent Bulb (60W)", category: "Lighting", power: 60, typicalHours: 6, type: "fixed", tip: "Replace immediately with LED — saves ₹400/year per bulb" },

  // IT & Office
  { name: "Desktop Computer", category: "IT & Office", power: 200, typicalHours: 8, type: "flexible", tip: "Enable sleep mode — reduces consumption by 60-70%" },
  { name: "Laptop", category: "IT & Office", power: 50, typicalHours: 8, type: "flexible", tip: "Laptops use 75% less energy than desktops" },
  { name: "WiFi Router", category: "IT & Office", power: 12, typicalHours: 24, type: "fixed", tip: "Modern routers use 6-12W — minimal impact" },
  { name: "Printer (Inkjet)", category: "IT & Office", power: 30, typicalHours: 1, type: "flexible", tip: "Switch off printer when not in use" },
  { name: "Phone Charger", category: "IT & Office", power: 15, typicalHours: 3, type: "flexible", tip: "Unplug chargers when not charging — they draw phantom load" },

  // Others
  { name: "Vacuum Cleaner", category: "Others", power: 1400, typicalHours: 0.5, type: "flexible", tip: "Clean vacuum filters regularly for better suction and efficiency" },
  { name: "Hair Dryer", category: "Others", power: 1200, typicalHours: 0.3, type: "flexible", tip: "Use low heat setting when possible" },
  { name: "Inverter (standby)", category: "Others", power: 30, typicalHours: 24, type: "fixed", tip: "Keep inverter batteries maintained for optimal efficiency" },
  { name: "Water Motor (1HP)", category: "Others", power: 750, typicalHours: 1, type: "flexible", tip: "Install a timer to prevent motor running unnecessarily" },
  { name: "Treadmill", category: "Others", power: 600, typicalHours: 0.5, type: "flexible", tip: "Use during off-peak hours" },
];

export const CATEGORIES = [...new Set(APPLIANCE_DATABASE.map((a) => a.category))];

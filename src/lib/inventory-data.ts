export type InventoryStatus = "En stock" | "A surveiller" | "Rupture";

export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  category: string;
  location: string;
  supplier: string;
  quantity: number;
  reserved: number;
  reorderPoint: number;
  unitCost: number;
  leadTimeDays: number;
  status: InventoryStatus;
  lastUpdated: string;
};

export type StockMovement = {
  id: string;
  date: string;
  sku: string;
  itemName: string;
  type: "Entrée" | "Sortie" | "Transfert";
  quantity: number;
  operator: string;
  note: string;
};

export const inventoryItems: InventoryItem[] = [
  {
    id: "ITM-001",
    sku: "ELC-DRN-22",
    name: "Drone d'inspection ZX-22",
    category: "Electronique",
    location: "Lyon Nord",
    supplier: "AeroParts Europe",
    quantity: 18,
    reserved: 6,
    reorderPoint: 8,
    unitCost: 1190,
    leadTimeDays: 14,
    status: "En stock",
    lastUpdated: "2026-08-08",
  },
  {
    id: "ITM-002",
    sku: "SEC-CAM-4K",
    name: "Camera de securite 4K",
    category: "Securite",
    location: "Paris Est",
    supplier: "VisionCore",
    quantity: 7,
    reserved: 3,
    reorderPoint: 10,
    unitCost: 225,
    leadTimeDays: 9,
    status: "A surveiller",
    lastUpdated: "2026-08-09",
  },
  {
    id: "ITM-003",
    sku: "PKG-BAC-60",
    name: "Bac pliable 60 L",
    category: "Emballage",
    location: "Marseille Port",
    supplier: "PackPro",
    quantity: 220,
    reserved: 42,
    reorderPoint: 75,
    unitCost: 18,
    leadTimeDays: 5,
    status: "En stock",
    lastUpdated: "2026-08-06",
  },
  {
    id: "ITM-004",
    sku: "MRO-FLT-12",
    name: "Filtre industriel F12",
    category: "Maintenance",
    location: "Lille Centre",
    supplier: "NordMeca",
    quantity: 0,
    reserved: 0,
    reorderPoint: 20,
    unitCost: 46,
    leadTimeDays: 11,
    status: "Rupture",
    lastUpdated: "2026-08-10",
  },
  {
    id: "ITM-005",
    sku: "PPE-GLV-N",
    name: "Gants nitrile renforces",
    category: "EPI",
    location: "Paris Est",
    supplier: "SafeWork",
    quantity: 58,
    reserved: 25,
    reorderPoint: 40,
    unitCost: 7,
    leadTimeDays: 4,
    status: "En stock",
    lastUpdated: "2026-08-07",
  },
  {
    id: "ITM-006",
    sku: "ELC-SNS-T9",
    name: "Capteur temperature T9",
    category: "Electronique",
    location: "Lyon Nord",
    supplier: "Sensorix",
    quantity: 13,
    reserved: 5,
    reorderPoint: 15,
    unitCost: 62,
    leadTimeDays: 12,
    status: "A surveiller",
    lastUpdated: "2026-08-11",
  },
  {
    id: "ITM-007",
    sku: "LOG-PAL-EU",
    name: "Palette Europe traitee",
    category: "Logistique",
    location: "Marseille Port",
    supplier: "Bois&Flux",
    quantity: 310,
    reserved: 80,
    reorderPoint: 120,
    unitCost: 14,
    leadTimeDays: 6,
    status: "En stock",
    lastUpdated: "2026-08-05",
  },
  {
    id: "ITM-008",
    sku: "MRO-OIL-H46",
    name: "Huile hydraulique H46",
    category: "Maintenance",
    location: "Lille Centre",
    supplier: "Fluidec",
    quantity: 24,
    reserved: 12,
    reorderPoint: 30,
    unitCost: 39,
    leadTimeDays: 8,
    status: "A surveiller",
    lastUpdated: "2026-08-09",
  },
  {
    id: "ITM-009",
    sku: "SEC-BAD-NFC",
    name: "Badge NFC employe",
    category: "Securite",
    location: "Paris Est",
    supplier: "AccessLab",
    quantity: 145,
    reserved: 18,
    reorderPoint: 50,
    unitCost: 5,
    leadTimeDays: 7,
    status: "En stock",
    lastUpdated: "2026-08-04",
  },
  {
    id: "ITM-010",
    sku: "PKG-TAP-48",
    name: "Ruban adhesif 48 mm",
    category: "Emballage",
    location: "Lyon Nord",
    supplier: "PackPro",
    quantity: 34,
    reserved: 22,
    reorderPoint: 45,
    unitCost: 3,
    leadTimeDays: 3,
    status: "A surveiller",
    lastUpdated: "2026-08-10",
  },
];

export const stockMovements: StockMovement[] = [
  {
    id: "MOV-1401",
    date: "2026-08-11 08:30",
    sku: "ELC-SNS-T9",
    itemName: "Capteur temperature T9",
    type: "Sortie",
    quantity: 8,
    operator: "Nadia",
    note: "Preparation chantier Grenoble",
  },
  {
    id: "MOV-1402",
    date: "2026-08-11 09:15",
    sku: "PKG-BAC-60",
    itemName: "Bac pliable 60 L",
    type: "Entrée",
    quantity: 90,
    operator: "Marc",
    note: "Reception fournisseur PackPro",
  },
  {
    id: "MOV-1403",
    date: "2026-08-10 16:20",
    sku: "MRO-FLT-12",
    itemName: "Filtre industriel F12",
    type: "Sortie",
    quantity: 20,
    operator: "Sofia",
    note: "Maintenance preventive ligne B",
  },
  {
    id: "MOV-1404",
    date: "2026-08-10 11:45",
    sku: "LOG-PAL-EU",
    itemName: "Palette Europe traitee",
    type: "Transfert",
    quantity: 40,
    operator: "Lucas",
    note: "Marseille vers Paris",
  },
];

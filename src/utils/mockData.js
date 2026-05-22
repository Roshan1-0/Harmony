// Echo Dwell Housing Society Operational Mock Database

export const SOCIETY_INFO = {
  name: "Echo Dwell Heights",
  location: "Green Glen Layout, Sector 4",
  towers: ["Tower A", "Tower B", "Tower C", "Tower D"],
  totalUnits: 520,
  occupancyRate: "94.2%",
  activeStaff: 28,
  securityLevel: "Optimal",
}

export const TOWERS_REPORT = [
  { tower: "Tower A", occupied: 120, total: 130, complaints: 3, energy: "1,240 kWh", water: "8,400 L" },
  { tower: "Tower B", occupied: 115, total: 130, complaints: 5, energy: "1,450 kWh", water: "9,100 L" },
  { tower: "Tower C", occupied: 128, total: 130, complaints: 2, energy: "1,120 kWh", water: "7,900 L" },
  { tower: "Tower D", occupied: 112, total: 130, complaints: 6, energy: "1,310 kWh", water: "8,700 L" },
]

export const UTILITY_CONSUMPTION = {
  electricity: [
    { month: "Jan", usage: 4800, solar: 1200 },
    { month: "Feb", usage: 4600, solar: 1350 },
    { month: "Mar", usage: 5200, solar: 1500 },
    { month: "Apr", usage: 5900, solar: 1800 },
    { month: "May", usage: 6800, solar: 2100 },
  ],
  water: [
    { month: "Jan", usage: 38000 },
    { month: "Feb", usage: 36500 },
    { month: "Mar", usage: 39000 },
    { month: "Apr", usage: 42000 },
    { month: "May", usage: 45000 },
  ],
  generatorBackup: [
    { month: "Jan", runs: 4, fuel: "120L" },
    { month: "Feb", runs: 2, fuel: "60L" },
    { month: "Mar", runs: 7, fuel: "210L" },
    { month: "Apr", runs: 5, fuel: "150L" },
    { month: "May", runs: 3, fuel: "90L" },
  ],
}

export const INITIAL_VISITORS = [
  {
    id: "VST-9082",
    name: "Vikram Rathore",
    type: "Guest",
    unit: "B-804",
    phone: "+91 98765 43210",
    status: "Checked In",
    entryTime: "2026-05-22T21:15:00Z",
    exitTime: null,
    vehicle: "KA-03-MJ-4512",
  },
  {
    id: "VST-9081",
    name: "Ramesh Kumar",
    type: "Delivery (Amazon)",
    unit: "A-201",
    phone: "+91 90123 45678",
    status: "Checked In",
    entryTime: "2026-05-22T22:30:00Z",
    exitTime: null,
    vehicle: "KA-51-EX-8902",
  },
  {
    id: "VST-9079",
    name: "Anita Sharma",
    type: "Daily Helper",
    unit: "C-1102",
    phone: "+91 91234 56789",
    status: "Checked Out",
    entryTime: "2026-05-22T08:30:00Z",
    exitTime: "2026-05-22T16:00:00Z",
    vehicle: "None",
  },
  {
    id: "VST-9077",
    name: "Karan Johar",
    type: "Guest",
    unit: "D-503",
    phone: "+91 99988 87766",
    status: "Pre-approved",
    entryTime: null,
    exitTime: null,
    vehicle: "DL-01-AB-1234",
  },
]

export const PARKING_SLOTS = {
  TowerA: [
    { id: "A-P01", unit: "A-101", status: "Occupied", isEV: false },
    { id: "A-P02", unit: "A-102", status: "Occupied", isEV: true },
    { id: "A-P03", unit: "A-201", status: "Empty", isEV: false },
    { id: "A-P04", unit: "A-202", status: "Occupied", isEV: true },
    { id: "A-P05", unit: "None", status: "Available", isEV: false },
  ],
  TowerB: [
    { id: "B-P01", unit: "B-301", status: "Occupied", isEV: false },
    { id: "B-P02", unit: "None", status: "Available", isEV: true },
    { id: "B-P03", unit: "B-402", status: "Occupied", isEV: false },
    { id: "B-P04", unit: "None", status: "Available", isEV: false },
  ],
}

export const INITIAL_TICKETS = [
  {
    id: "TKT-8901",
    title: "Main Water Pipe Seepage",
    category: "Plumbing",
    unit: "B-804",
    priority: "High",
    status: "In Progress",
    assignedTo: "Rahul (Plumber)",
    createdAt: "2026-05-22T19:30:00Z",
    slaLimit: 2, // hours remaining
    notes: "Requires replacing the 3-inch coupling in the shaft.",
    history: [
      { time: "2026-05-22T19:30:00Z", label: "Ticket Created by Resident" },
      { time: "2026-05-22T19:45:00Z", label: "Assigned to Rahul (Plumbing Team)" },
    ],
  },
  {
    id: "TKT-8900",
    title: "Corridor Light Flickering",
    category: "Electrical",
    unit: "A-104",
    priority: "Low",
    status: "Open",
    assignedTo: null,
    createdAt: "2026-05-22T21:40:00Z",
    slaLimit: 12,
    notes: "Bulb needs replacement, 4th floor corridor.",
    history: [
      { time: "2026-05-22T21:40:00Z", label: "Ticket Created" },
    ],
  },
  {
    id: "TKT-8898",
    title: "Lift B Geared Box Friction Sound",
    category: "Lift / Elevator",
    unit: "Tower C Lift B",
    priority: "Critical",
    status: "Resolved",
    assignedTo: "Otis Engineer",
    createdAt: "2026-05-22T09:00:00Z",
    slaLimit: 0,
    notes: "Gear box greased and alignment checked. Re-certified.",
    history: [
      { time: "2026-05-22T09:00:00Z", label: "Ticket Created by Guard" },
      { time: "2026-05-22T10:15:00Z", label: "Vendor Dispatched" },
      { time: "2026-05-22T12:30:00Z", label: "Marked Resolved & Audited" },
    ],
  },
]

export const TECHNICIANS = [
  { name: "Rahul Sharma", specialty: "Plumbing", available: true, activeTickets: 1 },
  { name: "Amit Dev", specialty: "Electrical", available: true, activeTickets: 0 },
  { name: "Suresh Patil", specialty: "Carpentry", available: false, activeTickets: 2 },
  { name: "David Otis", specialty: "Lift / Elevator", available: true, activeTickets: 0 },
]

export const INITIAL_INVOICES = [
  {
    id: "INV-2026-050",
    month: "May 2026",
    dueDate: "2026-06-05",
    maintenance: 4500,
    sinkingFund: 500,
    waterCharge: 350,
    electricityCharge: 620,
    status: "Unpaid",
    paidDate: null,
  },
  {
    id: "INV-2026-041",
    month: "April 2026",
    dueDate: "2026-05-05",
    maintenance: 4500,
    sinkingFund: 500,
    waterCharge: 410,
    electricityCharge: 580,
    status: "Paid",
    paidDate: "2026-05-02T10:30:00Z",
    receiptId: "RCP-80124",
  },
]

export const FINANCIAL_OVERVIEW = {
  maintenanceFund: "₹18,45,200",
  sinkingFund: "₹45,12,000",
  monthlyExpense: "₹3,42,800",
  outstandingDues: "₹1,12,500",
}

export const INITIAL_PACKAGES = [
  {
    id: "PKG-771",
    courier: "Delhivery",
    trackingId: "DLV9902341",
    lockerNo: "Locker B-04",
    status: "Awaiting Pickup",
    receivedAt: "2026-05-22T18:10:00Z",
    otp: "5938",
  },
  {
    id: "PKG-768",
    courier: "Amazon Logistics",
    trackingId: "AMZ8834710",
    lockerNo: "Locker A-12",
    status: "Picked Up",
    receivedAt: "2026-05-22T10:00:00Z",
    otp: "1234",
  },
]

export const COMMUNITY_POLLS = [
  {
    id: "POL-003",
    question: "Should the society install EV fast-chargers in Tower C & D parking bays?",
    options: [
      { text: "Yes, allocate budget", votes: 142 },
      { text: "No, defer to next AGM", votes: 34 },
      { text: "Yes, but cost-shared by EV owners", votes: 89 },
    ],
    voted: false,
    votersCount: 265,
    expiresAt: "2026-05-30T18:00:00Z",
  },
  {
    id: "POL-002",
    question: "Approve 10% maintenance budget increase for upgraded CCTV security cameras?",
    options: [
      { text: "Approve", votes: 185 },
      { text: "Disapprove", votes: 94 },
    ],
    voted: true,
    votersCount: 279,
    expiresAt: "2026-05-15T18:00:00Z",
  },
]

export const SYSTEM_ALERTS = [
  { id: "ALT-101", priority: "High", message: "Water pump B high pressure alert. Automated shutdown triggered.", time: "2026-05-22T21:40:00Z" },
  { id: "ALT-102", priority: "Medium", message: "Unscheduled domestic visitor logged in Tower B without resident invite.", time: "2026-05-22T22:15:00Z" },
]

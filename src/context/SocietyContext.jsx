import React, { createContext, useContext, useState, useEffect } from "react"
import {
  INITIAL_VISITORS,
  INITIAL_TICKETS,
  INITIAL_INVOICES,
  INITIAL_PACKAGES,
  COMMUNITY_POLLS,
  SYSTEM_ALERTS,
  TECHNICIANS,
} from "../utils/mockData"

const SocietyContext = createContext()

export function SocietyProvider({ children }) {
  // Global States
  const [role, setRole] = useState("resident") // 'resident' | 'admin'
  const [activeTab, setActiveTab] = useState("dashboard")
  const [lockdownMode, setLockdownMode] = useState(false)
  const [sosActive, setSosActive] = useState(false)
  const [sosTower, setSosTower] = useState(null)
  
  // Operational Data States
  const [visitors, setVisitors] = useState(() => {
    const saved = localStorage.getItem("echodwell_visitors")
    return saved ? JSON.parse(saved) : INITIAL_VISITORS
  })
  
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem("echodwell_tickets")
    return saved ? JSON.parse(saved) : INITIAL_TICKETS
  })

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("echodwell_invoices")
    return saved ? JSON.parse(saved) : INITIAL_INVOICES
  })

  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem("echodwell_packages")
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES
  })

  const [polls, setPolls] = useState(() => {
    const saved = localStorage.getItem("echodwell_polls")
    return saved ? JSON.parse(saved) : COMMUNITY_POLLS
  })

  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem("echodwell_alerts")
    return saved ? JSON.parse(saved) : SYSTEM_ALERTS
  })

  const [parkingBookings, setParkingBookings] = useState(() => {
    const saved = localStorage.getItem("echodwell_parking_bookings")
    return saved ? JSON.parse(saved) : []
  })

  // Synchronize to localStorage for high-fidelity state persistence
  useEffect(() => {
    localStorage.setItem("echodwell_visitors", JSON.stringify(visitors))
  }, [visitors])

  useEffect(() => {
    localStorage.setItem("echodwell_tickets", JSON.stringify(tickets))
  }, [tickets])

  useEffect(() => {
    localStorage.setItem("echodwell_invoices", JSON.stringify(invoices))
  }, [invoices])

  useEffect(() => {
    localStorage.setItem("echodwell_packages", JSON.stringify(packages))
  }, [packages])

  useEffect(() => {
    localStorage.setItem("echodwell_polls", JSON.stringify(polls))
  }, [polls])

  useEffect(() => {
    localStorage.setItem("echodwell_alerts", JSON.stringify(alerts))
  }, [alerts])

  useEffect(() => {
    localStorage.setItem("echodwell_parking_bookings", JSON.stringify(parkingBookings))
  }, [parkingBookings])

  // --- ACTIONS ---

  // 1. Security & Visitor Operations
  const addPreApprovedVisitor = (name, phone, unit, vehicle, type = "Guest") => {
    const newVisitor = {
      id: `VST-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      phone,
      unit,
      vehicle: vehicle || "None",
      type,
      status: "Pre-approved",
      entryTime: null,
      exitTime: null,
    }
    setVisitors((prev) => [newVisitor, ...prev])
    addNotification("Security", `Pre-approved guest pass created for ${name} (Unit ${unit})`)
    return newVisitor
  }

  const checkInVisitor = (id) => {
    setVisitors((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, status: "Checked In", entryTime: new Date().toISOString() }
          : v
      )
    )
    const visitor = visitors.find((v) => v.id === id)
    if (visitor) {
      addNotification("Gate Log", `${visitor.name} has checked in at the Main Gate for Unit ${visitor.unit}`)
    }
  }

  const checkOutVisitor = (id) => {
    setVisitors((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, status: "Checked Out", exitTime: new Date().toISOString() }
          : v
      )
    )
    const visitor = visitors.find((v) => v.id === id)
    if (visitor) {
      addNotification("Gate Log", `${visitor.name} has checked out of the complex`)
    }
  }

  // 2. Parking Bookings
  const bookEVSlot = (slotId, hour) => {
    const key = `${slotId}-${hour}`
    if (parkingBookings.includes(key)) return false
    
    setParkingBookings((prev) => [...prev, key])
    addNotification("Parking", `EV Charging Bay ${slotId} reserved successfully for ${hour}:00`)
    return true
  }

  // 3. Maintenance Ticket Workflow
  const createMaintenanceTicket = (title, category, unit, priority, notes) => {
    const newTicket = {
      id: `TKT-${Math.floor(8000 + Math.random() * 1000)}`,
      title,
      category,
      unit,
      priority,
      status: "Open",
      assignedTo: null,
      createdAt: new Date().toISOString(),
      slaLimit: priority === "Critical" ? 2 : priority === "High" ? 4 : 12,
      notes,
      history: [{ time: new Date().toISOString(), label: "Ticket raised by Resident" }],
    }
    setTickets((prev) => [newTicket, ...prev])
    addNotification("Maintenance", `New ${priority} priority ticket raised: "${title}" (Unit ${unit})`)
  }

  const assignTechnician = (ticketId, technicianName) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: "In Progress",
              assignedTo: technicianName,
              history: [
                ...t.history,
                { time: new Date().toISOString(), label: `Assigned to technician ${technicianName}` },
              ],
            }
          : t
      )
    )
    addNotification("Workforce", `Ticket ${ticketId} assigned to ${technicianName}`)
  }

  const resolveTicket = (ticketId, notes) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: "Resolved",
              history: [
                ...t.history,
                { time: new Date().toISOString(), label: `Ticket resolved: ${notes || "Work completed."}` },
              ],
            }
          : t
      )
    )
    addNotification("Maintenance", `Ticket ${ticketId} has been resolved successfully.`)
  }

  // 4. Financial Actions
  const payInvoice = (invoiceId) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: "Paid",
              paidDate: new Date().toISOString(),
              receiptId: `RCP-${Math.floor(80000 + Math.random() * 19999)}`,
            }
          : inv
      )
    )
    addNotification("Billing", `Payment successful for Invoice ${invoiceId}. Receipt issued.`)
  }

  // 5. Courier Locker Pickups
  const claimPackage = (packageId, otp) => {
    const pkg = packages.find((p) => p.id === packageId)
    if (!pkg) return { success: false, message: "Package not found" }
    
    if (pkg.otp !== otp) {
      return { success: false, message: "Invalid verification OTP code. Try again." }
    }

    setPackages((prev) =>
      prev.map((p) => (p.id === packageId ? { ...p, status: "Picked Up" } : p))
    )
    addNotification("Smart Locker", `Package ${pkg.trackingId} claimed from locker successfully.`)
    return { success: true, message: "Locker bay unlocked! Please pick up your parcel." }
  }

  // 6. Governance Voting Polls
  const voteOnPoll = (pollId, optionText) => {
    setPolls((prev) =>
      prev.map((p) =>
        p.id === pollId
          ? {
              ...p,
              voted: true,
              votersCount: p.votersCount + 1,
              options: p.options.map((o) =>
                o.text === optionText ? { ...o, votes: o.votes + 1 } : o
              ),
            }
          : p
      )
    )
    addNotification("Governance", `Your anonymous vote has been recorded securely in the society ledger.`)
  }

  // 7. System & Notifications Engine
  const addNotification = (priorityLabel, message) => {
    const newAlert = {
      id: `ALT-${Math.floor(100 + Math.random() * 900)}`,
      priority: priorityLabel,
      message,
      time: new Date().toISOString(),
    }
    setAlerts((prev) => [newAlert, ...prev])
  }

  const clearAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  // 8. Emergency Mode Commands
  const triggerSOS = (towerName) => {
    setSosActive(true)
    setSosTower(towerName || "Main Gate")
    addNotification("SOS CRITICAL", `CRITICAL: SOS Emergency trigger activated in ${towerName || "Main Complex"}! Security and medical units alerted!`)
  }

  const cancelSOS = () => {
    setSosActive(false)
    setSosTower(null)
  }

  const toggleLockdown = () => {
    setLockdownMode((prev) => {
      const next = !prev
      if (next) {
        addNotification("EMERGENCY", `SOCIETY LOCKDOWN MODE INITIATED. Main and service gate locks engaged. Internal checkpoints notified.`)
      } else {
        addNotification("Security", `Society lockdown deactivated. Standard gate access control restored.`)
      }
      return next
    })
  }

  return (
    <SocietyContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        lockdownMode,
        setLockdownMode,
        sosActive,
        sosTower,
        triggerSOS,
        cancelSOS,
        toggleLockdown,
        visitors,
        addPreApprovedVisitor,
        checkInVisitor,
        checkOutVisitor,
        parkingBookings,
        bookEVSlot,
        tickets,
        createMaintenanceTicket,
        assignTechnician,
        resolveTicket,
        invoices,
        payInvoice,
        packages,
        claimPackage,
        polls,
        voteOnPoll,
        alerts,
        clearAlert,
        techniciansList: TECHNICIANS,
      }}
    >
      {children}
    </SocietyContext.Provider>
  )
}

export function useSociety() {
  return useContext(SocietyContext)
}

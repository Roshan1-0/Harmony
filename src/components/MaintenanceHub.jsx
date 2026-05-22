import React, { useState } from "react"
import { useSociety } from "../context/SocietyContext"
import { 
  Wrench, 
  UserCheck, 
  Boxes, 
  History, 
  AlertTriangle, 
  Clock, 
  ChevronDown,
  Check
} from "lucide-react"

export default function MaintenanceHub() {
  const { 
    role, 
    tickets, 
    createMaintenanceTicket, 
    assignTechnician, 
    resolveTicket, 
    techniciansList 
  } = useSociety()

  const [selectedTicket, setSelectedTicket] = useState(null)
  
  // Roster/Form states
  const [newTitle, setNewTitle] = useState("")
  const [newCategory, setNewCategory] = useState("Plumbing")
  const [newPriority, setNewPriority] = useState("Medium")
  const [newNotes, setNewNotes] = useState("")

  // Inventory parts state
  const [spareParts, setSpareParts] = useState([
    { id: "PRT-02", name: "3-inch Brass Coupling", qty: 8, minQty: 5, status: "Optimal" },
    { id: "PRT-11", name: "LED Corridor Bulb 12W", qty: 22, minQty: 10, status: "Optimal" },
    { id: "PRT-45", name: "Submersible Pump Impeller", qty: 1, minQty: 2, status: "Low Stock Alert" },
    { id: "PRT-89", name: "Heavy Gate Valve Coupling", qty: 0, minQty: 1, status: "Out of Stock" },
  ])

  const handleRaiseTicket = (e) => {
    e.preventDefault()
    if (!newTitle || !newNotes) return
    const unit = role === "resident" ? "B-804" : "A-101"
    createMaintenanceTicket(newTitle, newCategory, unit, newPriority, newNotes)
    setNewTitle("")
    setNewNotes("")
    alert("Ticket raised successfully! Check your list for real-time technician assignments.")
  }

  const handleRestockPart = (id) => {
    setSpareParts(prev => prev.map(p => 
      p.id === id ? { ...p, qty: p.qty + 5, status: "Optimal" } : p
    ))
    alert(`Restock order dispatched! 5 units of ${id} added to inventory ledger.`)
  }

  return (
    <div className="dashboard-grid">

      {/* Raise Maintenance Ticket Form (Visible to all) */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <Wrench size={18} style={{ color: "var(--color-sage)" }} />
            File Repair Request Ticket
          </h3>
        </div>

        <form onSubmit={handleRaiseTicket} className="society-form">
          <div className="form-group">
            <label className="form-label">Issue Title</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Master washroom wall seepage"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <div className="form-group">
              <label className="form-label">Fault Category</label>
              <select className="form-select" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Lift / Elevator">Lift / Elevator</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Gate Access">Gate Access</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority SLA</label>
              <select className="form-select" value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
                <option value="Low">Low (12h limit)</option>
                <option value="Medium">Medium (6h limit)</option>
                <option value="High">High (4h limit)</option>
                <option value="Critical">Critical (2h limit)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Operational Notes / Detail</label>
            <textarea 
              className="form-textarea" 
              rows="3" 
              placeholder="Provide exact details of fault or seepage area..."
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="form-btn">File Maintenance Ticket</button>
        </form>
      </div>

      {/* Active Society Tickets Board */}
      <div className="society-card" style={{ gridColumn: "span 2" }}>
        <div className="card-header">
          <h3 className="card-title">
            <Wrench size={18} style={{ color: "var(--color-sage)" }} />
            Active Complex Repair Tickets
          </h3>
          <span className="badge badge-info">Realtime SLA</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "310px", overflowY: "auto" }}>
          {tickets.map(ticket => (
            <div 
              key={ticket.id} 
              onClick={() => setSelectedTicket(ticket)}
              style={{ 
                padding: "0.85rem", 
                borderRadius: "var(--radius-md)", 
                border: selectedTicket?.id === ticket.id ? "2px solid var(--color-charcoal)" : "1px solid rgba(59,65,60,0.08)",
                cursor: "pointer",
                backgroundColor: ticket.status === "Resolved" ? "#f7faf9" : "white",
                borderLeft: ticket.priority === "Critical" ? "5px solid #ef4444" : ticket.priority === "High" ? "5px solid #f59e0b" : "5px solid var(--color-mint)"
              }}
            >
              <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.65rem", fontWeight: "700", color: "var(--color-sage)" }}>{ticket.id} • {ticket.category}</span>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: "700", marginTop: "0.1rem" }}>{ticket.title}</h4>
                </div>
                <span className={`badge ${ticket.status === "Resolved" ? "badge-success" : ticket.status === "In Progress" ? "badge-warning" : "badge-danger"}`}>
                  {ticket.status}
                </span>
              </div>
              
              <div style={{ display: "flex", justify: "space-between", fontSize: "0.7rem", color: "var(--color-charcoal-60)", marginTop: "0.5rem" }}>
                <span>Unit: <strong>{ticket.unit}</strong></span>
                <span>Assigned: <strong>{ticket.assignedTo || "Unassigned"}</strong></span>
                {ticket.status !== "Resolved" && (
                  <span style={{ color: ticket.priority === "Critical" ? "#ef4444" : "inherit", display: "flex", gap: "2px", alignItems: "center" }}>
                    <Clock size={10} />
                    SLA: {ticket.slaLimit}h left
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Ticket Control & SLA Tracker */}
      {selectedTicket && (
        <div className="society-card" style={{ gridColumn: "span 2" }}>
          <div className="card-header" style={{ borderBottom: "1px solid rgba(59,65,60,0.05)" }}>
            <div>
              <span className="text-label">{selectedTicket.id} Detail</span>
              <h3 style={{ fontSize: "1rem", fontWeight: "700" }}>{selectedTicket.title}</h3>
            </div>
            <button className="card-action" onClick={() => setSelectedTicket(null)}>Close panel</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.5rem", marginTop: "1rem" }}>
            {/* Description & Action */}
            <div>
              <span className="metric-label" style={{ display: "block" }}>Operational Notes</span>
              <p style={{ fontSize: "0.75rem", color: "var(--color-charcoal-60)", lineHeight: "1.5", marginBottom: "1rem" }}>
                "{selectedTicket.notes}"
              </p>

              {role === "admin" && selectedTicket.status !== "Resolved" && (
                <div style={{ backgroundColor: "var(--color-ice)", padding: "1rem", borderRadius: "var(--radius-md)" }}>
                  <span className="metric-label" style={{ display: "block", marginBottom: "0.5rem" }}>Admin Dispatch Control</span>
                  
                  {selectedTicket.status === "Open" ? (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <select 
                        id={`tech-select-${selectedTicket.id}`}
                        className="form-select" 
                        style={{ fontSize: "0.75rem", flex: 1 }}
                      >
                        {techniciansList
                          .filter(t => t.specialty === selectedTicket.category || t.specialty === "General")
                          .map(t => (
                            <option key={t.name} value={t.name}>{t.name} ({t.specialty})</option>
                          ))
                        }
                      </select>
                      <button 
                        className="form-btn" 
                        style={{ fontSize: "0.75rem", padding: "0 1rem" }}
                        onClick={() => {
                          const val = document.getElementById(`tech-select-${selectedTicket.id}`).value
                          assignTechnician(selectedTicket.id, val)
                          setSelectedTicket(null)
                        }}
                      >
                        Dispatch
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: "0.7rem", color: "var(--color-charcoal-60)", marginBottom: "0.5rem" }}>
                        Currently worked by <strong>{selectedTicket.assignedTo}</strong>
                      </p>
                      <button 
                        className="form-btn" 
                        style={{ width: "100%", fontSize: "0.75rem", backgroundColor: "var(--color-mint)", color: "var(--color-charcoal)" }}
                        onClick={() => {
                          resolveTicket(selectedTicket.id, "Repair certified. Pressure test normal.")
                          setSelectedTicket(null)
                        }}
                      >
                        Certify Completion & Close Ticket
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Audit Log Timeline */}
            <div>
              <span className="metric-label" style={{ display: "block", marginBottom: "0.75rem" }}>Timeline Log</span>
              <div className="society-timeline">
                {selectedTicket.history.map((log, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className={`timeline-dot ${idx === selectedTicket.history.length - 1 ? "active" : ""}`}></div>
                    <span className="timeline-time">{new Date(log.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    <div className="timeline-label">{log.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Technician Roster / Attendance */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <UserCheck size={18} style={{ color: "var(--color-sage)" }} />
            Technician Roster & Load
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {techniciansList.map(tech => (
            <div key={tech.name} style={{ display: "flex", justify: "space-between", alignItems: "center", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(59,65,60,0.05)" }}>
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: "700" }}>{tech.name}</span>
                <div style={{ fontSize: "0.65rem", color: "var(--color-sage)" }}>
                  Specialty: {tech.specialty} • Active: {tech.activeTickets} tasks
                </div>
              </div>
              <span className={`badge ${tech.available ? "badge-success" : "badge-danger"}`}>
                {tech.available ? "On-Duty" : "Busy"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Spare Parts Inventory Management */}
      <div className="society-card" style={{ gridColumn: "span 3" }}>
        <div className="card-header">
          <h3 className="card-title">
            <Boxes size={18} style={{ color: "var(--color-sage)" }} />
            Spare Parts & Maintenance Inventory
          </h3>
          <span className="badge badge-info">Sensors Armed</span>
        </div>

        <div className="table-container">
          <table className="society-table">
            <thead>
              <tr>
                <th>Part ID</th>
                <th>Part Name</th>
                <th>In Stock Qty</th>
                <th>Minimum Threshold</th>
                <th>Status</th>
                <th>Restock Action</th>
              </tr>
            </thead>
            <tbody>
              {spareParts.map(part => (
                <tr key={part.id}>
                  <td style={{ fontWeight: "700" }}>{part.id}</td>
                  <td style={{ fontWeight: "600" }}>{part.name}</td>
                  <td>{part.qty} units</td>
                  <td>{part.minQty} units</td>
                  <td>
                    <span className={`badge ${
                      part.status === "Optimal" 
                        ? "badge-success" 
                        : part.status.includes("Low") 
                        ? "badge-warning" 
                        : "badge-danger"
                    }`}>
                      {part.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleRestockPart(part.id)}
                      className="card-action"
                      style={{ backgroundColor: "var(--color-ice)", color: "var(--color-charcoal)" }}
                    >
                      Restock +5
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

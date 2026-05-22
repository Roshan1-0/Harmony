import React, { useState } from "react"
import { useSociety } from "../context/SocietyContext"
import { 
  ShieldCheck, 
  UserPlus, 
  QrCode, 
  AlertTriangle,
  History, 
  Truck, 
  FileWarning, 
  PhoneCall, 
  Power,
  Volume2
} from "lucide-react"

export default function SecurityManager() {
  const { 
    role, 
    visitors, 
    addPreApprovedVisitor, 
    checkInVisitor, 
    checkOutVisitor,
    sosActive,
    sosTower,
    triggerSOS,
    cancelSOS,
    lockdownMode,
    toggleLockdown
  } = useSociety()

  // Form states for guest pre-approval
  const [guestName, setGuestName] = useState("")
  const [guestPhone, setGuestPhone] = useState("")
  const [guestUnit, setGuestUnit] = useState(role === "resident" ? "B-804" : "A-101")
  const [guestVehicle, setGuestVehicle] = useState("")
  const [guestType, setGuestType] = useState("Guest")
  const [generatedPass, setGeneratedPass] = useState(null)

  // Incident log states
  const [reportedIncidents, setReportedIncidents] = useState([
    { id: "INC-201", type: "Unrecognized Vehicle", tower: "Tower D Parking", severity: "Medium", status: "Investigating", time: "2026-05-22T14:30:00Z" }
  ])
  const [newIncidentDesc, setNewIncidentDesc] = useState("")
  const [newIncidentTower, setNewIncidentTower] = useState("Tower A")
  const [newIncidentSeverity, setNewIncidentSeverity] = useState("Low")

  const handlePreApprove = (e) => {
    e.preventDefault()
    if (!guestName || !guestPhone) return
    const newPass = addPreApprovedVisitor(guestName, guestPhone, guestUnit, guestVehicle, guestType)
    setGeneratedPass(newPass)
    setGuestName("")
    setGuestPhone("")
    setGuestVehicle("")
  }

  const handleIncidentSubmit = (e) => {
    e.preventDefault()
    if (!newIncidentDesc) return
    const newInc = {
      id: `INC-${Math.floor(200 + Math.random() * 800)}`,
      type: newIncidentDesc,
      tower: newIncidentTower,
      severity: newIncidentSeverity,
      status: "Reported",
      time: new Date().toISOString()
    }
    setReportedIncidents([newInc, ...reportedIncidents])
    setNewIncidentDesc("")
  }

  return (
    <div className="dashboard-grid">
      
      {/* SOS Panel Indicator */}
      {(sosActive || lockdownMode) && (
        <div style={{
          gridColumn: "1 / -1",
          backgroundColor: "#fef2f2",
          border: "2px solid #ef4444",
          borderRadius: "var(--radius-lg)",
          padding: "1.5rem",
          color: "#991b1b"
        }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <AlertTriangle size={36} style={{ color: "#ef4444", flexShrink: 0 }} />
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "0.25rem" }}>
                {sosActive ? "CRITICAL SOS ALERT IN PROGRESS" : "SOCIETY LOCKDOWN ENFORCED"}
              </h2>
              <p style={{ fontSize: "0.8rem", color: "#b91c1c", lineHeight: "1.5" }}>
                {sosActive && `Emergency SOS triggered in ${sosTower}. Security squads dispatched. Emergency medical units notified.`}
                {lockdownMode && "All gates closed and smart locking locks engaged. Personnel at checkpoints are armed and monitoring perimeters."}
              </p>
              <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                {sosActive && <button className="form-btn" style={{ backgroundColor: "#ef4444", color: "white" }} onClick={cancelSOS}>Cancel SOS Alarm</button>}
                {role === "admin" && <button className="form-btn" style={{ backgroundColor: "#3b413c", color: "white" }} onClick={toggleLockdown}>{lockdownMode ? "Deactivate Lockdown" : "Initiate Lockdown"}</button>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guest Pre-approval Form (Visible to Resident or Admin) */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <UserPlus size={18} style={{ color: "var(--color-sage)" }} />
            Visitor Pre-Approval System
          </h3>
        </div>

        <form onSubmit={handlePreApprove} className="society-form">
          <div className="form-group">
            <label className="form-label">Visitor Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Priyank Sen"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className="form-input" 
              placeholder="+91 XXXXX XXXXX"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <div className="form-group">
              <label className="form-label">Unit Number</label>
              <input 
                type="text" 
                className="form-input" 
                value={guestUnit}
                onChange={(e) => setGuestUnit(e.target.value)}
                disabled={role === "resident"}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Visitor Type</label>
              <select className="form-select" value={guestType} onChange={(e) => setGuestType(e.target.value)}>
                <option value="Guest">Guest</option>
                <option value="Delivery (Amazon)">Delivery (Amazon)</option>
                <option value="Delivery (Zomato)">Delivery (Food)</option>
                <option value="Daily Helper">Daily Helper</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Vehicle Reg (Optional)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. KA-03-MK-7721"
              value={guestVehicle}
              onChange={(e) => setGuestVehicle(e.target.value)}
            />
          </div>
          <button type="submit" className="form-btn">Generate Entry Pass</button>
        </form>
      </div>

      {/* Generated Guest Pass QR Display */}
      <div className="society-card" style={{ display: "flex", flexDirection: "column", justify: "space-between" }}>
        <div className="card-header">
          <h3 className="card-title">
            <QrCode size={18} style={{ color: "var(--color-sage)" }} />
            Active Guest Entry QR Code
          </h3>
        </div>

        {generatedPass ? (
          <div style={{ textAlign: "center", margin: "auto 0" }}>
            <div style={{ 
              width: "120px", 
              height: "120px", 
              backgroundColor: "var(--color-charcoal)", 
              margin: "0 auto 1rem", 
              borderRadius: "var(--radius-md)", 
              display: "flex", 
              alignItems: "center", 
              justify: "center",
              color: "var(--color-mint)",
              boxShadow: "0 4px 12px rgba(148, 209, 190, 0.3)",
              border: "4px solid var(--color-white)"
            }}>
              {/* Simulated QR Code using CSS grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px", width: "80px", height: "80px" }}>
                {[...Array(16)].map((_, i) => (
                  <div key={i} style={{ 
                    backgroundColor: (i % 3 === 0 || i === 7 || i === 11 || i === 14) ? "var(--color-mint)" : "transparent",
                    borderRadius: "2px" 
                  }}></div>
                ))}
              </div>
            </div>
            
            <h4 style={{ fontWeight: "700", fontSize: "0.9rem" }}>{generatedPass.name}</h4>
            <span className="badge badge-success" style={{ fontSize: "0.65rem", marginTop: "0.25rem" }}>{generatedPass.id}</span>
            <p style={{ fontSize: "0.7rem", color: "var(--color-sage)", marginTop: "0.5rem", lineHeight: "1.4" }}>
              Share this pass ID with your guest. Security at Gate 1 will verify the QR code on arrival.
            </p>
          </div>
        ) : (
          <div style={{ textAlign: "center", margin: "auto 0", padding: "2rem 0", color: "var(--color-sage)" }}>
            <QrCode size={42} style={{ opacity: 0.3, margin: "0 auto 0.5rem" }} />
            <p style={{ fontSize: "0.8rem" }}>Fill the approval form to issue a live digital entry ticket.</p>
          </div>
        )}
      </div>

      {/* Emergency Contacts & Hospital Coordinates */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <PhoneCall size={18} style={{ color: "var(--color-sage)" }} />
            Emergency Contacts
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", justify: "space-between", alignItems: "center", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(59,65,60,0.05)" }}>
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: "700" }}>Main Security Gate</div>
              <span style={{ fontSize: "0.65rem", color: "var(--color-sage)" }}>Ext. 100 / +91 80 5002 9901</span>
            </div>
            <a href="tel:+918050029901" className="card-action">Call</a>
          </div>

          <div style={{ display: "flex", justify: "space-between", alignItems: "center", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(59,65,60,0.05)" }}>
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: "700" }}>Cloud Hospital Trauma</div>
              <span style={{ fontSize: "0.65rem", color: "var(--color-sage)" }}>1.4 km • +91 80 4402 1200</span>
            </div>
            <a href="tel:+918044021200" className="card-action">Call</a>
          </div>

          <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: "700" }}>Fire Station Sector 4</div>
              <span style={{ fontSize: "0.65rem", color: "var(--color-sage)" }}>3.2 km • 101</span>
            </div>
            <a href="tel:101" className="card-action">Call</a>
          </div>
        </div>

        <div style={{ backgroundColor: "var(--color-ice)", padding: "0.75rem", borderRadius: "var(--radius-md)", borderLeft: "4px solid #ef4444", marginTop: "1rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "#991b1b", display: "block", marginBottom: "0.25rem" }}>Panic Button SOS</span>
          <p style={{ fontSize: "0.65rem", color: "#b91c1c", lineHeight: "1.4" }}>
            Pressing SOS will broadcast a high-decibel warning to the security commander console immediately.
          </p>
          <button 
            onClick={() => triggerSOS(role === "resident" ? "Tower B" : "Main Gate")}
            style={{ 
              width: "100%", 
              backgroundColor: "#ef4444", 
              color: "white", 
              padding: "0.5rem", 
              borderRadius: "var(--radius-sm)", 
              fontSize: "0.75rem", 
              fontWeight: "700", 
              marginTop: "0.5rem" 
            }}
          >
            PANIC BUTTON (SOS)
          </button>
        </div>
      </div>

      {/* Chronological Gate Logs (Table) */}
      <div className="society-card" style={{ gridColumn: "span 3" }}>
        <div className="card-header">
          <h3 className="card-title">
            <History size={18} style={{ color: "var(--color-sage)" }} />
            Smart Visitor & Vehicle Gate Log
          </h3>
          <span className="badge badge-info">Realtime</span>
        </div>

        <div className="table-container">
          <table className="society-table">
            <thead>
              <tr>
                <th>Visitor ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Flat Unit</th>
                <th>Vehicle Reg</th>
                <th>Entry Timestamp</th>
                <th>Exit Timestamp</th>
                <th>Live Status</th>
                {role === "admin" && <th>Access Action</th>}
              </tr>
            </thead>
            <tbody>
              {visitors.map(visitor => (
                <tr key={visitor.id}>
                  <td style={{ fontWeight: "700" }}>{visitor.id}</td>
                  <td>{visitor.name}</td>
                  <td>{visitor.type}</td>
                  <td>{visitor.unit}</td>
                  <td style={{ fontFamily: "monospace" }}>{visitor.vehicle}</td>
                  <td>{visitor.entryTime ? new Date(visitor.entryTime).toLocaleTimeString() : "—"}</td>
                  <td>{visitor.exitTime ? new Date(visitor.exitTime).toLocaleTimeString() : "—"}</td>
                  <td>
                    <span className={`badge ${
                      visitor.status === "Checked Out" 
                        ? "badge-success" 
                        : visitor.status === "Checked In" 
                        ? "badge-warning" 
                        : "badge-info"
                    }`}>
                      {visitor.status}
                    </span>
                  </td>
                  {role === "admin" && (
                    <td>
                      {visitor.status === "Pre-approved" && (
                        <button 
                          className="card-action" 
                          onClick={() => checkInVisitor(visitor.id)}
                          style={{ backgroundColor: "var(--color-mint)", color: "var(--color-charcoal)" }}
                        >
                          Check-In Gate
                        </button>
                      )}
                      {visitor.status === "Checked In" && (
                        <button 
                          className="card-action" 
                          onClick={() => checkOutVisitor(visitor.id)}
                          style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}
                        >
                          Check-Out Gate
                        </button>
                      )}
                      {visitor.status === "Checked Out" && <span style={{ fontSize: "0.7rem", color: "var(--color-sage)" }}>Logged out</span>}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Suspicious Activity Reporting / Evacuation Notice */}
      <div className="society-card" style={{ gridColumn: "span 3" }}>
        <div className="card-header">
          <h3 className="card-title">
            <FileWarning size={18} style={{ color: "var(--color-sage)" }} />
            Suspicious Incident & Vehicle Verification Log
          </h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          
          {/* Incident Reporter Form */}
          <form onSubmit={handleIncidentSubmit} className="society-form">
            <div className="form-group">
              <label className="form-label">Incident Description / Unrecognized Vehicle</label>
              <textarea 
                className="form-textarea" 
                rows="3" 
                placeholder="Describe suspicious activity or input unregistered vehicle license plates..."
                value={newIncidentDesc}
                onChange={(e) => setNewIncidentDesc(e.target.value)}
                required
              ></textarea>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <div className="form-group">
                <label className="form-label">Tower location</label>
                <select className="form-select" value={newIncidentTower} onChange={(e) => setNewIncidentTower(e.target.value)}>
                  <option value="Tower A">Tower A</option>
                  <option value="Tower B">Tower B</option>
                  <option value="Tower C">Tower C</option>
                  <option value="Tower D">Tower D</option>
                  <option value="Main Complex">Main Complex</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Severity Level</label>
                <select className="form-select" value={newIncidentSeverity} onChange={(e) => setNewIncidentSeverity(e.target.value)}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
            <button type="submit" className="form-btn">File Security Alert</button>
          </form>

          {/* Incidents List */}
          <div>
            <span className="metric-label" style={{ display: "block", marginBottom: "0.5rem" }}>Open Security Incident Board</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "200px", overflowY: "auto" }}>
              {reportedIncidents.map(inc => (
                <div key={inc.id} style={{ 
                  padding: "0.75rem", 
                  borderRadius: "var(--radius-md)", 
                  border: "1px solid rgba(59,65,60,0.08)",
                  backgroundColor: inc.severity === "Critical" ? "#fef2f2" : "var(--color-white)",
                  borderLeft: inc.severity === "Critical" ? "4px solid #ef4444" : inc.severity === "Medium" ? "4px solid #f59e0b" : "4px solid var(--color-mint)"
                }}>
                  <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: "0.75rem", color: "var(--color-charcoal)" }}>{inc.id} • {inc.tower}</strong>
                    <span className={`badge ${inc.status === "Investigating" ? "badge-warning" : "badge-info"}`}>{inc.status}</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-charcoal-60)", margin: "0.25rem 0", lineHeight: "1.4" }}>
                    {inc.type}
                  </p>
                  <span style={{ fontSize: "0.6rem", color: "var(--color-sage)" }}>
                    Reported: {new Date(inc.time).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

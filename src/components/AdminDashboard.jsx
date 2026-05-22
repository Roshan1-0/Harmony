import React, { useState } from "react"
import { useSociety } from "../context/SocietyContext"
import { 
  SOCIETY_INFO, 
  TOWERS_REPORT, 
  FINANCIAL_OVERVIEW 
} from "../utils/mockData"
import { 
  Building, 
  Users, 
  ShieldCheck, 
  Wrench, 
  ArrowUpRight, 
  Activity, 
  AlertTriangle,
  FileSpreadsheet
} from "lucide-react"

export default function AdminDashboard() {
  const { tickets, visitors, lockdownMode, toggleLockdown } = useSociety()
  const [towerFilter, setTowerFilter] = useState("All")

  // Calculate live state stats
  const activeStaff = SOCIETY_INFO.activeStaff
  const openComplaintsCount = tickets.filter(t => t.status === "Open" || t.status === "In Progress").length
  const liveGuestsInComplex = visitors.filter(v => v.status === "Checked In").length

  // Filtered towers
  const filteredTowers = towerFilter === "All" 
    ? TOWERS_REPORT 
    : TOWERS_REPORT.filter(t => t.tower === towerFilter)

  // Simulation: export report toast
  const handleExport = () => {
    alert("System Ledger Report: 'Echo_Dwell_Operational_Report_May_2026.csv' compiled successfully. Check your browser downloads folder.")
  }

  return (
    <div className="dashboard-grid">
      {/* Admin Executive Header */}
      <div className="dashboard-hero-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span className="text-label" style={{ color: "var(--color-mint)" }}>Admin Command Center</span>
          <h1 className="dashboard-hero-title">{SOCIETY_INFO.name} Operations</h1>
          <p className="dashboard-hero-desc">
            Operational Level: <strong style={{ color: "var(--color-mint)" }}>{SOCIETY_INFO.securityLevel}</strong> • Gated towers: 4 • Occupancy: {SOCIETY_INFO.occupancyRate}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="form-btn form-btn-secondary" onClick={handleExport}>
            <FileSpreadsheet size={16} />
            Export Audit Logs
          </button>
          <button 
            className="form-btn" 
            onClick={toggleLockdown}
            style={{ backgroundColor: lockdownMode ? "#ef4444" : "rgba(239, 68, 68, 0.1)", color: lockdownMode ? "#white" : "#ef4444", border: "1px solid #ef4444" }}
          >
            {lockdownMode ? "LOCKED DOWN" : "Trigger Emergency Lockdown"}
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="society-card" style={{ gridColumn: "span 1" }}>
        <div className="card-header">
          <h3 className="card-title">
            <Building size={18} style={{ color: "var(--color-sage)" }} />
            Complex Sinking Fund
          </h3>
          <span className="badge badge-success">Audited</span>
        </div>
        <span className="metric-label">Reserve Balance</span>
        <div className="metric-val">{FINANCIAL_OVERVIEW.sinkingFund}</div>
        <div className="metric-trend">
          <ArrowUpRight size={12} style={{ display: "inline", marginRight: "2px" }} />
          +₹45,000 sinking accrual this month
        </div>
      </div>

      <div className="society-card" style={{ gridColumn: "span 1" }}>
        <div className="card-header">
          <h3 className="card-title">
            <Wrench size={18} style={{ color: "var(--color-sage)" }} />
            Workforce SLA Load
          </h3>
          <span className="badge badge-warning">Active Duty</span>
        </div>
        <span className="metric-label">Open Complaints</span>
        <div className="metric-val" style={{ color: openComplaintsCount > 3 ? "#f59e0b" : "var(--color-charcoal)" }}>
          {openComplaintsCount} Tickets
        </div>
        <div className="metric-trend" style={{ color: "var(--color-sage)" }}>
          {activeStaff} personnel dispatched across complex
        </div>
      </div>

      <div className="society-card" style={{ gridColumn: "span 1" }}>
        <div className="card-header">
          <h3 className="card-title">
            <Users size={18} style={{ color: "var(--color-sage)" }} />
            Security Occupancy
          </h3>
          <span className="badge badge-info">Optimal</span>
        </div>
        <span className="metric-label">Live Visitor Gate Count</span>
        <div className="metric-val">{liveGuestsInComplex} Checked-In</div>
        <div className="metric-trend">
          All visitor QR credentials active
        </div>
      </div>

      {/* Tower reports and filter panel */}
      <div className="society-card" style={{ gridColumn: "span 3" }}>
        <div className="card-header" style={{ display: "flex", justify: "space-between", alignItems: "center", borderBottom: "1px solid rgba(59,65,60,0.05)", paddingBottom: "0.75rem" }}>
          <h3 className="card-title">
            <Activity size={18} style={{ color: "var(--color-sage)" }} />
            Tower-wise Operational Metrics
          </h3>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["All", "Tower A", "Tower B", "Tower C", "Tower D"].map(tName => (
              <button 
                key={tName} 
                onClick={() => setTowerFilter(tName)}
                className="card-action"
                style={{ 
                  backgroundColor: towerFilter === tName ? "var(--color-charcoal)" : "var(--color-ice)",
                  color: towerFilter === tName ? "var(--color-white)" : "var(--color-charcoal)"
                }}
              >
                {tName}
              </button>
            ))}
          </div>
        </div>

        <div className="table-container">
          <table className="society-table">
            <thead>
              <tr>
                <th>Tower Name</th>
                <th>Units Occupied / Total</th>
                <th>Occupancy %</th>
                <th>Active Complains</th>
                <th>Energy Metric</th>
                <th>Water Metric</th>
              </tr>
            </thead>
            <tbody>
              {filteredTowers.map(report => {
                const occupancyPercent = ((report.occupied / report.total) * 100).toFixed(1);
                return (
                  <tr key={report.tower}>
                    <td style={{ fontWeight: "700" }}>{report.tower}</td>
                    <td>{report.occupied} / {report.total} Units</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ flex: 1, height: "6px", width: "80px", backgroundColor: "var(--color-ice)", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ width: `${occupancyPercent}%`, height: "100%", backgroundColor: "var(--color-mint)" }}></div>
                        </div>
                        <span>{occupancyPercent}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${report.complaints > 4 ? "badge-danger" : "badge-warning"}`}>
                        {report.complaints} Open
                      </span>
                    </td>
                    <td>{report.energy}</td>
                    <td>{report.water}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complaint Heatmap Simulation */}
      <div className="society-card" style={{ gridColumn: "span 2" }}>
        <div className="card-header">
          <h3 className="card-title">
            <AlertTriangle size={18} style={{ color: "var(--color-sage)" }} />
            Complex Incident Heatmaps (Last 30 Days)
          </h3>
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--color-sage)", marginBottom: "1rem" }}>
          Heatmap reflects categories of maintenance dispatch requested by towers. Visualized to track aging infrastructure.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          <div style={{ border: "1px solid rgba(59,65,60,0.05)", padding: "0.75rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-ice)" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--color-sage)", fontWeight: "600" }}>PLUMBING SEEPAGE</span>
            <div style={{ fontSize: "1.1rem", fontWeight: "700", margin: "0.25rem 0", color: "#ef4444" }}>42% Heat</div>
            <div style={{ height: "4px", backgroundColor: "rgba(59,65,60,0.1)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "42%", height: "100%", backgroundColor: "#ef4444" }}></div>
            </div>
            <span style={{ fontSize: "0.6rem", color: "var(--color-sage)", display: "block", marginTop: "0.25rem" }}>Highest in Tower D shaft</span>
          </div>

          <div style={{ border: "1px solid rgba(59,65,60,0.05)", padding: "0.75rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-ice)" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--color-sage)", fontWeight: "600" }}>LIFT MALFUNCTION</span>
            <div style={{ fontSize: "1.1rem", fontWeight: "700", margin: "0.25rem 0", color: "#f59e0b" }}>15% Heat</div>
            <div style={{ height: "4px", backgroundColor: "rgba(59,65,60,0.1)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "15%", height: "100%", backgroundColor: "#f59e0b" }}></div>
            </div>
            <span style={{ fontSize: "0.6rem", color: "var(--color-sage)", display: "block", marginTop: "0.25rem" }}>Tower C Lift B resolving</span>
          </div>

          <div style={{ border: "1px solid rgba(59,65,60,0.05)", padding: "0.75rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-ice)" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--color-sage)", fontWeight: "600" }}>ELECTRICAL GRID</span>
            <div style={{ fontSize: "1.1rem", fontWeight: "700", margin: "0.25rem 0", color: "var(--color-mint)" }}>8% Heat</div>
            <div style={{ height: "4px", backgroundColor: "rgba(59,65,60,0.1)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "8%", height: "100%", backgroundColor: "var(--color-mint)" }}></div>
            </div>
            <span style={{ fontSize: "0.6rem", color: "var(--color-sage)", display: "block", marginTop: "0.25rem" }}>Solar feeds normal</span>
          </div>
        </div>
      </div>
    </div>
  )
}

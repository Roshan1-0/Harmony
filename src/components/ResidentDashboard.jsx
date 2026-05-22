import React from "react"
import { useSociety } from "../context/SocietyContext"
import { 
  CreditCard, 
  Package, 
  Vote, 
  ShieldCheck, 
  Compass, 
  ArrowRight,
  TrendingUp,
  Droplet
} from "lucide-react"

export default function ResidentDashboard() {
  const { 
    invoices, 
    packages, 
    polls, 
    visitors, 
    setActiveTab, 
    triggerSOS 
  } = useSociety()

  // Get unpaid dues summary
  const unpaidInvoices = invoices.filter(inv => inv.status === "Unpaid")
  const totalDuesAmount = unpaidInvoices.reduce((sum, inv) => 
    sum + inv.maintenance + inv.sinkingFund + inv.waterCharge + inv.electricityCharge, 0
  )

  // Get active packages awaiting pickup
  const activePackages = packages.filter(pkg => pkg.status === "Awaiting Pickup")

  // Get active open polls
  const openPolls = polls.filter(p => !p.voted)

  // Get today's gate checkins
  const todayGuests = visitors.filter(v => v.status === "Checked In" && v.type === "Guest")

  return (
    <div className="dashboard-grid">
      {/* Premium Resident Welcome Card */}
      <div className="dashboard-hero-card">
        <span className="text-label" style={{ color: "var(--color-mint)" }}>Welcome back, Resident</span>
        <h1 className="dashboard-hero-title">Aishwarya Sen • Unit B-804</h1>
        <p className="dashboard-hero-desc">
          Your complex is fully operational today. Main access gates are running at optimal speed, 
          water reservoirs are at 86% capacity, and solar panels are feeding 18.2 kW to your tower's local grid.
        </p>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
          <button 
            className="form-btn" 
            style={{ backgroundColor: "var(--color-mint)", color: "var(--color-charcoal)" }}
            onClick={() => setActiveTab("security")}
          >
            Pre-Approve a Guest
          </button>
          <button 
            className="form-btn" 
            style={{ backgroundColor: "#ef4444", color: "#ffffff" }}
            onClick={() => triggerSOS("Tower B")}
          >
            Trigger Tower B SOS
          </button>
        </div>
      </div>

      {/* Critical Actions Column 1 */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <CreditCard size={18} style={{ color: "var(--color-sage)" }} />
            Upcoming Dues
          </h3>
          <button className="card-action" onClick={() => setActiveTab("finance")}>Pay Now</button>
        </div>
        
        {unpaidInvoices.length > 0 ? (
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <span className="metric-label">Outstanding Balance</span>
              <div className="metric-val" style={{ color: "#ef4444" }}>₹{totalDuesAmount.toLocaleString()}</div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-sage)", marginTop: "0.25rem" }}>
                Next invoice due by {new Date(unpaidInvoices[0].dueDate).toLocaleDateString()}
              </p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", justify: "space-between", fontSize: "0.75rem", padding: "0.35rem 0.5rem", background: "var(--color-ice)", borderRadius: "var(--radius-sm)" }}>
                <span>Maintenance Fund</span>
                <span style={{ fontWeight: "700" }}>₹{unpaidInvoices[0].maintenance}</span>
              </div>
              <div style={{ display: "flex", justify: "space-between", fontSize: "0.75rem", padding: "0.35rem 0.5rem", background: "var(--color-ice)", borderRadius: "var(--radius-sm)" }}>
                <span>Electricity & Water Charges</span>
                <span style={{ fontWeight: "700" }}>₹{unpaidInvoices[0].electricityCharge + unpaidInvoices[0].waterCharge}</span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <span className="badge badge-success" style={{ marginBottom: "0.5rem" }}>No Pending Dues</span>
            <p style={{ fontSize: "0.8rem", color: "var(--color-sage)" }}>You've cleared all society ledger balances. Thank you!</p>
          </div>
        )}
      </div>

      {/* Package Lockers */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <Package size={18} style={{ color: "var(--color-sage)" }} />
            Smart Parcel Alert
          </h3>
          <button className="card-action" onClick={() => setActiveTab("courier")}>View Locker</button>
        </div>
        
        {activePackages.length > 0 ? (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ background: "rgba(148,209,190,0.2)", padding: "0.5rem", borderRadius: "50%", color: "var(--color-charcoal)" }}>
                <Package size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: "0.85rem", fontWeight: "700" }}>{activePackages[0].courier} Delivery</h4>
                <p style={{ fontSize: "0.75rem", color: "var(--color-sage)" }}>Locker: {activePackages[0].lockerNo}</p>
              </div>
            </div>
            
            <div style={{ border: "1px dashed var(--color-mint)", padding: "0.75rem", borderRadius: "var(--radius-md)", textAlign: "center", backgroundColor: "var(--color-ice)" }}>
              <span className="metric-label" style={{ display: "block" }}>Locker Access Code</span>
              <strong style={{ fontSize: "1.25rem", letterSpacing: "3px", color: "var(--color-charcoal)" }}>{activePackages[0].otp}</strong>
              <p style={{ fontSize: "0.65rem", color: "var(--color-sage)", marginTop: "0.25rem" }}>Enter code on locker pad or click Claim inside menu.</p>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <p style={{ fontSize: "0.8rem", color: "var(--color-sage)" }}>No packages waiting in your towers' digital locker array today.</p>
          </div>
        )}
      </div>

      {/* Community Polls / Governance */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <Vote size={18} style={{ color: "var(--color-sage)" }} />
            Active Voting
          </h3>
          <button className="card-action" onClick={() => setActiveTab("governance")}>Go Vote</button>
        </div>
        
        {openPolls.length > 0 ? (
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: "600", marginBottom: "1rem", lineHeight: "1.4" }}>
              "{openPolls[0].question}"
            </p>
            <div style={{ fontSize: "0.7rem", color: "var(--color-sage)", display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(59,65,60,0.05)", paddingTop: "0.5rem" }}>
              <span>{openPolls[0].votersCount} votes cast so far</span>
              <span>Expires {new Date(openPolls[0].expiresAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <p style={{ fontSize: "0.8rem", color: "var(--color-sage)" }}>No active votes requiring your immediate attention.</p>
          </div>
        )}
      </div>

      {/* Security Check-in Activity */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <ShieldCheck size={18} style={{ color: "var(--color-sage)" }} />
            Visitor Log
          </h3>
          <button className="card-action" onClick={() => setActiveTab("security")}>Logs</button>
        </div>

        {todayGuests.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {todayGuests.map(guest => (
              <div key={guest.id} style={{ display: "flex", justify: "space-between", alignItems: "center", padding: "0.5rem", borderRadius: "var(--radius-sm)", border: "1px solid rgba(59,65,60,0.05)" }}>
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: "700" }}>{guest.name}</div>
                  <span style={{ fontSize: "0.65rem", color: "var(--color-sage)" }}>Checked In • {new Date(guest.entryTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <span className="badge badge-success">On Site</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <p style={{ fontSize: "0.8rem", color: "var(--color-sage)" }}>No active guest visitors logged inside your apartment unit today.</p>
          </div>
        )}
      </div>

      {/* Society Smart Tips / Recommendations */}
      <div className="society-card" style={{ gridColumn: "span 2" }}>
        <div className="card-header">
          <h3 className="card-title">
            <Compass size={18} style={{ color: "var(--color-sage)" }} />
            Society Dynamic Recommendations
          </h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <div style={{ backgroundColor: "var(--color-ice)", padding: "1rem", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--color-mint)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <TrendingUp size={16} style={{ color: "var(--color-charcoal)" }} />
              <strong style={{ fontSize: "0.75rem" }}>Power Conservation Window</strong>
            </div>
            <p style={{ fontSize: "0.7rem", color: "var(--color-charcoal-60)", lineHeight: "1.4" }}>
              Grid electricity rates drop by 15% between 1:00 PM and 4:00 PM due to maximum solar injection. Consider running laundry appliances then!
            </p>
          </div>

          <div style={{ backgroundColor: "var(--color-ice)", padding: "1rem", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--color-sage)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Droplet size={16} style={{ color: "var(--color-charcoal)" }} />
              <strong style={{ fontSize: "0.75rem" }}>Water Recycling Stats</strong>
            </div>
            <p style={{ fontSize: "0.7rem", color: "var(--color-charcoal-60)", lineHeight: "1.4" }}>
              Echo Dwell's STP recycled 14,000 liters of greywater today for tower irrigation, saving roughly ₹2,400 from our local municipal sinking supply budget.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

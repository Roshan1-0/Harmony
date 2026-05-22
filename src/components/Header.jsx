import React, { useState } from "react"
import { useSociety } from "../context/SocietyContext"
import { Bell, X, ShieldAlert, CheckCircle } from "lucide-react"

export default function Header() {
  const {
    role,
    setRole,
    activeTab,
    alerts,
    clearAlert,
    lockdownMode,
  } = useSociety()

  const [showNotifications, setShowNotifications] = useState(false)

  // Map active tabs to human-readable labels and descriptions
  const tabTitles = {
    dashboard: { title: "Society Hub", desc: "Real-time overview of Echo Dwell Heights" },
    security: { title: "Gate & Security Control", desc: "Pre-approvals, logs, and lockdown systems" },
    parking: { title: "Vehicle & Parking Space", desc: "Resident slot visualization and EV charging booking" },
    utilities: { title: "Utility Monitoring", desc: "Consumption analytics and green energy dashboards" },
    finance: { title: "Ledger & Finance Hub", desc: "Sinking funds, recurring billing, and vendor invoices" },
    maintenance: { title: "Maintenance & SLA Coordinator", desc: "Workforce status, spare parts, and active repair tickets" },
    courier: { title: "Smart Couriers & Lockers", desc: "Courier tracking and secure OTP locker pickups" },
    governance: { title: "Governance & Society Votes", desc: "Anonymous polling, AGM records, and proposals" },
  }

  const currentTab = tabTitles[activeTab] || { title: "Echo Dwell", desc: "Housing Society Hub" }

  return (
    <header className="header">
      {/* Left side Section Description */}
      <div className="header-left">
        <div className="header-title-container">
          <h2 className="header-title">{currentTab.title}</h2>
          <span className="header-subtitle">{currentTab.desc}</span>
        </div>
      </div>

      {/* Right side interactive features */}
      <div className="header-right">
        {/* Interactive Role Switcher Toggle */}
        <div className="role-switcher">
          <button
            onClick={() => setRole("resident")}
            className={`role-btn ${role === "resident" ? "is-active" : ""}`}
          >
            Resident
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`role-btn ${role === "admin" ? "is-active" : ""}`}
          >
            Admin
          </button>
        </div>

        {/* Smart Alerts and Notifications Engine */}
        <div style={{ position: "relative" }}>
          <button
            className="header-bell"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
          >
            <Bell size={18} />
            {alerts.length > 0 && (
              <span className="header-bell-badge">{alerts.length}</span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: "48px",
                right: "0",
                width: "320px",
                backgroundColor: "white",
                borderRadius: "var(--radius-md)",
                boxShadow: "0 10px 25px rgba(59,65,60,0.15)",
                border: "1px solid rgba(59,65,60,0.1)",
                zIndex: "999",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "0.75rem 1rem",
                  borderBottom: "1px solid rgba(59,65,60,0.08)",
                  display: "flex",
                  justifyContent: "between",
                  alignItems: "center",
                  backgroundColor: "#f7faf9",
                }}
              >
                <span style={{ fontSize: "0.8rem", fontWeight: "700" }}>System Alerts ({alerts.length})</span>
                <button
                  onClick={() => setShowNotifications(false)}
                  style={{ color: "var(--color-sage)" }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ maxHeight: "280px", overflowY: "auto" }}>
                {alerts.length === 0 ? (
                  <div
                    style={{
                      padding: "2rem",
                      textAlign: "center",
                      color: "var(--color-sage)",
                      fontSize: "0.8rem",
                    }}
                  >
                    <CheckCircle size={28} style={{ margin: "0 auto 0.5rem", color: "var(--color-mint)" }} />
                    All systems fully functional.
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div
                      key={alert.id}
                      style={{
                        padding: "0.75rem 1rem",
                        borderBottom: "1px solid rgba(59,65,60,0.05)",
                        display: "flex",
                        gap: "0.5rem",
                        fontSize: "0.75rem",
                        transition: "background 0.2s",
                      }}
                      hover={{ backgroundColor: "var(--color-ice)" }}
                    >
                      <ShieldAlert
                        size={16}
                        style={{
                          flexShrink: 0,
                          color: alert.priority === "High" || alert.priority.includes("SOS") ? "#ef4444" : "#f59e0b",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: "700", color: "#3b413c" }}>[{alert.priority}] </span>
                        {alert.message}
                        <div style={{ color: "var(--color-sage)", fontSize: "0.65rem", marginTop: "0.2rem" }}>
                          {new Date(alert.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <button
                        onClick={() => clearAlert(alert.id)}
                        style={{ color: "var(--color-sage)" }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Identity Avatar */}
        <div className="header-profile">
          <img
            src={
              role === "resident"
                ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
            }
            alt="User profile"
            className="profile-avatar"
          />
          <div className="profile-info">
            <span className="profile-name">
              {role === "resident" ? "Aishwarya Sen" : "Commander Roy"}
            </span>
            <span className="profile-role">
              {role === "resident" ? "Resident (B-804)" : "Chief Operations Officer"}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

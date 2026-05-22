import React, { useState } from "react"
import { useSociety } from "../context/SocietyContext"
import {
  LayoutDashboard,
  ShieldCheck,
  Zap,
  Car,
  Receipt,
  Wrench,
  Package,
  Vote,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react"

export default function Sidebar() {
  const { activeTab, setActiveTab, role, lockdownMode, toggleLockdown } = useSociety()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "security", label: "Security & SOS", icon: ShieldCheck },
    { id: "parking", label: "Smart Parking", icon: Car },
    { id: "utilities", label: "Utility Tracker", icon: Zap },
    { id: "finance", label: "Billing & Funds", icon: Receipt },
    { id: "maintenance", label: "Maintenance Hub", icon: Wrench },
    { id: "courier", label: "Smart Lockers", icon: Package },
    { id: "governance", label: "Governance & Polls", icon: Vote },
  ]

  return (
    <aside className={`sidebar ${isCollapsed ? "is-collapsed" : ""}`}>
      {/* Sidebar Brand Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">E</div>
        {!isCollapsed && <span className="sidebar-logo-text">Echo Dwell</span>}
      </div>

      {/* Main Navigation links */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-link ${isActive ? "is-active" : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <Icon className="sidebar-link-icon" />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Sidebar Footer containing lockdown action & collapse button */}
      <div className="sidebar-footer">
        {role === "admin" && (
          <button
            onClick={toggleLockdown}
            className="sidebar-link"
            style={{
              backgroundColor: lockdownMode ? "#ef4444" : "rgba(239, 68, 68, 0.1)",
              color: lockdownMode ? "#ffffff" : "#ef4444",
              border: "1px solid #ef4444",
              marginBottom: "0.5rem",
              borderRadius: "var(--radius-md)",
            }}
            title={isCollapsed ? "Lockdown Society" : ""}
          >
            <ShieldAlert className="sidebar-link-icon" />
            {!isCollapsed && <span>{lockdownMode ? "LOCKED DOWN" : "Gate Lockdown"}</span>}
          </button>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="sidebar-collapse-btn"
        >
          {isCollapsed ? (
            <ChevronRight className="sidebar-link-icon" />
          ) : (
            <>
              <ChevronLeft className="sidebar-link-icon" />
              <span>Collapse Sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}

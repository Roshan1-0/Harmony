import React, { useState } from "react"
import { useSociety } from "../context/SocietyContext"
import { Package, Lock, Unlock, QrCode, ShieldAlert, CheckCircle } from "lucide-react"

export default function CourierLocker() {
  const { packages, claimPackage } = useSociety()
  
  // Locker keypad states
  const [selectedPkgId, setSelectedPkgId] = useState("")
  const [enteredOTP, setEnteredOTP] = useState("")

  const handleKeypadPress = (val) => {
    if (enteredOTP.length >= 4) return
    setEnteredOTP(prev => prev + val)
  }

  const handleClearKeypad = () => {
    setEnteredOTP("")
  }

  const handleVerifyOTP = () => {
    if (!selectedPkgId) {
      alert("Please select a package awaiting pickup from the table first.")
      return
    }
    if (enteredOTP.length !== 4) {
      alert("Please key in the full 4-digit security OTP code.")
      return
    }

    const response = claimPackage(selectedPkgId, enteredOTP)
    if (response.success) {
      alert(response.message)
      setSelectedPkgId("")
      setEnteredOTP("")
    } else {
      alert(response.message)
      setEnteredOTP("")
    }
  }

  return (
    <div className="dashboard-grid">

      {/* Package Locker list */}
      <div className="society-card" style={{ gridColumn: "span 2" }}>
        <div className="card-header">
          <h3 className="card-title">
            <Package size={18} style={{ color: "var(--color-sage)" }} />
            Your Smart Tower Parcel Hub
          </h3>
          <span className="badge badge-info">Sensors Armed</span>
        </div>

        <p style={{ fontSize: "0.75rem", color: "var(--color-sage)", marginBottom: "1rem" }}>
          Parcels are dropped into digital smart lockers by delivery riders. 
          Select an <strong>Awaiting Pickup</strong> parcel to unlock it on the right keypad.
        </p>

        <div className="table-container">
          <table className="society-table">
            <thead>
              <tr>
                <th>Locker Bay</th>
                <th>Courier Rider</th>
                <th>Tracking Reference</th>
                <th>Locker status</th>
                <th>Credentials (OTP)</th>
                <th>Select Locker</th>
              </tr>
            </thead>
            <tbody>
              {packages.map(pkg => (
                <tr 
                  key={pkg.id} 
                  style={{ 
                    backgroundColor: selectedPkgId === pkg.id ? "var(--color-ice)" : "transparent",
                    transition: "all var(--duration-fast)" 
                  }}
                >
                  <td style={{ fontWeight: "700" }}>{pkg.lockerNo}</td>
                  <td>{pkg.courier}</td>
                  <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{pkg.trackingId}</td>
                  <td>
                    <span className={`badge ${pkg.status === "Picked Up" ? "badge-success" : "badge-warning"}`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: "700", letterSpacing: "2px" }}>
                    {pkg.status === "Picked Up" ? "Claimed" : pkg.otp}
                  </td>
                  <td>
                    {pkg.status === "Awaiting Pickup" ? (
                      <button 
                        onClick={() => {
                          setSelectedPkgId(pkg.id)
                          setEnteredOTP("")
                        }}
                        className="card-action"
                        style={{ 
                          backgroundColor: selectedPkgId === pkg.id ? "var(--color-charcoal)" : "var(--color-ice)",
                          color: selectedPkgId === pkg.id ? "var(--color-white)" : "var(--color-charcoal)" 
                        }}
                      >
                        {selectedPkgId === pkg.id ? "Selected" : "Tap Locker"}
                      </button>
                    ) : (
                      <span style={{ fontSize: "0.7rem", color: "var(--color-sage)" }}>Locker Vacant</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Keypad Simulator */}
      <div className="society-card">
        <div className="card-header" style={{ borderBottom: "1px solid rgba(59,65,60,0.05)", paddingBottom: "0.75rem" }}>
          <h3 className="card-title">
            <Lock size={18} style={{ color: selectedPkgId ? "#f59e0b" : "var(--color-sage)" }} />
            Locker Terminal Pad
          </h3>
        </div>

        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <span className="metric-label" style={{ display: "block", marginBottom: "0.5rem" }}>
            {selectedPkgId ? `Bay: ${packages.find(p=>p.id === selectedPkgId)?.lockerNo}` : "SELECT LOCKER FIRST"}
          </span>

          {/* 4-digit display */}
          <div style={{ display: "flex", justify: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {[...Array(4)].map((_, idx) => {
              const digit = enteredOTP[idx] || ""
              return (
                <div 
                  key={idx} 
                  className={`otp-display-digit ${digit ? "filled" : ""}`}
                >
                  {digit ? "•" : ""}
                </div>
              )
            })}
          </div>

          {/* Keypad */}
          <div className="otp-keypad">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(num => (
              <button 
                key={num} 
                className="otp-key-btn" 
                onClick={() => handleKeypadPress(num)}
              >
                {num}
              </button>
            ))}
            <button 
              className="otp-key-btn" 
              style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", fontSize: "0.8rem" }}
              onClick={handleClearKeypad}
            >
              Clear
            </button>
            <button 
              className="otp-key-btn" 
              onClick={() => handleKeypadPress("0")}
            >
              0
            </button>
            <button 
              className="otp-key-btn" 
              style={{ backgroundColor: "rgba(148, 209, 190, 0.2)", color: "var(--color-charcoal)", fontSize: "0.8rem" }}
              onClick={handleVerifyOTP}
            >
              OK
            </button>
          </div>
        </div>
      </div>

      {/* Visual Locker Grid array */}
      <div className="society-card" style={{ gridColumn: "span 3" }}>
        <div className="card-header">
          <h3 className="card-title">
            <QrCode size={18} style={{ color: "var(--color-sage)" }} />
            Digital Smart Locker Arrays (Main Lobby)
          </h3>
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--color-sage)", marginBottom: "1rem" }}>
          Visual layout of physical locker boxes mounted in the lobby tower corridors. Green reflects vacant lockers, Sage indicates loaded lockers containing uncollected resident parcels.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "0.5rem" }}>
          {/* Locker mockup boxes */}
          {[...Array(16)].map((_, i) => {
            const lockerLabel = `Locker ${i < 8 ? 'A' : 'B'}-${i < 8 ? i+1 : i-7}`
            const matchedPkg = packages.find(p => p.lockerNo.includes(lockerLabel) && p.status === "Awaiting Pickup")
            const isSelected = selectedPkgId && packages.find(p=>p.id === selectedPkgId)?.lockerNo.includes(lockerLabel)
            
            let bg = "var(--color-ice)"
            let color = "var(--color-charcoal)"
            let border = "1px solid rgba(59,65,60,0.1)"

            if (matchedPkg) {
              bg = "var(--color-sage)"
              color = "white"
            }
            if (isSelected) {
              border = "2.5px solid var(--color-charcoal)"
              bg = "var(--color-mint)"
              color = "var(--color-charcoal)"
            }

            return (
              <div 
                key={i} 
                style={{ 
                  backgroundColor: bg, 
                  color: color, 
                  border: border,
                  padding: "0.75rem 0.25rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.6rem",
                  fontWeight: "700",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px"
                }}
              >
                {matchedPkg ? <Lock size={10} /> : <Unlock size={10} style={{ color: "var(--color-sage)" }} />}
                <span>{lockerLabel}</span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

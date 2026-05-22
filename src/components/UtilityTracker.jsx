import React, { useState } from "react"
import { useSociety } from "../context/SocietyContext"
import { UTILITY_CONSUMPTION } from "../utils/mockData"
import { Zap, Droplet, Sun, ShieldAlert, Cpu, Trash2 } from "lucide-react"

export default function UtilityTracker() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(4) // May index

  const electricityData = UTILITY_CONSUMPTION.electricity
  const waterData = UTILITY_CONSUMPTION.water
  const generatorData = UTILITY_CONSUMPTION.generatorBackup

  // Current values
  const curElec = electricityData[selectedMonthIndex]
  const curWater = waterData[selectedMonthIndex]
  const curGen = generatorData[selectedMonthIndex]

  // Calculate percentage of solar off-grid
  const solarPercentage = ((curElec.solar / curElec.usage) * 100).toFixed(1)

  return (
    <div className="dashboard-grid">

      {/* Main Consumption Grid Cards */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <Zap size={18} style={{ color: "var(--color-sage)" }} />
            Grid Electricity
          </h3>
          <span className="badge badge-success">Eco-balanced</span>
        </div>
        <span className="metric-label">Monthly usage</span>
        <div className="metric-val">{curElec.usage.toLocaleString()} kWh</div>
        <p style={{ fontSize: "0.75rem", color: "var(--color-sage)", marginTop: "0.25rem" }}>
          Solar contributed <strong>{curElec.solar} kWh</strong> ({solarPercentage}%) off-grid.
        </p>
      </div>

      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <Droplet size={18} style={{ color: "var(--color-sage)" }} />
            Water Consumption
          </h3>
          <span className="badge badge-warning">Leakage Alert</span>
        </div>
        <span className="metric-label">Towers Total Intake</span>
        <div className="metric-val">{curWater.usage.toLocaleString()} L</div>
        <p style={{ fontSize: "0.75rem", color: "#f59e0b", marginTop: "0.25rem" }}>
          ⚠️ Tower B reservoir flow is 12% above average. Check plumbing.
        </p>
      </div>

      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <Sun size={18} style={{ color: "var(--color-mint)" }} />
            Solar Generation
          </h3>
          <span className="badge badge-success">Optimal</span>
        </div>
        <span className="metric-label">Live Roof Feed</span>
        <div className="metric-val" style={{ color: "var(--color-mint)" }}>18.2 kW</div>
        <p style={{ fontSize: "0.75rem", color: "var(--color-sage)", marginTop: "0.25rem" }}>
          Offsetting roughly 1.8 metric tons of CO₂ emissions this week.
        </p>
      </div>

      {/* Custom Bar Comparison Graph for Electricity vs Solar */}
      <div className="society-card" style={{ gridColumn: "span 2" }}>
        <div className="card-header" style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
          <h3 className="card-title">
            <Zap size={18} style={{ color: "var(--color-sage)" }} />
            Grid Usage vs Solar Generation (Monthly Trends)
          </h3>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--color-sage)" }}>█ Grid</span>
            <span style={{ fontSize: "0.7rem", color: "var(--color-mint)" }}>█ Solar</span>
          </div>
        </div>

        <div className="analytics-chart-container">
          {electricityData.map((data, idx) => {
            const gridH = (data.usage / 8000) * 100
            const solarH = (data.solar / 8000) * 100
            return (
              <div 
                key={data.month} 
                className="bar-wrapper"
                onClick={() => setSelectedMonthIndex(idx)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: "120px" }}>
                  <div 
                    className="bar-stack primary" 
                    style={{ 
                      height: `${gridH}%`, 
                      width: "16px",
                      opacity: selectedMonthIndex === idx ? 1 : 0.7 
                    }}
                  >
                    <span className="bar-tooltip">{data.usage} kWh</span>
                  </div>
                  <div 
                    className="bar-stack accent" 
                    style={{ 
                      height: `${solarH}%`, 
                      width: "16px",
                      opacity: selectedMonthIndex === idx ? 1 : 0.7 
                    }}
                  >
                    <span className="bar-tooltip">{data.solar} kWh Solar</span>
                  </div>
                </div>
                <span className="bar-label" style={{ fontWeight: selectedMonthIndex === idx ? "700" : "500" }}>{data.month}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Generator backup & Fuel panel */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <Cpu size={18} style={{ color: "var(--color-sage)" }} />
            Generator Backups
          </h3>
        </div>
        <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <span className="metric-label">Diesel Level</span>
            <div style={{ fontSize: "1.2rem", fontWeight: "700" }}>840 Liters</div>
          </div>
          <div style={{ width: "80px", height: "12px", border: "1px solid rgba(59,65,60,0.1)", borderRadius: "var(--radius-full)", overflow: "hidden", backgroundColor: "var(--color-ice)" }}>
            <div style={{ width: "72%", height: "100%", backgroundColor: "var(--color-mint)" }}></div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.75rem" }}>
          <div style={{ display: "flex", justify: "space-between", paddingBottom: "0.25rem", borderBottom: "1px solid rgba(59,65,60,0.05)" }}>
            <span>Outages this month</span>
            <strong>{curGen.runs} runs</strong>
          </div>
          <div style={{ display: "flex", justify: "space-between", paddingBottom: "0.25rem", borderBottom: "1px solid rgba(59,65,60,0.05)" }}>
            <span>Fuel consumed</span>
            <strong>{curGen.fuel}</strong>
          </div>
          <div style={{ display: "flex", justify: "space-between" }}>
            <span>Auto-switchover grid</span>
            <span style={{ color: "#10b981", fontWeight: "700" }}>ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Abnormal Usage Alerts & Flow Sensors */}
      <div className="society-card" style={{ gridColumn: "span 2" }}>
        <div className="card-header">
          <h3 className="card-title">
            <ShieldAlert size={18} style={{ color: "#ef4444" }} />
            Telemetry Alerts & Leak Detections
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", padding: "0.75rem", borderRadius: "var(--radius-md)", backgroundColor: "#fffbeb", borderLeft: "4px solid #f59e0b" }}>
            <ShieldAlert size={18} style={{ color: "#f59e0b", flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: "0.75rem", display: "block" }}>TOWER B FLOW DEVIATION DETECTED</strong>
              <p style={{ fontSize: "0.7rem", color: "#92400e", lineHeight: "1.4" }}>
                Water flow sensor B-WS-804 registers non-zero flow of 12 liters/hour consistently between 2 AM and 4 AM. 
                Suspected continuous flush tank seepage or pipeline crack. Dispatch initiated.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", padding: "0.75rem", borderRadius: "var(--radius-md)", backgroundColor: "#ecfdf5", borderLeft: "4px solid #10b981" }}>
            <Sun size={18} style={{ color: "#10b981", flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: "0.75rem", display: "block" }}>MAX SOLAR PEAK REACHED (18.2 kW)</strong>
              <p style={{ fontSize: "0.7rem", color: "#065f46", lineHeight: "1.4" }}>
                Solar arrays C & D roof grid reached peak threshold. Excess energy exported back to regional grid meters, 
                yielding ledger credits to the society sinking fund.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Waste Management reports */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <Trash2 size={18} style={{ color: "var(--color-sage)" }} />
            Waste & Segregation
          </h3>
        </div>
        <span className="metric-label">Daily Collection Load</span>
        <div className="metric-val">420 kg</div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem", fontSize: "0.7rem" }}>
          <div>
            <div style={{ display: "flex", justify: "space-between", marginBottom: "2px" }}>
              <span>Organic/Wet Segregation</span>
              <strong style={{ color: "#10b981" }}>86% segregated</strong>
            </div>
            <div style={{ height: "4px", backgroundColor: "rgba(59,65,60,0.1)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "86%", height: "100%", backgroundColor: "#10b981" }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justify: "space-between", marginBottom: "2px" }}>
              <span>Dry / Recyclables</span>
              <strong style={{ color: "var(--color-mint)" }}>92% segregated</strong>
            </div>
            <div style={{ height: "4px", backgroundColor: "rgba(59,65,60,0.1)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "92%", height: "100%", backgroundColor: "var(--color-mint)" }}></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

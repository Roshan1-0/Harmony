import React, { useState } from "react"
import { useSociety } from "../context/SocietyContext"
import { PARKING_SLOTS } from "../utils/mockData"
import { Car, Zap, FileWarning, HelpCircle, CheckCircle, Info } from "lucide-react"

export default function ParkingSpace() {
  const { parkingBookings, bookEVSlot } = useSociety()
  
  // Selection states
  const [selectedTower, setSelectedTower] = useState("TowerA")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [selectedHour, setSelectedHour] = useState("10") // 24-hr format hour
  
  // Violations list state
  const [violations, setViolations] = useState([
    { id: "VIO-112", slot: "B-P03", vehicle: "KA-05-TR-2144", offense: "Unauthorized parking in designated owner spot", time: "2026-05-22T12:00:00Z" }
  ])
  const [violationSlot, setViolationSlot] = useState("")
  const [violationVehicle, setViolationVehicle] = useState("")
  const [violationOffense, setViolationOffense] = useState("")

  // EV Slot Book Form submit handler
  const handleEVBookingSubmit = (e) => {
    e.preventDefault()
    if (!selectedSlot) {
      alert("Please select a dashed green EV charging bay on the map first.")
      return
    }
    const success = bookEVSlot(selectedSlot, selectedHour)
    if (success) {
      alert(`Slot ${selectedSlot} successfully reserved for ${selectedHour}:00! State synchronized.`)
    } else {
      alert(`Booking conflict: Slot ${selectedSlot} is already reserved for ${selectedHour}:00. Please select another slot or time.`)
    }
  }

  // Violation Submit handler
  const handleViolationSubmit = (e) => {
    e.preventDefault()
    if (!violationSlot || !violationVehicle || !violationOffense) return
    const newV = {
      id: `VIO-${Math.floor(100 + Math.random() * 900)}`,
      slot: violationSlot,
      vehicle: violationVehicle,
      offense: violationOffense,
      time: new Date().toISOString()
    }
    setViolations([newV, ...violations])
    setViolationSlot("")
    setViolationVehicle("")
    setViolationOffense("")
    alert("Infraction reported. Security staff dispatched to inspect wheels and issue citations.")
  }

  // Check if slot has booking for the selected hour
  const getSlotStatus = (slot) => {
    if (slot.status === "Occupied") return "occupied"
    const bookingKey = `${slot.id}-${selectedHour}`
    if (parkingBookings.includes(bookingKey)) return "booked"
    return "available"
  }

  return (
    <div className="dashboard-grid">

      {/* Interactive Parking Map Grid */}
      <div className="society-card" style={{ gridColumn: "span 2" }}>
        <div className="card-header" style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
          <h3 className="card-title">
            <Car size={18} style={{ color: "var(--color-sage)" }} />
            Gated Gantry Occupancy Map ({selectedHour}:00)
          </h3>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button 
              className="card-action"
              onClick={() => setSelectedTower("TowerA")}
              style={{ 
                backgroundColor: selectedTower === "TowerA" ? "var(--color-charcoal)" : "var(--color-ice)",
                color: selectedTower === "TowerA" ? "var(--color-white)" : "var(--color-charcoal)"
              }}
            >
              Tower A Gantry
            </button>
            <button 
              className="card-action"
              onClick={() => setSelectedTower("TowerB")}
              style={{ 
                backgroundColor: selectedTower === "TowerB" ? "var(--color-charcoal)" : "var(--color-ice)",
                color: selectedTower === "TowerB" ? "var(--color-white)" : "var(--color-charcoal)"
              }}
            >
              Tower B Gantry
            </button>
          </div>
        </div>

        <p style={{ fontSize: "0.75rem", color: "var(--color-sage)", marginBottom: "1rem" }}>
          Legend: <span style={{ color: "var(--color-charcoal-60)" }}>█ Occupied</span> | <span style={{ color: "#daf0ee" }}>█ Available</span> | <span style={{ borderBottom: "2px dashed var(--color-mint)", color: "var(--color-mint)" }}>⚡ EV Bay</span> | <span style={{ color: "var(--color-mint)" }}>█ Booked EV Hour</span>
        </p>

        <div className="parking-slots-grid">
          {PARKING_SLOTS[selectedTower].map(slot => {
            const status = getSlotStatus(slot)
            const isEV = slot.isEV
            const isSelected = selectedSlot === slot.id
            
            let cardBg = "var(--color-ice)"
            let cardBorder = "1px solid rgba(59, 65, 60, 0.1)"
            let fontColor = "var(--color-charcoal)"

            if (status === "occupied") {
              cardBg = "rgba(59,65,60,0.08)"
              fontColor = "var(--color-charcoal-30)"
            } else if (status === "booked") {
              cardBg = "var(--color-mint)"
              fontColor = "var(--color-charcoal)"
              cardBorder = "1px solid var(--color-mint)"
            }

            if (isSelected) {
              cardBorder = "2.5px solid var(--color-charcoal)"
            }

            return (
              <div 
                key={slot.id} 
                className={`parking-slot-card ${isEV ? "ev" : ""}`}
                style={{ 
                  backgroundColor: cardBg,
                  border: cardBorder,
                  color: fontColor
                }}
                onClick={() => {
                  if (status !== "occupied") {
                    setSelectedSlot(slot.id)
                  } else {
                    alert(`Slot ${slot.id} is occupied by resident ${slot.unit} vehicle permanently.`)
                  }
                }}
              >
                <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                  {isEV && <Zap size={10} style={{ color: "var(--color-mint)" }} />}
                  <span>{slot.id}</span>
                </div>
                <div style={{ fontSize: "0.55rem", opacity: 0.7, marginTop: "0.25rem" }}>
                  {status === "occupied" ? slot.unit : status === "booked" ? "⚡ Reserved" : "Vacant"}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* EV Charging Hourly Booker */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <Zap size={18} style={{ color: "var(--color-mint)" }} />
            Book EV charging Bay
          </h3>
        </div>

        <form onSubmit={handleEVBookingSubmit} className="society-form">
          <div className="form-group">
            <label className="form-label">Selected Charger Slot</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Select a dashed EV slot on map"
              value={selectedSlot}
              readOnly
              style={{ backgroundColor: "#f7faf9", cursor: "not-allowed" }}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hourly Booking Block</label>
            <select 
              className="form-select" 
              value={selectedHour} 
              onChange={(e) => setSelectedHour(e.target.value)}
            >
              <option value="09">09:00 AM - 10:00 AM</option>
              <option value="10">10:00 AM - 11:00 AM</option>
              <option value="11">11:00 AM - 12:00 PM</option>
              <option value="13">01:00 PM - 02:00 PM</option>
              <option value="14">02:00 PM - 03:00 PM</option>
              <option value="15">03:00 PM - 04:00 PM (Solar Peak)</option>
              <option value="18">06:00 PM - 07:00 PM</option>
              <option value="20">08:00 PM - 09:00 PM</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "0.25rem", alignItems: "center", backgroundColor: "var(--color-ice)", padding: "0.5rem", borderRadius: "var(--radius-sm)", border: "1px solid rgba(148, 209, 190, 0.3)" }}>
            <Info size={14} style={{ color: "var(--color-charcoal)", flexShrink: 0 }} />
            <span style={{ fontSize: "0.6rem", color: "var(--color-charcoal-60)", lineHeight: "1.3" }}>
              Solar credits automatically applied. Peak sun hours (1 PM - 4 PM) feature zero charging ledger surcharges.
            </span>
          </div>

          <button type="submit" className="form-btn" style={{ backgroundColor: "var(--color-mint)", color: "var(--color-charcoal)" }}>
            Reserve Charging Bay
          </button>
        </form>
      </div>

      {/* Allocated Vehicles Registry */}
      <div className="society-card" style={{ gridColumn: "span 2" }}>
        <div className="card-header">
          <h3 className="card-title">
            <Car size={18} style={{ color: "var(--color-sage)" }} />
            Resident Vehicle Registry
          </h3>
        </div>

        <div className="table-container">
          <table className="society-table">
            <thead>
              <tr>
                <th>Resident Unit</th>
                <th>Vehicle Model</th>
                <th>License Plate</th>
                <th>Allocated Slot</th>
                <th>RFID Token</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: "700" }}>B-804 (You)</td>
                <td>Tesla Model 3 / Blue</td>
                <td style={{ fontFamily: "monospace" }}>KA-03-MJ-5938</td>
                <td>B-P02 (EV Reserved)</td>
                <td><span className="badge badge-success">ACTIVE</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: "700" }}>A-101</td>
                <td>Hyundai Creta / White</td>
                <td style={{ fontFamily: "monospace" }}>KA-51-ND-0021</td>
                <td>A-P01</td>
                <td><span className="badge badge-success">ACTIVE</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: "700" }}>A-104</td>
                <td>Tata Nexon EV / Gray</td>
                <td style={{ fontFamily: "monospace" }}>KA-02-EL-4902</td>
                <td>A-P04 (EV Reserved)</td>
                <td><span className="badge badge-success">ACTIVE</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: "700" }}>B-301</td>
                <td>Honda City / Silver</td>
                <td style={{ fontFamily: "monospace" }}>KA-51-ZA-8931</td>
                <td>B-P01</td>
                <td><span className="badge badge-danger">EXPIRED</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Parking Violation Reporting Form & Logs */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <FileWarning size={18} style={{ color: "#ef4444" }} />
            Report Parking Violation
          </h3>
        </div>

        <form onSubmit={handleViolationSubmit} className="society-form">
          <div className="form-group">
            <label className="form-label">Offending Vehicle Plate No.</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. KA-03-XZ-9900"
              value={violationVehicle}
              onChange={(e) => setViolationVehicle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Parking Bay / Location</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. B-P03 or Tower C lane"
              value={violationSlot}
              onChange={(e) => setViolationSlot(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Violation Offense</label>
            <select 
              className="form-select"
              value={violationOffense}
              onChange={(e) => setViolationOffense(e.target.value)}
              required
            >
              <option value="">-- Select Offense --</option>
              <option value="Parking in designated private owner spot">Parking in owner spot</option>
              <option value="Blocking access / Double parking">Blocking access / Double parking</option>
              <option value="Non-EV vehicle parked in EV charging bay">Non-EV in charging bay</option>
              <option value="No visible society RFID gate sticker">No RFID gate sticker</option>
            </select>
          </div>

          <button type="submit" className="form-btn" style={{ backgroundColor: "#ef4444", color: "white" }}>
            File Infraction
          </button>
        </form>
      </div>

    </div>
  )
}

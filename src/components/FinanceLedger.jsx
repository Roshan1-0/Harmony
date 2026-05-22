import React, { useState } from "react"
import { useSociety } from "../context/SocietyContext"
import { FINANCIAL_OVERVIEW } from "../utils/mockData"
import { 
  Receipt, 
  CreditCard, 
  ArrowUpRight, 
  CheckCircle, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet
} from "lucide-react"

export default function FinanceLedger() {
  const { role, invoices, payInvoice } = useSociety()
  const [selectedReceipt, setSelectedReceipt] = useState(null)
  
  // Admin Vendor invoices state
  const [vendorBills, setVendorBills] = useState([
    { id: "VND-401", vendor: "Narmada Water Carriers", amount: 48500, category: "Water Supply", status: "Awaiting Committee Sign-Off", date: "2026-05-22" },
    { id: "VND-402", vendor: "Swift Security Ltd", amount: 120000, category: "Security Services", status: "Approved & Disbursed", date: "2026-05-18" },
    { id: "VND-403", vendor: "Otis Elevator Co", amount: 22000, category: "Lift AMC", status: "Awaiting Committee Sign-Off", date: "2026-05-21" },
  ])

  const handlePayInvoice = (id) => {
    payInvoice(id)
    const updated = invoices.find(inv => inv.id === id)
    if (updated) {
      alert(`Ledger balance cleared! Receipt RCP-${Math.floor(80000 + Math.random() * 19999)} issued under your unit.`)
    }
  }

  const handleApproveVendorBill = (id) => {
    setVendorBills(prev => prev.map(bill => 
      bill.id === id ? { ...bill, status: "Approved & Disbursed" } : bill
    ))
    alert(`Vendor payment ${id} authorized. Sinking funds dispatched via net banking API.`)
  }

  return (
    <div className="dashboard-grid">

      {/* Reserves Sinking Fund Overview */}
      <div className="society-card" style={{ gridColumn: "span 2" }}>
        <div className="card-header">
          <h3 className="card-title">
            <CreditCard size={18} style={{ color: "var(--color-sage)" }} />
            Society Reserve & Sinking Fund Ledgers
          </h3>
          <span className="badge badge-success">Audited FY2026</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div style={{ background: "var(--color-ice)", padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
            <span className="metric-label" style={{ display: "block" }}>General Maintenance Fund</span>
            <div className="metric-val" style={{ fontSize: "1.6rem" }}>{FINANCIAL_OVERVIEW.maintenanceFund}</div>
            <p style={{ fontSize: "0.7rem", color: "var(--color-sage)", marginTop: "0.25rem" }}>
              Allocated for daily plumbing repairs, gardening, and guard payrolls.
            </p>
          </div>

          <div style={{ background: "var(--color-ice)", padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
            <span className="metric-label" style={{ display: "block" }}>Capital Sinking Fund</span>
            <div className="metric-val" style={{ fontSize: "1.6rem", color: "var(--color-charcoal)" }}>{FINANCIAL_OVERVIEW.sinkingFund}</div>
            <p style={{ fontSize: "0.7rem", color: "var(--color-sage)", marginTop: "0.25rem" }}>
              Allocated for elevator overhauls, transformer replacements, and tower painting.
            </p>
          </div>
        </div>
      </div>

      {/* Mini Auditing reports */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <FileText size={18} style={{ color: "var(--color-sage)" }} />
            Tax & Audit Summaries
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.75rem" }}>
          <div style={{ display: "flex", justify: "space-between", borderBottom: "1px solid rgba(59,65,60,0.05)", paddingBottom: "0.25rem" }}>
            <span>GST Liability (18% Maintenance)</span>
            <strong>₹42,840</strong>
          </div>
          <div style={{ display: "flex", justify: "space-between", borderBottom: "1px solid rgba(59,65,60,0.05)", paddingBottom: "0.25rem" }}>
            <span>TDS Deductions (Vendor payments)</span>
            <strong>₹11,200</strong>
          </div>
          <div style={{ display: "flex", justify: "space-between" }}>
            <span>Auditing Auditor status</span>
            <span style={{ color: "#10b981", fontWeight: "700" }}>PASSED</span>
          </div>
        </div>

        <button 
          className="form-btn form-btn-secondary" 
          style={{ width: "100%", marginTop: "1rem", fontSize: "0.75rem" }}
          onClick={() => alert("Auditor ledger 'Echo_Dwell_Tax_Summary_FY2026.pdf' compiled successfully.")}
        >
          Download Signed Tax Ledger
        </button>
      </div>

      {/* Resident Billing / Invoices Ledger */}
      <div className="society-card" style={{ gridColumn: "span 3" }}>
        <div className="card-header">
          <h3 className="card-title">
            <Receipt size={18} style={{ color: "var(--color-sage)" }} />
            {role === "admin" ? "All Apartments Ledger Invoices" : "Your Unit Billings & Ledger Statements"}
          </h3>
        </div>

        <div className="table-container">
          <table className="society-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Billing Cycle</th>
                <th>Maintenance Fund</th>
                <th>Sinking Fund Share</th>
                <th>Utility Surcharge</th>
                <th>Grand Total</th>
                <th>Payment Status</th>
                <th>Action / Printable Ledger</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => {
                const total = inv.maintenance + inv.sinkingFund + inv.waterCharge + inv.electricityCharge
                return (
                  <tr key={inv.id}>
                    <td style={{ fontWeight: "700" }}>{inv.id}</td>
                    <td>{inv.month}</td>
                    <td>₹{inv.maintenance}</td>
                    <td>₹{inv.sinkingFund}</td>
                    <td>₹{inv.waterCharge + inv.electricityCharge}</td>
                    <td style={{ fontWeight: "700" }}>₹{total.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${inv.status === "Paid" ? "badge-success" : "badge-danger"}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      {inv.status === "Unpaid" ? (
                        <button 
                          onClick={() => handlePayInvoice(inv.id)}
                          className="card-action"
                          style={{ backgroundColor: "#ef4444", color: "white" }}
                        >
                          Clear Balance
                        </button>
                      ) : (
                        <button 
                          onClick={() => setSelectedReceipt(inv)}
                          className="card-action"
                          style={{ backgroundColor: "var(--color-ice)", color: "var(--color-charcoal)" }}
                        >
                          View Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Vendor Payment Approvals (Visible to Admin role) */}
      {role === "admin" && (
        <div className="society-card" style={{ gridColumn: "span 3" }}>
          <div className="card-header">
            <h3 className="card-title">
              <CheckCircle2 size={18} style={{ color: "var(--color-sage)" }} />
              Vendor Billing Approvals (Committee Dashboard)
            </h3>
            <span className="badge badge-warning">Awaiting Authorization</span>
          </div>

          <div className="table-container">
            <table className="society-table">
              <thead>
                <tr>
                  <th>Vendor ID</th>
                  <th>Vendor Name</th>
                  <th>Utility / Category</th>
                  <th>Invoice Amount</th>
                  <th>Invoiced Date</th>
                  <th>Approval Status</th>
                  <th>Sign-Off Action</th>
                </tr>
              </thead>
              <tbody>
                {vendorBills.map(bill => (
                  <tr key={bill.id}>
                    <td style={{ fontWeight: "700" }}>{bill.id}</td>
                    <td style={{ fontWeight: "600" }}>{bill.vendor}</td>
                    <td>{bill.category}</td>
                    <td style={{ fontWeight: "700" }}>₹{bill.amount.toLocaleString()}</td>
                    <td>{bill.date}</td>
                    <td>
                      <span className={`badge ${bill.status.includes("Approved") ? "badge-success" : "badge-warning"}`}>
                        {bill.status}
                      </span>
                    </td>
                    <td>
                      {bill.status === "Awaiting Committee Sign-Off" ? (
                        <button 
                          className="card-action"
                          style={{ backgroundColor: "var(--color-mint)", color: "var(--color-charcoal)" }}
                          onClick={() => handleApproveVendorBill(bill.id)}
                        >
                          Approve Payment
                        </button>
                      ) : (
                        <span style={{ fontSize: "0.7rem", color: "var(--color-sage)" }}>Disbursed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Printable Receipt Dialog Modal Popup */}
      {selectedReceipt && (
        <div className="overlay-modal" onClick={() => setSelectedReceipt(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ borderTop: "8px solid var(--color-mint)" }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", borderBottom: "1px solid rgba(59,65,60,0.1)", paddingBottom: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Echo Dwell Heights Receipt</h3>
                <span style={{ fontSize: "0.7rem", color: "var(--color-sage)" }}>Unit B-804 • Resident</span>
              </div>
              <Receipt size={32} style={{ color: "var(--color-sage)" }} />
            </div>

            <div style={{ padding: "1.25rem 0", fontSize: "0.8rem" }}>
              <div style={{ display: "flex", justify: "space-between", marginBottom: "0.5rem" }}>
                <span>Receipt Number:</span>
                <strong>{selectedReceipt.receiptId || "RCP-80124"}</strong>
              </div>
              <div style={{ display: "flex", justify: "space-between", marginBottom: "0.5rem" }}>
                <span>Invoiced Month:</span>
                <strong>{selectedReceipt.month}</strong>
              </div>
              <div style={{ display: "flex", justify: "space-between", marginBottom: "0.5rem" }}>
                <span>Payment Date:</span>
                <strong>{selectedReceipt.paidDate ? new Date(selectedReceipt.paidDate).toLocaleString() : "2026-05-02 10:30"}</strong>
              </div>
              
              <div style={{ border: "1px dashed rgba(59,65,60,0.1)", margin: "1rem 0" }}></div>

              <div style={{ display: "flex", justify: "space-between", marginBottom: "0.35rem" }}>
                <span>Maintenance Fund charges:</span>
                <span>₹{selectedReceipt.maintenance}</span>
              </div>
              <div style={{ display: "flex", justify: "space-between", marginBottom: "0.35rem" }}>
                <span>Capital Sinking Fund contribution:</span>
                <span>₹{selectedReceipt.sinkingFund}</span>
              </div>
              <div style={{ display: "flex", justify: "space-between", marginBottom: "0.35rem" }}>
                <span>Water Supply utility share:</span>
                <span>₹{selectedReceipt.waterCharge}</span>
              </div>
              <div style={{ display: "flex", justify: "space-between", marginBottom: "0.35rem" }}>
                <span>Electrical Grid usage share:</span>
                <span>₹{selectedReceipt.electricityCharge}</span>
              </div>

              <div style={{ border: "1px dashed rgba(59,65,60,0.1)", margin: "1rem 0" }}></div>

              <div style={{ display: "flex", justify: "space-between", fontSize: "1rem", fontWeight: "700", color: "var(--color-charcoal)" }}>
                <span>Total Cleared Ledger:</span>
                <span>₹{(selectedReceipt.maintenance + selectedReceipt.sinkingFund + selectedReceipt.waterCharge + selectedReceipt.electricityCharge).toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
              <button 
                className="form-btn" 
                style={{ flex: 1, backgroundColor: "var(--color-mint)", color: "var(--color-charcoal)" }}
                onClick={() => {
                  alert("Receipt dispatch compiled! Initializing thermal printer spooler...")
                  setSelectedReceipt(null)
                }}
              >
                Print Receipt
              </button>
              <button 
                className="form-btn form-btn-secondary" 
                style={{ flex: 1 }}
                onClick={() => setSelectedReceipt(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

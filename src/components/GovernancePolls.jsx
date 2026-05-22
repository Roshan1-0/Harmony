import React, { useState } from "react"
import { useSociety } from "../context/SocietyContext"
import { Vote, Calendar, Download, PlusCircle, CheckCircle, Info } from "lucide-react"

export default function GovernancePolls() {
  const { polls, voteOnPoll } = useSociety()

  // Event RSVP states
  const [events, setEvents] = useState([
    { id: "EVT-801", title: "Annual General Body Meeting (AGM)", date: "2026-06-07T10:00:00Z", location: "Clubhouse Hall A", rsvped: null, counts: { yes: 142, no: 12 } },
    { id: "EVT-802", title: "Monsoon Tree Plantation Drive", date: "2026-06-14T08:30:00Z", location: "Central Parks Perimeter", rsvped: "yes", counts: { yes: 68, no: 2 } },
    { id: "EVT-803", title: "Echo Summer Carnival & Food Feast", date: "2026-05-24T18:00:00Z", location: "Lawn Amphitheatre", rsvped: null, counts: { yes: 210, no: 5 } },
  ])

  // Proposal states
  const [proposals, setProposals] = useState([
    { id: "PRP-011", title: "Install Rooftop Solar Arrays on Tower B", author: "Deepak Rao (B-401)", status: "Under Review by Committee", votes: 48 },
    { id: "PRP-010", title: "Upgrade Club Gym Treadmills & Spin Bikes", author: "Sameer Shah (A-902)", status: "Approved - RFP Dispatched", votes: 86 }
  ])
  const [newPropTitle, setNewPropTitle] = useState("")

  const handleVote = (pollId, optionText) => {
    voteOnPoll(pollId, optionText)
    alert("Your anonymous ballot has been safely recorded in the society ledger.")
  }

  const handleRSVP = (evtId, status) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === evtId) {
        const diff = status === "yes" ? 1 : 0
        return { 
          ...evt, 
          rsvped: status, 
          counts: { ...evt.counts, yes: evt.counts.yes + diff } 
        }
      }
      return evt
    }))
    alert(`RSVP logged as '${status.toUpperCase()}' for this event! Calendar updated.`)
  }

  const handleProposalSubmit = (e) => {
    e.preventDefault()
    if (!newPropTitle) return
    const newP = {
      id: `PRP-${Math.floor(100 + Math.random() * 900)}`,
      title: newPropTitle,
      author: "Aishwarya Sen (B-804)",
      status: "Submitted - Awaiting Sponsorship",
      votes: 1
    }
    setProposals([newP, ...proposals])
    setNewPropTitle("")
    alert("Proposal submitted! It is now live for neighbor co-sponsorship votes.")
  }

  const handleUpvoteProposal = (id) => {
    setProposals(prev => prev.map(p => 
      p.id === id ? { ...p, votes: p.votes + 1 } : p
    ))
  }

  return (
    <div className="dashboard-grid">

      {/* Anonymous Society Polls */}
      <div className="society-card" style={{ gridColumn: "span 2" }}>
        <div className="card-header">
          <h3 className="card-title">
            <Vote size={18} style={{ color: "var(--color-sage)" }} />
            Active Governance Voting Polls
          </h3>
          <span className="badge badge-info">Anonymous Ledger</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {polls.map(poll => {
            const hasVoted = poll.voted
            return (
              <div 
                key={poll.id} 
                style={{ 
                  padding: "1.25rem", 
                  borderRadius: "var(--radius-md)", 
                  backgroundColor: "var(--color-ice)",
                  border: "1px solid rgba(157,181,178,0.25)" 
                }}
              >
                <div style={{ display: "flex", justify: "space-between", marginBottom: "0.75rem" }}>
                  <strong style={{ fontSize: "0.85rem", lineHeight: "1.4" }}>{poll.question}</strong>
                  <span className="badge badge-info" style={{ fontSize: "0.6rem" }}>{poll.id}</span>
                </div>

                {hasVoted ? (
                  /* Voted Results */
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {poll.options.map(opt => {
                      const percentage = poll.votersCount > 0 
                        ? ((opt.votes / poll.votersCount) * 100).toFixed(1) 
                        : 0
                      return (
                        <div key={opt.text} style={{ fontSize: "0.75rem" }}>
                          <div style={{ display: "flex", justify: "space-between", marginBottom: "3px" }}>
                            <span>{opt.text}</span>
                            <strong>{opt.votes} votes ({percentage}%)</strong>
                          </div>
                          <div style={{ height: "6px", backgroundColor: "rgba(59,65,60,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                            <div style={{ width: `${percentage}%`, height: "100%", backgroundColor: "var(--color-mint)" }}></div>
                          </div>
                        </div>
                      )
                    })}
                    <div style={{ fontSize: "0.65rem", color: "var(--color-sage)", textAlign: "right", marginTop: "0.25rem" }}>
                      ✓ Your ballot recorded anonymously • Total Cast: {poll.votersCount} votes
                    </div>
                  </div>
                ) : (
                  /* Voting Choices */
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {poll.options.map(opt => (
                      <button 
                        key={opt.text}
                        onClick={() => handleVote(poll.id, opt.text)}
                        className="form-btn form-btn-secondary"
                        style={{ justifyContent: "flex-start", fontSize: "0.75rem", padding: "0.6rem 1rem", textAlign: "left" }}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Society Documents Shelf */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <Download size={18} style={{ color: "var(--color-sage)" }} />
            Society Document Archives
          </h3>
        </div>

        <p style={{ fontSize: "0.75rem", color: "var(--color-sage)", marginBottom: "1rem" }}>
          Official records maintained by the management committee. Click to download.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div 
            onClick={() => alert("Downloading: AGM_Minutes_April_2026.pdf (1.4 MB)")}
            style={{ display: "flex", justify: "space-between", alignItems: "center", padding: "0.5rem 0.75rem", background: "var(--color-ice)", borderRadius: "var(--radius-sm)", cursor: "pointer", transition: "all var(--duration-fast)" }}
            hover={{ backgroundColor: "var(--color-mint)" }}
          >
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: "700" }}>AGM Minutes - April 2026</div>
              <span style={{ fontSize: "0.6rem", color: "var(--color-sage)" }}>PDF • 1.4 MB • Certified</span>
            </div>
            <Download size={14} style={{ color: "var(--color-sage)" }} />
          </div>

          <div 
            onClick={() => alert("Downloading: Sinking_Fund_Budget_Allocation_2026.pdf (840 KB)")}
            style={{ display: "flex", justify: "space-between", alignItems: "center", padding: "0.5rem 0.75rem", background: "var(--color-ice)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}
          >
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: "700" }}>Sinking Fund Budget allocation</div>
              <span style={{ fontSize: "0.6rem", color: "var(--color-sage)" }}>PDF • 840 KB • Public</span>
            </div>
            <Download size={14} style={{ color: "var(--color-sage)" }} />
          </div>

          <div 
            onClick={() => alert("Downloading: Complex_Security_RFID_Faq.pdf (320 KB)")}
            style={{ display: "flex", justify: "space-between", alignItems: "center", padding: "0.5rem 0.75rem", background: "var(--color-ice)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}
          >
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: "700" }}>RFID Gantry FAQ & Access Policy</div>
              <span style={{ fontSize: "0.6rem", color: "var(--color-sage)" }}>PDF • 320 KB • Guides</span>
            </div>
            <Download size={14} style={{ color: "var(--color-sage)" }} />
          </div>
        </div>
      </div>

      {/* RSVP Event Ecosystem */}
      <div className="society-card" style={{ gridColumn: "span 2" }}>
        <div className="card-header">
          <h3 className="card-title">
            <Calendar size={18} style={{ color: "var(--color-sage)" }} />
            Upcoming Society Events & RSVPs
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {events.map(evt => (
            <div 
              key={evt.id} 
              style={{ 
                display: "flex", 
                justify: "space-between", 
                alignItems: "center", 
                paddingBottom: "0.75rem", 
                borderBottom: "1px solid rgba(59,65,60,0.05)",
                flexWrap: "wrap",
                gap: "1rem"
              }}
            >
              <div>
                <span style={{ fontSize: "0.65rem", fontWeight: "700", color: "var(--color-mint)" }}>{evt.location}</span>
                <h4 style={{ fontSize: "0.85rem", fontWeight: "700" }}>{evt.title}</h4>
                <p style={{ fontSize: "0.7rem", color: "var(--color-sage)", marginTop: "0.15rem" }}>
                  Scheduled: {new Date(evt.date).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })} • Attendees: {evt.counts.yes}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                {evt.rsvped ? (
                  <span className="badge badge-success">RSVP'd {evt.rsvped.toUpperCase()}</span>
                ) : (
                  <>
                    <button 
                      onClick={() => handleRSVP(evt.id, "yes")}
                      className="card-action"
                      style={{ backgroundColor: "var(--color-mint)", color: "var(--color-charcoal)" }}
                    >
                      Going
                    </button>
                    <button 
                      onClick={() => handleRSVP(evt.id, "no")}
                      className="card-action"
                      style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}
                    >
                      Decline
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Upgrade Proposals Board */}
      <div className="society-card">
        <div className="card-header">
          <h3 className="card-title">
            <PlusCircle size={18} style={{ color: "var(--color-sage)" }} />
            Community Upgrade Proposals
          </h3>
        </div>

        {/* Raise Proposal Form */}
        <form onSubmit={handleProposalSubmit} className="society-form" style={{ marginBottom: "1rem" }}>
          <div className="form-group">
            <label className="form-label">Submit New Upgrade Proposal</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Build dog park behind Tower C..."
              value={newPropTitle}
              onChange={(e) => setNewPropTitle(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form-btn" style={{ fontSize: "0.75rem" }}>Submit Proposal</button>
        </form>

        {/* Proposals List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "190px", overflowY: "auto" }}>
          {proposals.map(prop => (
            <div key={prop.id} style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", border: "1px solid rgba(59,65,60,0.08)" }}>
              <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: "0.75rem", color: "var(--color-charcoal)" }}>{prop.title}</strong>
                <button 
                  onClick={() => handleUpvoteProposal(prop.id)}
                  className="card-action"
                  style={{ display: "flex", gap: "3px", alignItems: "center" }}
                >
                  ▲ {prop.votes}
                </button>
              </div>
              <span style={{ fontSize: "0.6rem", color: "var(--color-sage)" }}>Author: {prop.author}</span>
              <div style={{ fontSize: "0.6rem", color: "var(--color-charcoal-60)", marginTop: "0.25rem", fontWeight: "600" }}>
                Status: {prop.status}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

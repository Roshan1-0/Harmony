import React, { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ReactLenis } from "lenis/react"

// Context & Styles
import { SocietyProvider, useSociety } from "./context/SocietyContext"
import "./styles/global.css"
import "./styles/layout.css"
import "./styles/dashboard.css"

// Shell Components
import Loader from "@components/Loader"
import CustomCursor from "@components/CustomCursor"
import Sidebar from "@components/Sidebar"
import Header from "@components/Header"

// Sub-Panel Views
import ResidentDashboard from "@components/ResidentDashboard"
import AdminDashboard from "@components/AdminDashboard"
import SecurityManager from "@components/SecurityManager"
import ParkingSpace from "@components/ParkingSpace"
import UtilityTracker from "@components/UtilityTracker"
import FinanceLedger from "@components/FinanceLedger"
import MaintenanceHub from "@components/MaintenanceHub"
import CourierLocker from "@components/CourierLocker"
import GovernancePolls from "@components/GovernancePolls"

// Mobile Icons
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Car, 
  Zap, 
  Receipt,
  Wrench,
  Package,
  Vote,
  AlertTriangle 
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

function AppContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [loaderDone, setLoaderDone] = useState(false)
  const lenisRef = useRef(null)

  const { 
    activeTab, 
    setActiveTab, 
    role, 
    sosActive, 
    sosTower, 
    triggerSOS,
    cancelSOS 
  } = useSociety()

  // Coordinate Lenis smooth scrolling and GSAP trigger frames
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      gsap.ticker.remove(update)
      clearTimeout(refreshTimeout)
    }
  }, [])

  // Scroll refresh when loader completes
  useEffect(() => {
    if (loaderDone) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [loaderDone])

  const handleLoaderComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setLoaderDone(true)
    }, 100)
  }

  // Render the current panel view based on activeTab
  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard":
        return role === "resident" ? <ResidentDashboard /> : <AdminDashboard />
      case "security":
        return <SecurityManager />
      case "parking":
        return <ParkingSpace />
      case "utilities":
        return <UtilityTracker />
      case "finance":
        return <FinanceLedger />
      case "maintenance":
        return <MaintenanceHub />
      case "courier":
        return <CourierLocker />
      case "governance":
        return <GovernancePolls />
      default:
        return role === "resident" ? <ResidentDashboard /> : <AdminDashboard />
    }
  }

  // Mobile Bottom navigation bar configuration
  const mobileNavItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "parking", label: "Parking", icon: Car },
    { id: "utilities", label: "Utilities", icon: Zap },
    { id: "finance", label: "Ledger", icon: Receipt },
  ]

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        duration: 1.4,
        smoothWheel: true,
      }}
    >
      {/* Premium custom mouse dot pointer (disabled on touch) */}
      <CustomCursor />

      {/* Rebranded high-fidelity loading curtains */}
      {isLoading && <Loader onComplete={handleLoaderComplete} />}

      {/* Main SaaS Frame Container */}
      <div className="app-container">
        
        {/* collapsible sidebar */}
        <Sidebar />

        {/* Workspace panel frame */}
        <div className="main-workspace">
          
          {/* Critical Emergency SOS broadcast banner */}
          {sosActive && (
            <div className="sos-overlay">
              <div className="sos-message">
                <AlertTriangle size={18} className="animate-pulse" style={{ color: "#ef4444" }} />
                <span>CRITICAL ALARM: SOS broadcast initiated in {sosTower}! Emergency dispatched.</span>
              </div>
              <button onClick={cancelSOS} className="sos-cancel-btn">
                Clear SOS Alarm
              </button>
            </div>
          )}

          {/* Core Header Switcher and alert bell */}
          <Header />

          {/* Dynamic Scroll View Area */}
          <main id="main-content" style={{ flex: 1, paddingBottom: "3rem" }}>
            {renderActiveView()}
          </main>

          {/* Floating SOS Trigger for Mobile view */}
          <button 
            className="mobile-sos-float" 
            onClick={() => triggerSOS(role === "resident" ? "Tower B" : "Security Post")}
            aria-label="Trigger panic button SOS"
          >
            <AlertTriangle size={24} />
          </button>

          {/* Handheld Mobile Bottom Tab bar */}
          <nav className="mobile-bottom-nav">
            {mobileNavItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`mobile-bottom-btn ${isActive ? "is-active" : ""}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

        </div>
      </div>
    </ReactLenis>
  )
}

export default function App() {
  return (
    <SocietyProvider>
      <AppContent />
    </SocietyProvider>
  )
}

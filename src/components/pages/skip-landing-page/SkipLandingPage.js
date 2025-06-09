import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiX, FiMapPin, FiTrash2, FiTruck, FiShield, FiCalendar, FiCreditCard } from "react-icons/fi";
import "./SkipLandingPage.css";
import SkipCard from "./SkipCard";
import SidebarStepper from "./SidebarStepper";
import useSkips from "./hooks/useSkips";

const steps = [
  { label: "Postcode", icon: <FiMapPin /> },
  { label: "Waste Type", icon: <FiTrash2 /> },
  { label: "Select Skip", icon: <FiTruck /> },
  { label: "Permit Check", icon: <FiShield /> },
  { label: "Choose Date", icon: <FiCalendar /> },
  { label: "Payment", icon: <FiCreditCard /> },
];

// Use local image from images folder
const SKIP_IMAGE = require("../../../images/trash.jpg");
const SKIPS_API_URL = "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

export default function SkipLandingPage() {
  const { skips, loading, error } = useSkips(SKIPS_API_URL);
  const [selected, setSelected] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (skips.length > 0) {
      setSelected(skips[0].size);
    }
  }, [skips]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="skip-landing-outer">
      {/* Top Navbar */}
      <nav className="skip-navbar">
        <button 
          className={`hamburger-menu ${isSidebarOpen ? 'active' : ''}`}
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
          type="button"
        >
          {isSidebarOpen ? (
            <FiX size={28} color="#3a86ff" />
          ) : (
            <GiHamburgerMenu size={28} color="#3a86ff" />
          )}
        </button>
      </nav>

      {/* Sidebar Stepper */}
      <SidebarStepper steps={steps} currentStepIndex={2} isOpen={isSidebarOpen} />

      {/* Main Content */}
      <main className="skip-main-content">
        <h1 className="skip-landing-title">Choose Your Skip Size</h1>
        <p className="skip-landing-desc">Select the skip size that best suits your needs</p>

        {/* Loading/Error States */}
        {loading && <div className="skip-loading-message">Loading skip options...</div>}
        {error && <div className="skip-error-message">{error}</div>}

        {/* Skip Cards */}
        {!loading && !error && (
          <div className="skip-cards-list">
            {skips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                selected={selected}
                onSelect={() => setSelected(skip.size)}
                SKIP_IMAGE={SKIP_IMAGE}
              />
            ))}
          </div>
        )}

        {/* Floating Continue Button */}
        <button
          className="skip-continue-btn-floating"
          onClick={() => navigate("/next-step")}
          disabled={loading || !!error || !selected}
        >
          Continue →
        </button>
      </main>
    </div>
  );
}

export function NextStep() {
  return (
    <div className="skip-next-step-placeholder">
      Next Step Placeholder
    </div>
  );
} 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiX, FiMapPin, FiTrash2, FiTruck, FiShield, FiCalendar, FiCreditCard } from "react-icons/fi";
import "./SkipLandingPage.css";

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

export default function SkipLandingPage() {
  const [skips, setSkips] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch skips");
        return res.json();
      })
      .then((data) => {
        setSkips(data);
        setSelected(data[0]?.size || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
      <aside className={`skip-stepper-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="skip-stepper-vertical">
          {steps.map((step, i) => (
            <div key={step.label} className={`skip-stepper-step-vertical${i === 2 ? " active" : ""}`}>
              <div className="skip-stepper-icon-wrap">
                <span className={`skip-stepper-icon${i === 2 ? " active" : ""}`}>{step.icon}</span>
              </div>
              <span className={`skip-stepper-label-vertical${i === 2 ? " active" : ""}`}>{step.label}</span>
              {i !== steps.length - 1 && <div className="skip-stepper-vertical-connector" />}
            </div>
          ))}
        </div>
      </aside>

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
              <div
                key={skip.id}
                className={`skip-card-vertical${selected === skip.size ? " selected" : ""}`}
                onClick={() => setSelected(skip.size)}
              >
                {skip.allowed_on_road ? (
                  <div className="skip-card-banner skip-card-allowed">Allowed on the road</div>
                ) : (
                  <div className="skip-card-banner skip-card-warning">Not allowed on the road</div>
                )}
                <div className="skip-card-img-wrap">
                  <img
                    src={SKIP_IMAGE}
                    alt={`${skip.size} Yard Skip`}
                    className="skip-card-img"
                  />
                </div>
                <div className="skip-card-info">
                  <h2 className="skip-card-title">{skip.size} Yard Skip</h2>
                  <p className="skip-card-period">{skip.hire_period_days} day hire period</p>
                  <div className="skip-card-price">£{skip.price_before_vat}</div>
                </div>
                <div className="skip-card-radio">
                  <input
                    type="radio"
                    checked={selected === skip.size}
                    onChange={() => setSelected(skip.size)}
                    aria-label={`Select ${skip.size} yard skip`}
                  />
                </div>
              </div>
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
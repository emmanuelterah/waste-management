import React from "react";
import PropTypes from "prop-types";

export default function SidebarStepper({ steps, currentStepIndex, isOpen }) {
  return (
    <aside className={`skip-stepper-sidebar${isOpen ? " open" : ""}`}>
      <div className="skip-stepper-vertical">
        {steps.map((step, i) => (
          <div key={step.label} className={`skip-stepper-step-vertical${i === currentStepIndex ? " active" : ""}`}>
            <div className="skip-stepper-icon-wrap">
              <span className={`skip-stepper-icon${i === currentStepIndex ? " active" : ""}`}>{step.icon}</span>
            </div>
            <span className={`skip-stepper-label-vertical${i === currentStepIndex ? " active" : ""}`}>{step.label}</span>
            {i !== steps.length - 1 && <div className="skip-stepper-vertical-connector" />}
          </div>
        ))}
      </div>
    </aside>
  );
}

SidebarStepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    })
  ).isRequired,
  currentStepIndex: PropTypes.number.isRequired,
  isOpen: PropTypes.bool,
}; 
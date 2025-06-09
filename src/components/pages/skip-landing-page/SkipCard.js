import React from "react";
import PropTypes from "prop-types";

export default function SkipCard({ skip, selected, onSelect, SKIP_IMAGE }) {
  return (
    <div
      className={`skip-card-vertical${selected === skip.size ? " selected" : ""}`}
      onClick={onSelect}
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
          onChange={onSelect}
          aria-label={`Select ${skip.size} yard skip`}
        />
      </div>
    </div>
  );
}

SkipCard.propTypes = {
  skip: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    allowed_on_road: PropTypes.bool.isRequired,
    hire_period_days: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    price_before_vat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func.isRequired,
  SKIP_IMAGE: PropTypes.any.isRequired,
}; 
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SkipCard from "../SkipCard";

describe("SkipCard", () => {
  const skip = {
    id: 1,
    size: 4,
    allowed_on_road: true,
    hire_period_days: 14,
    price_before_vat: 278,
  };
  const SKIP_IMAGE = "test-image.jpg";

  it("renders skip card with correct info", () => {
    render(
      <SkipCard
        skip={skip}
        selected={4}
        onSelect={() => {}}
        SKIP_IMAGE={SKIP_IMAGE}
      />
    );
    expect(screen.getByText("4 Yard Skip")).toBeInTheDocument();
    expect(screen.getByText("14 day hire period")).toBeInTheDocument();
    expect(screen.getByText("£278")).toBeInTheDocument();
    expect(screen.getByAltText("4 Yard Skip")).toHaveAttribute("src", SKIP_IMAGE);
    expect(screen.getByText("Allowed on the road")).toBeInTheDocument();
  });

  it("shows Not allowed on the road if not allowed", () => {
    render(
      <SkipCard
        skip={{ ...skip, allowed_on_road: false }}
        selected={4}
        onSelect={() => {}}
        SKIP_IMAGE={SKIP_IMAGE}
      />
    );
    expect(screen.getByText("Not allowed on the road")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    const onSelect = jest.fn();
    render(
      <SkipCard
        skip={skip}
        selected={4}
        onSelect={onSelect}
        SKIP_IMAGE={SKIP_IMAGE}
      />
    );
    fireEvent.click(screen.getByText("4 Yard Skip"));
    expect(onSelect).toHaveBeenCalled();
  });
}); 
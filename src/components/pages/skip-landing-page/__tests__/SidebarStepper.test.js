import React from "react";
import { render, screen } from "@testing-library/react";
import SidebarStepper from "../SidebarStepper";
import { FiMapPin, FiTrash2 } from "react-icons/fi";

describe("SidebarStepper", () => {
  const steps = [
    { label: "Postcode", icon: <FiMapPin data-testid="icon-postcode" /> },
    { label: "Waste Type", icon: <FiTrash2 data-testid="icon-waste" /> },
  ];

  it("renders all step labels", () => {
    render(<SidebarStepper steps={steps} currentStepIndex={0} />);
    expect(screen.getByText("Postcode")).toBeInTheDocument();
    expect(screen.getByText("Waste Type")).toBeInTheDocument();
  });

  it("highlights the active step", () => {
    render(<SidebarStepper steps={steps} currentStepIndex={1} />);
    const activeLabel = screen.getByText("Waste Type");
    expect(activeLabel.className).toMatch(/active/);
  });

  it("renders step icons", () => {
    render(<SidebarStepper steps={steps} currentStepIndex={0} />);
    expect(screen.getByTestId("icon-postcode")).toBeInTheDocument();
    expect(screen.getByTestId("icon-waste")).toBeInTheDocument();
  });
}); 
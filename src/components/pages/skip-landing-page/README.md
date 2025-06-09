# Skip Card Selection UI – Approach & Rationale

## Overview
This component implements a modern, accessible, and visually engaging skip size selection interface for a waste management application. Users can select from a grid of skip cards, each displaying key information and a clear status banner. The selected card is highlighted with a luminescent blue effect for clarity and focus.

## Approach

### 1. **Grid Layout for Cards**
- **Why:** A grid layout allows users to quickly scan and compare multiple skip options at once, improving decision speed and reducing scrolling.
- **How:** CSS Grid is used to display three cards per row on desktop, two on tablet, and one on mobile, ensuring responsiveness and optimal use of screen space.

### 2. **Card Design**
- **Why:** Each card is designed to be visually distinct, with clear separation, rounded corners, and a modern shadow for depth. This makes the UI approachable and easy to interact with.
- **How:** Cards use padding, border-radius, and box-shadow for a soft, modern look. The radio button is positioned for easy selection.

### 3. **Status Banners (Allowed/Not Allowed on the Road)**
- **Why:** The status of each skip (allowed/not allowed on the road) is a critical decision factor. Placing this as a pill-shaped banner in the top-right corner ensures it is immediately visible without cluttering the card content.
- **How:** Absolutely positioned banners with strong color contrast and rounded shapes are used for instant recognition.

### 4. **Luminescent Blue Selection Effect**
- **Why:** When a card is selected, it should stand out clearly. A solid, light blue background with a strong blue border and glow provides a modern, accessible highlight that is visually appealing and easy to spot.
- **How:**
  - The selected card uses a solid blue background (`#eaf4ff`), a bold blue border, and a blue box-shadow for a luminous effect.
  - No gradients or animations are used for the background, ensuring clarity and performance.
  - The effect is accessible for users with color vision deficiencies due to the strong contrast.

### 5. **Accessibility & Responsiveness**
- **Why:** The UI must be usable for all users, on all devices.
- **How:**
  - Sufficient color contrast is maintained for text and interactive elements.
  - The layout adapts to all screen sizes using CSS Grid and media queries.
  - Radio buttons are accessible by keyboard and screen readers.

## Design Decisions
- **No Gradients for Selection:** Gradients can reduce clarity and may not render consistently across devices. A solid color is more accessible and visually stable.
- **No Animated Borders:** While animated borders can be visually interesting, they can be distracting and may reduce accessibility for some users. A static glow is modern and effective.
- **Banner Placement:** Top-right banners are instantly visible and do not interfere with the main card content or selection controls.

## Customization
- You can easily adjust the blue used for the selection effect by changing the `background` and `box-shadow` in `.skip-card-vertical.selected`.
- The grid can be adjusted for more or fewer columns by changing the `grid-template-columns` property in the CSS.

---

**This approach balances modern aesthetics, usability, and accessibility, resulting in a UI that is both beautiful and highly functional.** 
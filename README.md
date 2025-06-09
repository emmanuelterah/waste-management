# Skip Card Selection UI Component

<div align="center">
  <img src="/src/images/preview.png" alt="Skip Card Selection Preview" width="600"/>
</div>

## Overview

A modern, accessible, and visually engaging skip size selection interface component. This component allows users to select from a grid of skip cards, each displaying key information and a clear status banner. The selected card is highlighted with a luminescent blue effect for clarity and focus.

## Features

- 🎯 Interactive Card Grid for skip size selection
- 📱 Responsive design across all devices
- ♿ WCAG 2.1 compliant accessibility
- 🎨 Clear visual feedback and status indicators
- ⌨️ Full keyboard navigation support

## Tech Stack

- React.js
- CSS Modules
- ARIA labels and keyboard navigation

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

## Usage

```jsx
import SkipCardGrid from './components/SkipCardGrid';

function App() {
  return (
    <SkipCardGrid 
      skips={skipData}
      onSelect={handleSkipSelection}
    />
  );
}
```

## Design Philosophy

### Card-Based Interface
- Natural boundaries for skip options
- Easy scanning and comparison
- Intuitive user pattern
- Responsive across devices

### Grid Layout
- Visual order and hierarchy
- Quick option scanning
- Responsive breakpoints
- Consistent across screen sizes

### Status Banners
- Instant visibility of road legality
- Top-right placement
- High contrast design
- Accessible typography

### Selection States
- Luminescent blue highlight
- Solid background (`#eaf4ff`)
- Bold blue border
- Subtle depth effects

## Technical Details

### Component Architecture

1. **Grid Layout**
   - CSS Grid with responsive breakpoints
   - 3 columns (desktop)
   - 2 columns (tablet)
   - 1 column (mobile)

2. **Card Design**
   - Modern shadow effects
   - Rounded corners
   - Strategic spacing
   - Accessible focus states

3. **Accessibility**
   - ARIA labels and roles
   - Keyboard navigation
   - Screen reader support
   - Color contrast compliance

4. **Performance**
   - Optimized rendering
   - Efficient state updates
   - Minimal DOM operations

## Documentation

- [Component API](./docs/skip-card.md)
- [Accessibility Guidelines](./docs/accessibility.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed to Emmanuel Terah .

---

<div align="center">
  <sub>Built By Emmanuel Terah.</sub>
</div>

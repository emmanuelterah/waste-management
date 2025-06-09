import { render, screen } from '@testing-library/react';
import App from './App';

// Suppress React Router v6 deprecation warnings
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('React Router')) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});

test('renders skip landing page', () => {
  render(<App />);
  expect(screen.getByText('Choose Your Skip Size')).toBeInTheDocument();
});

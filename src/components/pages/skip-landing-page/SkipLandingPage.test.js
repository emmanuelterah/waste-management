import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SkipLandingPage from './SkipLandingPage';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock the fetch API
global.fetch = jest.fn();

// Mock the image import
jest.mock('../../../images/trash.jpg', () => 'mocked-image-path');

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

describe('SkipLandingPage', () => {
  const mockSkips = [
    {
      id: 1,
      size: '4',
      hire_period_days: 7,
      price_before_vat: 200,
      allowed_on_road: true,
    },
    {
      id: 2,
      size: '6',
      hire_period_days: 7,
      price_before_vat: 300,
      allowed_on_road: false,
    },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockSkips),
    });
  });

  const renderComponent = async () => {
    let component;
    await act(async () => {
      component = render(
        <BrowserRouter>
          <SkipLandingPage />
        </BrowserRouter>
      );
    });
    return component;
  };

  it('renders the component with initial loading state', async () => {
    // Mock a delayed response to ensure loading state is visible
    fetch.mockImplementationOnce(() => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.resolve(mockSkips),
        });
      }, 100);
    }));

    await renderComponent();
    
    // Check for loading state immediately after render
    const loadingMessage = screen.getByText(/Loading skip options/i);
    expect(loadingMessage).toBeInTheDocument();
  });

  it('fetches and displays skip options', async () => {
    await renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText('4 Yard Skip')).toBeInTheDocument();
      expect(screen.getByText('6 Yard Skip')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
    );
  });

  it('handles API error gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
    await renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
    });
  });

  it('allows skip selection', async () => {
    await renderComponent();

    await waitFor(() => {
      expect(screen.getByText('4 Yard Skip')).toBeInTheDocument();
    });

    const firstSkip = screen.getByText('4 Yard Skip').closest('.skip-card-vertical');
    await act(async () => {
      fireEvent.click(firstSkip);
    });

    expect(screen.getByLabelText('Select 4 yard skip')).toBeChecked();
  });

  it('toggles sidebar when hamburger menu is clicked', async () => {
    await renderComponent();

    const hamburgerButton = screen.getByLabelText('Toggle navigation menu');
    await act(async () => {
      fireEvent.click(hamburgerButton);
    });

    const sidebar = document.querySelector('.skip-stepper-sidebar');
    expect(sidebar).toHaveClass('open');

    await act(async () => {
      fireEvent.click(hamburgerButton);
    });
    expect(sidebar).not.toHaveClass('open');
  });

  it('navigates to next step when continue button is clicked', async () => {
    await renderComponent();

    await waitFor(() => {
      expect(screen.getByText('4 Yard Skip')).toBeInTheDocument();
    });

    const firstSkip = screen.getByText('4 Yard Skip').closest('.skip-card-vertical');
    await act(async () => {
      fireEvent.click(firstSkip);
    });

    const continueButton = screen.getByText('Continue →');
    await act(async () => {
      fireEvent.click(continueButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/next-step');
  });

  it('disables continue button when no skip is selected', async () => {
    // Mock an empty response to ensure no skip is selected
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    await renderComponent();

    await waitFor(() => {
      const continueButton = screen.getByText('Continue →');
      expect(continueButton).toHaveAttribute('disabled');
    });
  });

  it('displays correct skip information', async () => {
    await renderComponent();

    await waitFor(() => {
      const skipCards = screen.getAllByText(/Yard Skip/);
      expect(skipCards).toHaveLength(2);
      
      // Check first skip card
      const firstSkipCard = skipCards[0].closest('.skip-card-vertical');
      expect(firstSkipCard).toHaveTextContent('4 Yard Skip');
      expect(firstSkipCard).toHaveTextContent('7 day hire period');
      expect(firstSkipCard).toHaveTextContent('£200');
      expect(firstSkipCard).toHaveTextContent('Allowed on the road');

      // Check second skip card
      const secondSkipCard = skipCards[1].closest('.skip-card-vertical');
      expect(secondSkipCard).toHaveTextContent('6 Yard Skip');
      expect(secondSkipCard).toHaveTextContent('7 day hire period');
      expect(secondSkipCard).toHaveTextContent('£300');
      expect(secondSkipCard).toHaveTextContent('Not allowed on the road');
    });
  });
}); 
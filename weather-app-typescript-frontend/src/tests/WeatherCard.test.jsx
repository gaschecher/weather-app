import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WeatherCard from '../components/WeatherCard';

// Mock images and icons because jest is very fickle with them
jest.mock('../images/dragonicon2.png', () => 'mocked-dragon-icon');
jest.mock('../images/hot.png', () => 'mocked-hot-icon');
jest.mock('../images/castle.png', () => 'mocked-castle-icon');
jest.mock('@mui/icons-material/Refresh', () => () => <div data-testid="refresh-icon">RefreshIcon</div>);

describe('WeatherCard Component', () => {
  const mockWeatherData = {
    temperature: 72,
    realFeel: 70,
    realFeelShade: 68,
    description: 'Sunny',
    wind: '10 mph',
    windGusts: 15,
  };

  const mockOnRefresh = jest.fn();

  test('renders weather data correctly', () => {
    render(<WeatherCard searchQuery="New York" weatherData={mockWeatherData} onRefresh={mockOnRefresh} />);

    expect(screen.getByText('CURRENT WEATHER')).toBeInTheDocument();
    expect(screen.getByText('72°F')).toBeInTheDocument();
    expect(screen.getByText('RealFeel® 70°')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('RealFeel Shade™')).toBeInTheDocument();
    expect(screen.getByText('68°')).toBeInTheDocument();
    expect(screen.getByText('Wind')).toBeInTheDocument();
    expect(screen.getByText('10 mph')).toBeInTheDocument();
    expect(screen.getByText('Wind Gusts')).toBeInTheDocument();
    expect(screen.getByText('15 mph')).toBeInTheDocument();
  });

  test('renders no data card when weatherData is null', () => {
    render(<WeatherCard searchQuery="Unknown City" weatherData={null} onRefresh={mockOnRefresh} />);

    expect(screen.getByText('Apologies, friend. The town you seek is not present on my map!')).toBeInTheDocument();
  });

  test('calls onRefresh when refresh button is clicked', () => {
    render(<WeatherCard searchQuery="New York" weatherData={mockWeatherData} onRefresh={mockOnRefresh} />);

    const refreshButton = screen.getByTestId('refresh-icon').closest('button');
    fireEvent.click(refreshButton);

    expect(mockOnRefresh).toHaveBeenCalledTimes(1);
  });

});

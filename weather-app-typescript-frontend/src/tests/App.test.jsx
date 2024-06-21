import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import App from '../App';

// mocking a lot here, basically any component that sub renders an image or other file types like css
// because you have to do a lot of config work to get jest to not crash on those types of files
// and i ran out of time
jest.mock('axios'); // key line to tell jest to intercept real axios request and replace it with this axios
// mock that i can inject whatever data i want. standard for unit tests.
jest.mock('../components/NavBar', () => () => <div data-testid="navbar">NavBar</div>);
jest.mock('../components/FullPageBox', () => ({ children }) => <div>{children}</div>);
jest.mock('../components/CenteredBox', () => ({ children }) => <div>{children}</div>);
jest.mock('../components/WeatherCard', () => () => <div data-testid="weather-card">WeatherCard</div>);
jest.mock('../components/ForecastCard', () => () => <div data-testid="forecast-card">ForecastCard</div>);
jest.mock('../images/logowizard.png', () => 'mocked-wizard-logo');
jest.mock('../styles/index.css', () => ({})); // Mock CSS import

describe('App Component', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });
// this is checking the app components render, even though the sub-components are mocked, the app component itself isn't
  test('renders the search bar and intro text', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Reveal the city of your quest..')).toBeInTheDocument();
    expect(screen.getByText(/Cast your gaze upon the map/)).toBeInTheDocument();
  });

  // my quick attempt to test this, although since the child components are mocked it's 
  // more like a proof of concept than a real test.
  test('displays weather data when a city is searched', async () => {
    const weatherData = {
      data: [{
        Temperature: { Imperial: { Value: 72 } },
        WeatherText: 'Sunny',
        RealFeelTemperature: { Imperial: { Value: 70 } },
        RealFeelTemperatureShade: { Imperial: { Value: 68 } },
        Wind: { Speed: { Imperial: { Value: 10, Unit: 'mph' } } },
        WindGust: { Speed: { Imperial: { Value: 15 } } },
      }]
    };
    axios.get.mockResolvedValueOnce(weatherData);// Mock forecast data via injecting into mocked axios
  
    render(<App />);
    const searchBar = screen.getByPlaceholderText('Reveal the city of your quest..');
    fireEvent.change(searchBar, { target: { value: 'New York' } });
    fireEvent.submit(searchBar.closest('form'));
// these are mocked child components, so it'll basically always past, again just for demonstration purposes
    await waitFor(() => {
      expect(screen.getByTestId('weather-card')).toBeInTheDocument();
      expect(screen.getByTestId('forecast-card')).toBeInTheDocument();
    });
  });

});
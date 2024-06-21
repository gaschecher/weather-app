import React, { useState } from 'react';
import NavBar from './components/NavBar';
import FullPageBox from './components/FullPageBox';
import CenteredBox from './components/CenteredBox';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchBar from './components/SearchBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import wizardLogo from './images/logowizard.png';
import './styles/index.css';
import axios from 'axios';
import { WeatherData } from './types/types';
import { BASE_URL } from './const';
import { appStyles } from './styles/styles'; 




// i went with MUI for the most part, and pretty normal CSS for this demo app. no tailwind or anything like that.
function App() {

  // Due to time contraints on this project, I chose to put all the state here. 
  // In a larger prod app, I would use a state management tool like React Context or use a package like Zustand to avoid prop drilling. 
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [showWeatherCard, setShowWeatherCard] = useState(false);
  const [completions, setCompletions] = useState<string[]>([]);
  const [forecastData, setForecastData] = useState<any>(null);

  // These functions could be moved into a separate helper functions folder, but since the project is small,
  // and they are only used in this file, I left them here to keep things simple.


  // standard date formatting code, i added date formatting on some of the backend services but not all
  // so i just ensure a consistent formatting here on the frontend for everything
  const getCurrentTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const now = new Date();
    return new Intl.DateTimeFormat('en-US', options).format(now);
  };
  const fetchCompletions = async (query: string) => {
    // check to ensure it's not empty and malformed, but if it is just set to empty array anyway
    // in prod would have more robust handling
    // it defaults to [] when the state is initialized, so i'm only really setting it to []
    // in cases where there was a previous successful call and state was not []
    if (query.length > 0) {
      try {
        const response = await axios.get(`${BASE_URL}/completions?q=${query}`);
        setCompletions(response.data.map((item: any) => item.name));
      } catch (error) {
        console.error("Error fetching completions:", error);
      }
    } else {
      setCompletions([]);
    }
  };

  const makeSearchQuery = async (query: string) => {
    try {
      const resp = await axios.get(`${BASE_URL}/weather/current?city=${query}`);
      if (resp.data && resp.data.length > 0) {
        // the current weather payload is larg and i didn't have time to change it on the backend
        // so i just pick the properties i need off of it here on the frontend since i was bouncing back and forth
        // between the front and backend
        const data = resp.data[0];
        const weatherData: WeatherData = {
          temperature: data.Temperature.Imperial.Value,
          description: data.WeatherText,
          realFeel: data.RealFeelTemperature.Imperial.Value,
          realFeelShade: data.RealFeelTemperatureShade.Imperial.Value,
          wind: `${data.Wind.Speed.Imperial.Value} ${data.Wind.Speed.Imperial.Unit}`,
          windGusts: data.WindGust.Speed.Imperial.Value,
          currentTime: getCurrentTime()
        };
        setWeatherData(weatherData);
      } else {
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

  const fetchForecastData = async (query: string) => {
    // this data i formatted properly on the backend so i don't have to do all this pruning logic here
    try {
      const resp = await axios.get(`${BASE_URL}/weather/forecast?city=${query}&days=5`);
      setForecastData(resp.data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      setForecastData(null);
    }
  };

  const handleSearch = async (query: string) => {
    // could add more error handling and conditional logic here in case something goes wrong
    // or loading spinners, etc
    setSearchQuery(query);
    setShowWeatherCard(true);
    await makeSearchQuery(query);
    await fetchForecastData(query);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleRefresh = () => {
    // this is to refresh the current weather forecast, since that can change minute by minute
    // the weekly forecast is pretty static so there's no need for a refresh button/logic there.
    makeSearchQuery(searchQuery);
    fetchForecastData(searchQuery);
    console.log('refreshed');
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <NavBar />
      <FullPageBox completions={completions}>
        <CenteredBox completions={completions}>
          <img src={wizardLogo} alt="Logo" style={appStyles.logo} />
          <SearchBar onSearch={handleSearch} onClear={handleClear} fetchCompletions={fetchCompletions} completions={completions} />
          {!showWeatherCard && (
            <Box>
              <Typography variant="body1" sx={appStyles.introText}>
                Cast your gaze upon the map, and begin inscribing the name of your realm. When the runes are aligned, unleash the sorcery to reveal the weather in your domain.
              </Typography>
              <Typography variant="body1" sx={appStyles.subText}>
                Or, in other words if you want to view today's weather forecast, type in your city and then either press enter or click the submit button.
              </Typography>
            </Box>
          )}
          <Box sx={appStyles.marginBottom} />
          {showWeatherCard && (
            <>
              <WeatherCard searchQuery={searchQuery} weatherData={weatherData} onRefresh={handleRefresh} />
              <ForecastCard forecastData={forecastData} />
            </>
          )}
        </CenteredBox>
      </FullPageBox>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import dragonIcon from '../images/dragonicon2.png';
import hotIcon from '../images/hot.png';
import Castle from '../images/castle.png';
import { WeatherCardProps } from '../types/types';
import { weatherCardStyles } from '../styles/styles'; 

const WeatherCard: React.FC<WeatherCardProps> = ({ searchQuery, weatherData, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // This handles the refresh of the WeatherCard component. I am using a state variable to manage the refresh animation, 
  // but in a production app, I might have used a ref instead for more fine-grained control.
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRefreshing) {
      timer = setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isRefreshing]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
  };
// In a prod app, this and other components could be memoized to prevent unneccessary re-renders. Due to time constraints, I left this as is. 
// but memoizing it as is won't do much good since i'm doing prop drilling from the main APP component so almost everything has unnecessary rerenders
// in react 19, the react compiler is supposed to "auto-memoize" things, so maybe memo-izing will be a thing of the past!

  
// this is basically me rendering a specific 404 "not found" card with a cute graphic
const renderNoDataCard = () => (
    <Card sx={weatherCardStyles.noDataCard}>
      <CardContent>
        <img src={Castle} alt="castle" style={weatherCardStyles.castleIcon} />
        <Typography sx={weatherCardStyles.noDataText}>
          Apologies, friend. The town you seek is not present on my map!
        </Typography>
      </CardContent>
    </Card>
  );

  if (!weatherData) {
    return renderNoDataCard();
  }

  return (
    <Card component="article" sx={{ ...weatherCardStyles.weatherCard, ...(isRefreshing && weatherCardStyles.refreshAnimation) }}>
      <IconButton sx={weatherCardStyles.refreshIcon} onClick={handleRefresh}>
        <RefreshIcon />
      </IconButton>
      <CardContent>
        <Grid container sx={weatherCardStyles.gridContainer}>
          <Grid item sx={weatherCardStyles.gridItemFull}>
            <Typography variant="subtitle2" color="textSecondary">
              CURRENT WEATHER
            </Typography>
          </Grid>
          <Grid item sx={weatherCardStyles.gridItemFull} container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box display="flex" alignItems="center" sx={{ paddingBottom: '10px' }}>
                <img src={hotIcon} alt="Hot Icon" style={weatherCardStyles.hotIcon} />
                <Typography variant="h3" sx={weatherCardStyles.temperatureText}>
                  {weatherData.temperature}°F
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textSecondary">
              {weatherData.currentTime}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sx={weatherCardStyles.gridItemFull}>
            <Typography variant="body1" color="textSecondary">
              RealFeel® {weatherData.realFeel}°
            </Typography>
          </Grid>
          <Grid item sx={weatherCardStyles.gridItemFull}>
            <Typography variant="body1" sx={{ marginLeft: '50px' }}>
              {weatherData.description}
            </Typography>
          </Grid>
          <Grid item sx={weatherCardStyles.gridItemFull} container spacing={5}>
            <Grid item sx={weatherCardStyles.gridItemHalf}>
              <Typography variant="body2" color="textSecondary">
                RealFeel Shade™
              </Typography>
              <Typography variant="body1">{weatherData.realFeelShade}°</Typography>
            </Grid>
            <Grid item sx={weatherCardStyles.gridItemHalf}>
              <Typography variant="body2" color="textSecondary">
                Wind
              </Typography>
              <Typography variant="body1">{weatherData.wind}</Typography>
            </Grid>
            <Grid item sx={weatherCardStyles.gridItemHalf}>
              <Typography variant="body2" color="textSecondary">
                Wind Gusts
              </Typography>
              <Typography variant="body1">{weatherData.windGusts} mph</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <img src={dragonIcon} alt="Dragon Icon" style={weatherCardStyles.dragonIcon} />
    </Card>
  );
};

export default WeatherCard;

import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { ForecastCardProps } from '../types/types';
import { forecastCardStyles } from '../styles/styles';

const ForecastCard: React.FC<ForecastCardProps> = ({ forecastData }) => {
  if (!forecastData) {
    // Here I am checking to see if forecastData is null, but due to time constraints on this project, I just put a console.log here. 
    // In a prod app, I would do more extensive error handling with a try/catch and send the data to Sentry.
    // I also would have a fallback UI in case of an error, maybe a TOAST notification to let the user know to retry the request.
    console.log('forecastData is null');
    return null;
  }

  return (
    <Card component="article" sx={{ ...forecastCardStyles.forecastCard }}>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary">
          5-DAY MAGICAL WEATHER FORECAST
        </Typography>
        <Grid container spacing={2} sx={forecastCardStyles.forecastContainer}>
          {forecastData.map((forecast, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <Box sx={forecastCardStyles.forecastItem}>
                <Typography variant="body2" color="textSecondary" align="left">
                  {forecast.date}
                </Typography>
                <Typography variant="h6" align="left">
                  {forecast.temperature.high}° / {forecast.temperature.low}°
                </Typography>
                <Typography variant="body2" color="textSecondary" align="left">
                  {forecast.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;

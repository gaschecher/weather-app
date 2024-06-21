import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import sunnyLogo from '../images/sunny.png';
import { navbarStyles } from '../styles/styles'; 


// In a multi-page prod app, I would probably wrap all of the navigation components into a Layout component, so that it's easier to reuse them.
// Since this app is a one-pager I made the decision to leave it as is. 
function Navbar() {
  return (
    <AppBar position="fixed" color="error" sx={navbarStyles.appBar}>
      <Toolbar>
        <Box sx={navbarStyles.logoBox}>
          <img src={sunnyLogo} alt="logo" style={navbarStyles.logoImage} />
        </Box>
        <Button color="inherit" href="https://github.com/gaschecher/weather-app" target="_blank">
          Link to Github
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

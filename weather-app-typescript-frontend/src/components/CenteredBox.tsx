import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { useTheme } from '@mui/material/styles';
import { centeredBoxStyles } from '../styles/styles'; 


const CenteredBox: React.FC<{ children: React.ReactNode; completions: string[] }> = ({ children, completions }) => {
  const theme = useTheme();

  return (
    <Fade in={true} timeout={2000}>
      <Box sx={centeredBoxStyles.centeredBox}>
        {children}
      </Box>
    </Fade>
  );
};

export default CenteredBox;

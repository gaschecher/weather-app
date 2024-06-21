import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { fullPageBoxStyles } from '../styles/styles'; 

const FullPageBox: React.FC<{ children: React.ReactNode; completions: string[] }> = ({ children, completions }) => {
  const theme = useTheme();
  const appBarHeight = 64;
  const styles = fullPageBoxStyles(theme, appBarHeight);

  return (
    <Box sx={styles.fullPageBox}>
      {children}
    </Box>
  );
};

export default FullPageBox;


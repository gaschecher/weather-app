import { keyframes } from '@mui/material/styles';

// Most of the styles are exported from this file. If I had more time on this project, I would clean up the styling to make it more modular and easier to reuse.
// I would also make separate files for each page's styling for better readability. 

export const forecastCardStyles = {
    forecastCard: {
      width: '97%',
      padding: 1,
      position: 'relative',
      transition: 'transform 0.3s ease-in-out',
      marginTop: '15px',
    },
    forecastContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    forecastItem: {
      textAlign: 'center',
      padding: '10px',
    },
  };

  export const searchBarStyles = (theme: any) => ({
    textField: {
      '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.success.main,
        '& fieldset': {
          borderColor: theme.palette.success.main,
        },
        '&:hover fieldset': {
          borderColor: theme.palette.success.main,
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.success.main,
        },
      },
      input: {
        padding: '8px 14px',
        color: theme.palette.text.primary,
      },
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      gap: '8px',
    },
    button: {
      width: 'auto',
      whiteSpace: 'nowrap',
    },
  });

  export const navbarStyles = {
    logoBox: {
      marginRight: 2,
      display: 'flex',
      alignItems: 'center',
    },
    logoImage: {
      height: '50px',
    },
    appBar: {
      position: 'fixed',
      color: 'error',
    },
  };

  export const fullPageBoxStyles = (theme: any, appBarHeight: number) => ({
    fullPageBox: {
      position: 'absolute',
      top: appBarHeight,
      left: 0,
      width: '100vw',
      height: `calc(100vh - ${appBarHeight}px)`,
      backgroundColor: theme.palette.secondary.main,
      zIndex: -1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export const centeredBoxStyles = {
    centeredBox: {
      width: '500px',
      height: '800px',
      padding: '16px',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
    },
  };

  const refreshAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

export const weatherCardStyles = {
  weatherCard: {
    width: '97%',
    padding: 1,
    position: 'relative',
    transition: 'transform 0.3s ease-in-out',
  },
  refreshIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  hotIcon: {
    width: 50,
    height: 50,
  },
  dragonIcon: {
    position: 'absolute' as const,
    bottom: 10,
    right: 10,
    width: 90,
    height: 90,
  },
  castleIcon: {
    width: 450,
    height: 250,
  },
  temperatureText: {
    marginLeft: 1,
  },
  gridContainer: {
    spacing: 2,
  },
  gridItemFull: {
    xs: 12,
  },
  gridItemHalf: {
    xs: 6,
    marginTop: '16px',
  },
  noDataCard: {
    width: '97%',
    marginTop: '16px',
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: '16px',
  },
  refreshAnimation: {
    animation: `${refreshAnimation} 1s ease-in-out`,
  },
};

export const appStyles = {
    logo: {
      width: '300px',
      height: 'auto',
    },
    introText: {
      marginTop: '25px',
      fontFamily: 'Nanum Pen Script, cursive',
      fontSize: '1.4rem',
    },
    subText: {
      marginTop: '15px',
    },
    marginBottom: {
      marginBottom: '16px',
    },
  };
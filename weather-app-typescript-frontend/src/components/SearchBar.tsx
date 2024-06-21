import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { SearchBarProps } from '../types/types';
import { searchBarStyles } from '../styles/styles'; 

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear, fetchCompletions, completions }) => {
  const theme = useTheme();
  const styles = searchBarStyles(theme); 
  const [searchQuery, setSearchQuery] = useState('');

  // This handles the fetching of the autocomplete options. I am using standard debouncing here to prevent unnecessary requests
  // so the requests are only sent to the completion API route when the user stops typing for at least 400ms.
  // if the user keeps typing, the timer is continually reset and starts after the last keystroke pressed
  
  useEffect(() => {
    // debounce timer is 400ms, which in a prod app, is a little aggressive but i wanted to make sure
    // reviewers knew it was there since i didn't add any circular spinner logic to it
    // like you'd normally have in a prod UI/UX
    const debounceTimer = setTimeout(() => {
      fetchCompletions(searchQuery);
    }, 400);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery, fetchCompletions]);

  // in a prod app too, i'd probably use Formik or react forms, or some other 
  // stateful react form library to handle this
  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setSearchQuery(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchQuery);
    setSearchQuery(''); 
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
      <Autocomplete
        freeSolo
        options={completions}
        value={searchQuery}
        getOptionLabel={(option) => option || ''}
        onInputChange={handleInputChange}
        sx={{ flexGrow: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Reveal the city of your quest.."
            fullWidth
            sx={styles.textField}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option}>
            {option}
          </li>
        )}
      />
      <Button type="submit" variant="contained" color="info" sx={styles.button}>
        Submit
      </Button>
    </Box>
  );
};

export default SearchBar;

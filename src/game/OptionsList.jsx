import React, {useState, useEffect} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

const ErrorRadios = (props)=>{
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('Choose wisely');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  useEffect(()=>{
    if(props.is_guess === true) {
      setHelperText('Choose wisely');
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setGuess(false);

    if (value === props.answer.toString()) {
      setHelperText('You got it!');
      setError(false);
      setValue('');
    } else if (value === '') {
      setHelperText('Please select an option.');
      setError(true);
    } else {
      setHelperText('Sorry, wrong answer!');
      setError(true);
      setValue('');
    }
  };

  if (props.options === undefined) {
    return(
      <div> Loading... </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        sx={{ m: 3 }}
        component="fieldset"
        error={error}
        variant="standard"
      >
        <FormLabel component="legend" id="gameTitle">The name of this song is ....</FormLabel>
        <RadioGroup
          aria-label="quiz"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="0" control={<Radio />} label={`${props.options[0].name} - ${props.options[0].artist}` } />
          <FormControlLabel value="1" control={<Radio />} label={`${props.options[1].name} - ${props.options[1].artist}` } />
          <FormControlLabel value="2" control={<Radio />} label={`${props.options[2].name} - ${props.options[2].artist}` } />
          <FormControlLabel value="3" control={<Radio />} label={`${props.options[3].name} - ${props.options[3].artist}` } />
          <FormControlLabel value="4" control={<Radio />} label={`${props.options[4].name} - ${props.options[4].artist}` } />
        </RadioGroup>
        <FormHelperText id="gameHelperText">{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}

export default ErrorRadios;
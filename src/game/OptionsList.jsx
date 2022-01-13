import React, {useState, useEffect} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

const styles = theme => ({
  radio: {
    '&$checked': {
      color: '#1DB954'
    }
  },
  checked: {}
})

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

    if (value === props.answer.toString()) {
      setHelperText('You got it!');
      setError(false);
      setValue('');
      props.setGuess(false);
    } else if (value === '') {

    } else {
      setHelperText('Sorry, wrong answer!');
      setError(true);
      setValue('');
      props.setGuess(false);
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
        sx={{ m: 3, ml:35 }}
        component="fieldset"
        error={error}
        variant="standard"
      >
        <FormLabel component="legend" id="gameTitle">The name of this song is ....</FormLabel>
        <div id="radiogroup">
          <RadioGroup
            value={value}
            onChange={handleRadioChange}

          >
            <FormControlLabel value="0" control={<Radio style={{color: '#1DB954'}} />} label={`${props.options[0].name} - ${props.options[0].artist}` } />
            <FormControlLabel value="1" control={<Radio style={{color: '#1DB954'}} />} label={`${props.options[1].name} - ${props.options[1].artist}` } />
            <FormControlLabel value="2" control={<Radio style={{color: '#1DB954'}} />} label={`${props.options[2].name} - ${props.options[2].artist}` } />
            <FormControlLabel value="3" control={<Radio style={{color: '#1DB954'}} />} label={`${props.options[3].name} - ${props.options[3].artist}` } />
            <FormControlLabel value="4" control={<Radio style={{color: '#1DB954'}} />} label={`${props.options[4].name} - ${props.options[4].artist}` } />
          </RadioGroup>
          <FormHelperText id="gameHelperText">{helperText}</FormHelperText>
        </div>
        <Button sx={{ mt: 3, mr: 3 }} type="submit" variant="outlined" id="checkanswerBtn">
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}

export default ErrorRadios;
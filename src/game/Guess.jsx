import React from 'react';
import axios from 'axios';
import OptionsList from './OptionsList.jsx';

// input parameters =======
const CONFIG = 'BQDTF3WJ2PuAsrPSE7ZosylTiWutrjHA8fvi1lkPbCBdg5BYf_quHPD60YNdgKTKd1Kvl0lop2RZ97v-EaaiMAJotb5XZMYI0xG70DAkjRueP22HHYLgHYUtQ5yW-aUuX-j-NH6cYEDF8II-ENhxiUt9';
// ========================

const songListHelper = function (results) {
  let list = [];
  results.data.tracks.items.map(song => {
    list.push({
      name:song.track.name,
      artist:song.track.artists[0].name
    })
  });

  let optionsList = [];
  let chosenIndex = [];
  while (optionsList.length < 4) {
    let index = Math.floor(Math.random()*list.length);
    if (chosenIndex.indexOf(index) === -1) {
      optionsList.push(list[index]);
      chosenIndex.push(index);
    }
  };
  return optionsList;
}

const optionsHelper = function (options, answer) {
  let ansIndex = Math.floor(Math.random()*5);
  options.splice(ansIndex, 0, answer);

  return [options, ansIndex];
}

class Guess extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options:[],
      name:''
    }
    this.getNewOptions = this.getNewOptions.bind(this);
  }

  componentDidMount() {
    this.getNewOptions();
  }

  componentDidUpdate() {
    if (this.props.name !== this.state.name) {
      this.setState({
        name:this.props.name
      })
      this.getNewOptions();
    }
  }

  getNewOptions () {
    axios.get('https://api.spotify.com/v1/me/player', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG}`,
      }
    })
      .then(data => {
        const playListUrl = data.data.context.href;
        return playListUrl;
      })
      .then(url => {
        axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONFIG}`,
          }
        })
          .then(results => {
            let optionsList = songListHelper(results);
            optionsList = optionsHelper(optionsList,{
              name:this.props.name,
              artist:this.props.artist
            })
            this.setState({
              options:optionsList,
            })
          })
          .catch(err => {
            console.error('failed to retrieve playlist data');
          })
      })
      .catch(err => {
        console.error('failed to retrieve current laylist url')
      })
  }

  render() {

    if ( this.state.options.length === 0) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <OptionsList options={this.state.options[0]} answer={this.state.options[1]} setGuess={this.props.setGuess} is_guess={this.props.is_guess}/>
    );
  }
}

export default Guess;
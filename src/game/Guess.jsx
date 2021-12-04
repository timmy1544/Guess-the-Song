import React from 'react';
import axios from 'axios';
import OptionsList from './OptionsList.jsx';

const CONFIG = 'BQAhVvM21ZHeMviecQ11cPeo5pkILdcicDjqJqJ8aES3x5HB3lQOVg_4zJCtZB3A1lMY004Ggl0dn-g63ITpcDHSTmbKjVxssRhXmNRuyt-qB8b5aNvIizxkq6LVI3KYfi4lPxwtnH5-xQXVnbLg3a1CJsrqvnnhtcjF';

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
      this.getNewOptions();
    }
  }

  getNewOptions () {
    axios.get('https://api.spotify.com/v1/playlists/37i9dQZF1DXc6IFF23C9jj',{
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
          name:this.props.name
        })
      })
      .catch(err => {
        console.error('failed to retrieve playlist data');
      })
  }

  render() {

    if ( this.state.options.length === 0) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <OptionsList options={this.state.options[0]} answer={this.state.options[1]} setGuess={this.props.setGuess}/>
    );
  }
}

export default Guess;
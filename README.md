# Guess the Song!
This is a browser-based game integrated with **Spotify Web Playback SDK**. The game will start from playing a random song from the selected playlist while the song's title, artist, album are covered. The user has to choose the correct name of the song from the list.



## How to start the game?

### Step 1. Using your own credentials
You will need to register your app and get your own credentials from the
[Spotify for Developers Dashboard](https://developer.spotify.com/dashboard/)

To do so, go to your Spotify for Developers Dashboard, create your
application and register the following callback URI:

`http://localhost:3000/auth/callback`

Once you have created your app, create a file called `.env` in the root folder
of the repository with your Spotify credentials:

```bash
SPOTIFY_CLIENT_ID='my_client_id'
SPOTIFY_CLIENT_SECRET='my_client_secret'
```

Second, please rename the file `config.example.js` to `config.js`, and add the Oauth token from website below:
[Get Oauth Token](https://developer.spotify.com/console/get-user-player/?market=&additional_types=)


### Step 2. Installation
These examples run on Node.js. On its
[website](http://www.nodejs.org/download/) you can find instructions on how to
install it.

Once installed, clone the repository and install its dependencies running:

```bash
npm install
```



### Step 3. Running the example

Start both client and server with the following command:

```bash
npm run dev
```

The React application will start on `http://localhost:3000`



### Step 4. Connect to your spotify
After the user login, the brower will fetch the playlist data that is currently played in the Spotify player. User may change the playlist in the middle of the game and the brower will be updated dynamically.



## Web Playback SDK Javascript Tutorial
This application is built based on the source code from: [Spotify Web Playback SDK example](https://github.com/spotify/spotify-web-playback-sdk-example)

To check guide and more information: [Web Playback SDK Guide](https://developer.spotify.com/documentation/web-playback-sdk/guide/).

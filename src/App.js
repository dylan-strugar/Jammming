import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'; 
import { useState, useEffect } from 'react';
import SearchResults from './components/SearchResults';
import SearchBar from './components/SearchBar';
import Playlist from './components/Playlist';
import ProfileBanner from './components/SpotifyProfile';



const CLIENT_ID = "ac2af534b08e416d8efe7cbdd3bc277a";
const CLIENT_SECRET = "6b2d175c5e904d658431e7fdb1568b6b";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");



function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [profileToken, setProfileToken] = useState(null)
  const [tracks, setTracks] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [playlistURIs, setPlaylistURIs] = useState([]);
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [playlistName, setPlaylistName] = useState("Playlist name");
  const [profileData, setProfileData] = useState(null);
 
  useEffect(() => {
      const profileToken = getProfileToken(CLIENT_ID, code)
  }, [])

  useEffect(() => {
    // API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  useEffect(() => {
    if (!code) {
      redirectToAuthCodeFlow(CLIENT_ID);
      console.log("redirecting to auth code")
    }
  }, [])


  // Redirect 

  async function redirectToAuthCodeFlow(CLIENT_ID) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier)

    localStorage.setItem("verifier", verifier)

    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("response_type", "code");
    params.append("redirect_uri", "https://stellular-froyo-9920b4.netlify.app/");
    params.append("scope", "user-read-private user-read-email playlist-modify-private");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);


    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// GETTING PROFILE USING CLIENT_ID AND ACCESS TOKEN, ASYN FUNCTIONS: 
  //GET PROFILE CODE

  const getProfileToken = () => {
    const verifier = localStorage.getItem("verifier");
    
        const params = new URLSearchParams();
        params.append("client_id", CLIENT_ID);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "http://localhost:3000/callback");
        params.append("code_verifier", verifier);
        params.append("scope", 'playlist-modify-private');

        fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        })
        .then((result) => result.json())
        .then((data) => { setProfileToken(data.access_token); console.log(data.access_token) } )

  }
  // GET PROFILE DATA

  async function getProfile(token) {
    console.log(profileToken)
    try {
      const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: {Authorization: `Bearer ${token}` }
    });
    return await result.json()
    .then( (data) => {
      setProfileData(data); console.log("data: ", data)
    }
    )
  
  } catch (error) {
    console.error("Error fetching profile data:", error);
    }
}
// GET PLAYLIST DATA OF CURRENT USER

  async function getPlaylists(token) {
    try {
      const result = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET", headers: {Authorization: `Bearer ${token}` }
    });
    return await result.json()
    .then( (data) => {
      console.log("playlists: ", data)
    }
    )

  } catch (error) {
    console.error("Error fetching playlist data:", error);
    }
  }
// CREATE PLAYLIST ON SPOTIFY ACCOUNT

  async function createPlaylist(token) {
    
    
    try {

      console.log(profileToken)

      const playlistData = {
        name: playlistName,
        description: "none",
        public: false,
      }
    
      fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(playlistData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('created playlist: ', data);
        const playlistId = data.id;
        console.log(playlistURIs)
      
      return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "uris": 
            playlistURIs
          ,
          "position": 0
        }),
      });
      })
      
      .then(response => {
        if(response.ok) {
          console.log("Songs added to playlist!")
        } else {
          console.log("Failed to add songs to playlist :(", response.status)
        }
      })
    }
    catch (error) {
      console.error("Error creating playlist, ", error);
    
    }
    
  }

// generate code challenge

  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
  }

  // playlist setter
  
  useEffect(() => {
      playlistSearch()
  
  }, [playlist])

  //change playlist function

  const addToPlaylist = (trackId) => {
    setPlaylist(trackId); // Creating a new array to update state
  };

  const addToPlaylistURIs = (trackURI) => {
    setPlaylistURIs(trackURI)
  }

  // search

  async function search() {

    //get request using search to get the Artist ID
    var searchParameters = {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var trackListResponse = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track' , searchParameters)
    .then(response => response.json())
    .then(data => { return data.tracks })
  
    //Get request with Artist ID to grab all the albums from that artist
    var trackList = trackListResponse.items.map(track => track.id);

    var trackIds = trackList.join(',');
    
    //Get track's info from search

    var trackInfo = await fetch(`https://api.spotify.com/v1/tracks?ids=${trackIds}`, searchParameters)
    .then(response => response.json())
    .then(data => {
      setTracks(data.tracks);
    })

    //Get playlist info
  }

  async function playlistSearch() {
    var searchParameters = {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var trackIds = playlist.join(',');


    var playlistSearch = await fetch(`https://api.spotify.com/v1/tracks?ids=${trackIds}`, searchParameters)
    .then(response => response.json())
    .then(data => {
      setPlaylistInfo(data.tracks)
    }) 

  }

  return (
    <div className="App"style={{ backgroundColor: 'black'}}> 
      {profileData ? 
        ( 
          <ProfileBanner username={profileData.display_name} email={profileData.email} url={profileData.href}/> 
        ) :  
        <button onClick={ () => {
          getProfile(profileToken) } }
          style={{  
            backgroundColor: 'black', 
            color: '#1ab26b', 
            border: 'none', 
            outline: '1px Solid #1ab26b', 
            padding: '0px 10px', 
            margin: '10px 10px', 
            height: '45px'}}>
            Access spotify profile</button>}
        
      <SearchBar search={search} setSearchInput={setSearchInput} searchInput={searchInput}/>
      <Row style={{width: '100%', margin: 'auto'}}>
        <SearchResults 
          tracks={tracks} 
          addToPlaylist={addToPlaylist} 
          playlist={playlist} 
          playlistSearch={playlistSearch}
          playlistURIs={playlistURIs}
          addToPlaylistURIs={addToPlaylistURIs}
        />
        <Playlist 
        playlist={playlist} 
        addToPlaylist={addToPlaylist} 
        playlistInfo={playlistInfo} 
        playlistName={playlistName} 
        setPlaylistName={setPlaylistName}
        playlistURIs={playlistURIs}
        addToPlaylistURIs={addToPlaylistURIs}
        createPlaylist={createPlaylist}
        profileToken={profileToken}
        />
      </Row>
    </div>
  );
}

export default App;

import axios from "axios";

const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=ac2af534b08e416d8efe7cbdd3bc277a&response_type=code&redirect_uri=https%3A%2F%2Fdylan-strugar.github.io%2FJammming%2F&scope=user-library-read`;
const clientId = 'ac2af534b08e416d8efe7cbdd3bc277a';
const clientSecret = '6b2d175c5e904d658431e7fdb1568b6b';
const redirectUri = encodeURIComponent('https://dylan-strugar.github.io/Jammming/');
const code = 'THE_CODE_FROM_SPOTIFY';

const auth = btoa(`${clientId}:${clientSecret}`);
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': `Basic ${auth}`,
};

const data = new URLSearchParams();
data.append('grant_type', 'authorization_code');
data.append('code', code);
data.append('redirect_uri', redirectUri);

axios.post('https://accounts.spotify.com/api/token', data, { headers })
  .then((response) => {
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    // Store the tokens securely (e.g., in state or a secure backend).
  })
  .catch((error) => {
    console.error('Error exchanging code for tokens:', error);
  });

function Login() {
    console.log("yes")
    return (
        <div>
            
            <h1>Login: </h1>
            <a href={spotifyLoginUrl}>Login with Spotify</a>
        </div>
      );
}

export default Login;
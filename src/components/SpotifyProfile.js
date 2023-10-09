import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'; 
import Track from "./Track";
import { useEffect, useState } from "react";
    
    
function ProfileBanner(props) {
    return (
        <div style={{ display:"flex", justifyContent:'space-between', alignItems: 'center', margin: '5px 20px'}}>
            <img src="https://cdn.discordapp.com/attachments/926512780775931945/1160172943654006824/Spotify_Logo_CMYK_Green.png?" style={{ height: '30px'}}/>
            <h1 style={{ color: 'white', margin:'0', display: 'inline'}}>JA<h1 style={{ display: 'inline', color: '#1ab26b'}}>MMM</h1>ING</h1>
            <h1 style={{fontSize: '30px', marginLeft: '50%', color: '#1ab26b'}}>{props.username}</h1>
            <h1 style={{fontSize: '20px', color: '#1ab26b'}}>{props.email}</h1>
        </div>
    )
}
    
export default ProfileBanner;
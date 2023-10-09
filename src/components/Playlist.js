import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'; 
import Track from "./Track";
import { useEffect, useState, useRef } from "react";

function Playlist(props) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(props.playlistName)
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleHeaderClick = () => {
        setIsEditing(true);
    }

    const handleInputChange = (event) => {
        setEditedName(event.target.value);
    }

    const handleInputBlur = () => {
        if (editedName === "") {
            setIsEditing(true);
        }
        else {
            setIsEditing(false);
            props.setPlaylistName(editedName)
        }
    }

    const handleInputKeyPress = (event) => {
        if (event.target.value !== "") {
            if (event.key === 'Enter') {
                handleInputBlur();
                props.setPlaylistName(editedName)
            }
        };
    }


    return (
        <Col xs={12} md={6} style={{padding: '0', borderLeft: '1px solid #1ab26b'}}>
            <Container style={{padding: '0', height: '1000px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-around'}}>
                    { isEditing ? (
                        <input 
                        type="text"
                        value={editedName}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleInputKeyPress}
                        ref={inputRef}
                        />
                    ) : (
                        <h1 onClick={handleHeaderClick} style={{color: '#1ab26b'}}>{editedName}</h1>
                    )}
                    <button onClick={() => { props.createPlaylist(props.profileToken)}} style={{ backgroundColor: 'black', color: '#1ab26b', border: 'none', outline: '1px Solid #1ab26b', padding: '0px 10px', margin: 'auto 0', height: '40px'}}>CREATE PLAYLIST</button>
                </div>
                <Row className='mx-2 row row-cols-1'>
                    {props.playlistInfo ? props.playlistInfo.map((track) => (          
                        <Track 
                            id={track.id} 
                            uri={track.uri}
                            image={track.album.images[0].url} 
                            artistName={track.artists[0].name} 
                            trackName={track.name} 
                            albumName={track.album.name} 
                            setPlaylist={props.setPlaylist} 
                            playlist={props.playlist} 
                            playlistSearch={props.playlistSearch} 
                            addToPlaylist={props.addToPlaylist}
                            playlistURIs={props.playlistURIs}
                            addToPlaylistURIs={props.addToPlaylistURIs}
                            type="playlist"
                        />
                    )) : <h1 style={{ fontSize: '30px', color: '#1ab26b'}}>Empty</h1>}   
                </Row>
            </Container>
        </Col>
    )
}

export default Playlist;
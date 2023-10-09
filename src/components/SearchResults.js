import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'; 
import Track from "./Track";
import { useEffect, useState } from "react";

function SearchResults(props) {


    return (
        <Col xs={12} md={6} style={{padding: '0', borderRight: '1px solid #1ab26b'}}>
            <Container  style={{padding: '0'}}>
                <Row className='mx-2 row row-cols-1' style={{margin: '0', height: '100%'}}>
                    <h1 style={{ color: '#1ab26b'}}>Search results:</h1>
                    {props.tracks ? props.tracks.map((track) => (          
                        <Track 
                            id={track.id} 
                            uri={track.uri}
                            artistName={track.artists[0].name} 
                            trackName={track.name} 
                            albumName={track.album.name} 
                            
                            addToPlaylist={props.addToPlaylist} 
                            playlist={props.playlist} 
                            playlistSearch={props.playlistSearch} 
                            playlistURIs={props.playlistURIs}
                            addToPlaylistURIs={props.addToPlaylistURIs}
                            type="result"
                        />
                    )) : null}   
                </Row>
            </Container>
        </Col>
    )
}

export default SearchResults;
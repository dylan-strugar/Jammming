import React  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'; 

function Track(props) {
    return (
        <Card  key={props.id} style={{ backgroundColor: '#1ab26b'  }}>
          <Card.Body style={ { height: '50px', padding: '0'} }>
            <div className="row d-flex align-items-center">
              <div className="d-inline col-md-3 text-nowrap overflow-hidden">
                <Card.Title className="d-inline">{props.trackName}</Card.Title>
              </div>
              <div className="d-inline col-md-4 text-nowrap overflow-hidden">
                <Card.Title className="d-inline">{props.artistName}</Card.Title>
              </div>
              <div className="d-inline col-md-4 text-nowrap overflow-hidden">
                <Card.Title className="d-inline">{props.albumName}</Card.Title>
              </div>
              <div className="d-inline col-md-1 text-nowrap overflow-hidden">
                <Button  className="d-inline" style={ { background: 'none', outline: 'none', border: 'none', padding: '0', lineHeight: '0px', color: 'black', fontSize: '10px' } } onClick={() => { 
                  if(props.type === "playlist") {
                      // Remove props.id from newList and then call addToPlaylist
                      
                      const newList = props.playlist.filter(item => item !== props.id);
                      const newURIsList = props.playlistURIs.filter(item => item !== props.uri)
                      props.addToPlaylist(newList);
                      props.addToPlaylistURIs(newURIsList);
                      console.log("NewURIsList: ")
                      console.log(newURIsList);
                      console.log("propsURIsList: ")
                      console.log(props.playlistURIs)
                  } else {
                      let newList = [...props.playlist, props.id]
                      let newURIsList = [...props.playlistURIs, props.uri]
                      props.addToPlaylistURIs(newURIsList)
                      props.addToPlaylist(newList)
                    }
                  } }>{props.type === "playlist" ? <h1>-</h1> : <h1>+</h1>}
                  </Button>
              </div>
            </div>
            </Card.Body>
        </Card>
    )
}

export default Track;
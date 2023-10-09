import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'; 
import Track from "./Track";
import { useEffect, useState } from "react";
    
    
function SearchBar(props) {
    return (
        <Container style={{ display: 'flex', justifyContent: 'space-around'}}>
            <InputGroup className='mb-3' size='lg' style={{ width: '500px'}}>
            <FormControl 
             style={{ backgroundColor: '#1ab26b', border: 'none'}}
                placeholder="Search for Artist"
                type="input"
                onKeyDown={event => {
                if (event.key == "Enter") {
                    props.search();
                }
                }}
                onChange={event => props.setSearchInput(event.target.value)}
            />
            <button  style={{ backgroundColor: 'black', color: '#1ab26b', border: 'none', outline: '1px Solid #1ab26b', padding: '0px 10px', margin: 'auto 0', height: '45px' }} onClick={ props.searchInput ? props.search : null}>
                Search
            </button>
            </InputGroup>
        </Container>
    )
}
    
export default SearchBar;
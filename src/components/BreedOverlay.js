import * as React from "react";
import "../css/BreedOverlayStyle.css"; 
import dogBreeds from '../img/dogBreeds.jpeg';         

// Benytter function istedet for class da dette component ikke arbejder
// med en state og er mere simpelt 
function BreedOverlay(props) {
    return (
        <div className="container">
            <img alt="" className="breedImg" src={dogBreeds}></img> 
            {/* her putter vi den prop "text" der bliver parsed til komponentet
            ind i div'en*/} 
            <div className="centered">{props.text}</div>
        </div>   
    ) 
}

export default BreedOverlay; 
 
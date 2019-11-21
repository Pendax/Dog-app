
import * as React from "react";
import { Link } from 'react-router-dom';  

// Benytter function istedet for class da dette component ikke arbejder
// med en state og er mere spimpelt 
function DogCategoryCard(props) {
        return ( 
        <div className="column">
        {/* Linket pusher til en ny path når trykket på og et nyt component bliver rendered */}
            <Link to={"/search/?" + props.dog.breedName.toLowerCase()}> 
                <img className="dogPic" alt="" src={props.dog.breedPic} />
                <p>{props.dog.breedName}</p>
            </Link> 
        </div> 
    )  
} 
export default DogCategoryCard; 
 
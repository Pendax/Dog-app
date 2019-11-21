
import * as React from "react";
import "../css/LoadMore.css";   

// Benytter function istedet for class da dette component ikke arbejder
// med en state og er mere spimpelt 
function LoadMoreButton(props) {
        return (
            <div>
                  <button onClick={props.onClick} className="button button4">Load More</button>
            </div>   
        )  
}
 
export default LoadMoreButton;

import * as React from "react";
import searchImg from '../img/searchIcon.png'; // with import 

// Benytter function istedet for class da dette component ikke arbejder
// med en state og er mere simpelt 
function SearchBar(props) { 
        return (
            <div>
                <div className="search-container">
                    <input type="text" placeholder={props.placeholder}
                        name="search"
                        onChange={(e) => props.onChange(e)}
                    >
                    </input>
                    <button type="submit" onClick={() => props.onClick()}><img alt="" className="searchImg" src={searchImg}></img></button>
                </div>

            </div>
        )    
}    
export default SearchBar;     
        
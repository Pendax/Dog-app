import * as React from "react";
export default class DogCard extends React.Component {
        state = { isOpen: false };

        // Bruges til at forstørre billeder
        handleShowdialog = () => {
                this.setState({ isOpen: !this.state.isOpen });
        };
        
        constructor(props) {
                super(props);
                this.favButton = this.favButton.bind(this);
        }
        
        render() {
                // Hvis localstorage indeholder "myFav" item, så skal strFavs variablen
                // være lige med værdien af "myFav" ellers bare en tom string 
                var strFavs = localStorage.getItem('myFav') ? localStorage.getItem('myFav') : "";
                return (
                        <div className="column">
                                <img  
                                className="dogPic" 
                                alt="" 
                                src={this.props.img} 
                                onClick={this.handleShowdialog} 
                                /> {/* Knap til at vælge favorithunde. Tjekker om hunden allerede er valgt som favorite i localstorage og sætter i såfald className til isfavorite */}
                                <button className={strFavs.includes(this.props.img) ? "favorite isfavorite" : "favorite"} id={this.props.img} onClick={() => this.favButton(this.props.img) }>Gaf</button>
                                {this.state.isOpen && (
                                        <dialog
                                        className="dialog"
                                        style={{ position: "fixed" }}
                                        open
                                        onClick={this.handleShowdialog}
                                        >
                                                <img
                                                className="image"
                                                src={this.props.img}
                                                onClick={this.handleShowdialog}
                                                alt=""
                                                />
                                        </dialog> 
                                )}
                                
                        </div>
                )

        }
         favButton(url) {
                 // Henter local storage og gemmer som array. Tilføjer valgte hund og gemmer som string i local storage
                if (document.getElementById(url).className === "favorite") { 
                        document.getElementById(url).className = "favorite isfavorite"
                        var favs = localStorage.getItem('myFav')
                        var favArr = []                        
                        if (favs) {
                                favArr = favs.split(",")
                        } 
                                favArr.push(url)
                                localStorage.setItem('myFav', favArr.toString())      
                               
                } else {
                        // Sletter hund fra local storage. 
                        document.getElementById(url).className = "favorite"
                        var myFavs = localStorage.getItem('myFav')
                        favArr = myFavs.split(",") 
                        var arrIndex = favArr.indexOf(url)
                        favArr.splice(arrIndex, 1)
                        localStorage.setItem('myFav', favArr.toString())
                }
}


}
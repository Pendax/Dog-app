import React from 'react';
import ReactDOM from 'react-dom'; 
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'; 
import Header from './components/Header'; 
import DogList from './components/DogList';  
import DogCategoryList from './components/DogCategoryList'; 
import FavouriteDogsList from './components/FavouriteDogsList'; 
import "./css/header.css";                
import "./css/SearchBar.css";  
import "./css/dogs.css";       
import './index.css';



class DogApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        };  
    }
    render() {
        return (
            <div>
                {/* React Router holder vores UI i sync med URL'en*/}
                <Router> 
                    <Header/> 
                    {/* Når vi befinder os i f.eks. http://localhost:3000/search/?hound path i URl'en
                    så bliver DogList component rendered*/}  
                    <Route path="/search/" component={DogList} />    
                    <Route exact path="/" component={DogList} /> 
                    <Route path="/Categories" component={DogCategoryList} />  
                    <Route path="/Favourites" component={FavouriteDogsList} />   
                </Router>
            </div>   
        ); 
    }
} 

ReactDOM.render(<DogApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

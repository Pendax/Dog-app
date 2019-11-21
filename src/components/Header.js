import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from "./SearchBar";
// importer withRouter så jeg kan tilgå props.history osv...
import { withRouter } from 'react-router';
import logo from '../img/dogLogo.png'; // with import   

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        };

        this.updateSearchFrase = this.updateSearchFrase.bind(this);
      
        this.handleSearch = this.handleSearch.bind(this);

    }

    // funktion som opdatere this.stat.searchTerm og kalder this.handleSearch efterfølgende som callback
    updateSearchFrase(e) {
        this.setState({ searchTerm: e.target.value }, this.handleSearch);
    }

   
    /* pusher til en ny path når funktionen bliver 
    kaldt og Categories component bliver så rendered */
    handleSearch() {
        this.props.history.push(
            "/Categories/?" +
            this.state.searchTerm
        ); 
    } 
  // bliver kaldt når "state" ændres  
    render() { 
        return (
            <div className="header">
                <Link to="/"><img alt="" className="logoDog" src={logo}></img><p className="logo">The Dog Gallery</p></Link>
                <SearchBar
                    placeholder="Search" 
                    onChange={this.updateSearchFrase}
                    onClick={this.handleSearch}
                />
                <div className="header-right">
                    <Link to="/" className="navClass"><p>Home</p></Link>
                    <Link to="/Favourites" className="navClass"><p>Favourites</p> </Link> 
                    <Link to="/Categories" className="navClass"><p>All Categories</p> </Link> 
                </div>
            </div>
        )
    }
}
// exporter withRouter så jeg kan tilgå props.history 
export default withRouter(Header); 
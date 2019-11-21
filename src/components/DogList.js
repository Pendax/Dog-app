import React from 'react';
import DogCard from './DogCard';
import BreedOverlay from './BreedOverlay';
import LoadMoreButton from './LoadMoreButton';


class DogList extends React.Component {
  
  constructor() {
    super();
        // State bliver benyttet til at opdatere componentet når
        // brugeren fortager sig en handling, som f.eks. at trykke
        // på en knap eller indtaste noget i et input felt, hvilket
        // så kan resultere i at properties i state objektet bliver ændret
        // og komponentet bliver så rerendered
    this.state = {
      dogs: [],
      amount: 35,
      currentAmount: 35,
      frontPageBanner: "Welcome to The Dog Gallery!"
    };
     
        // Når vi binder this fra event handleren til komponent instansen
        // i constructoren, så kan vi parse funktionen som et callback uden at 
        // bekymre sig om at midste dens context og vi sørger for at den referere korrekt til this  
    this.fetchDogData = this.fetchDogData.bind(this);
    this.loadMore = this.loadMore.bind(this); 

  }
   // Bliver kaldt når dette component bliver insat ind i dom træet for første gang
  componentDidMount() {  
    this.fetchDogData(); 
  }
// Bliver kaldt efter render metoden er udført  
  componentDidUpdate(prevProps, prevState, snapshot) {

    // Får fat i search frase i url'en  
    let currentSearch = this.props.location.search;
    let oldSearch = prevProps.location.search;


    // kun refresh hvis søgning ændret  
    if (currentSearch !== oldSearch) { 
      this.fetchDogData();
    }


  }
  // ændrer this.state.currentAmount til dens nuværende værdi plus den mængde vi gerne vil loade
  // (this.state.amount) og kalder this.fetchDogData som callback efterfølgende 
  loadMore() {

    this.setState({
      currentAmount: this.state.currentAmount + this.state.amount
    }, this.fetchDogData);

  }

    // Kalder api og henter hunde billider 
    // og opdatere this.state.dogs med de hentede billider 
  fetchDogData() { 
    var url = ""; 
    if (this.props.location.pathname === "/") {
      url = "https://dog.ceo/api/breeds/image/random/" + this.state.amount;

    } else {

      url = "https://dog.ceo/api/breed/" + this.props.location.search.substr(1) + "/images"; 
    }

       // "fetch" fetcher resurser asynkront hen over nettet 
    fetch(url, {
    })
      .then(response => { 
        // parser respons som json  
        return response.json();
      })
      .then(data => {
        // Sætter array variabel lig med nuværende værdi af this.state.dogs 
        var array = this.state.dogs;

        // for loop som kører ligeså mange gange som det antal billider vi gerne vil loade
        for (var i = this.state.currentAmount - this.state.amount; i < this.state.currentAmount; i++) {
          // Hvis datatypen er undefined så er der ikke flere billider at hente og vi
          // skal derfor ikke pushe inde i arrayet yderligere
          if (typeof data.message[i] != 'undefined') {
            array.push(data.message[i]);
          }
        }
 
        this.setState({
          dogs: array
        });
      }).catch(() => {
        console.log("An error occured");
      }); 

  }

// returner et object med DogCard komponenter for hver eneste entry i det array der 
// bliver parsed som parameterværdi
  renderDogs(dogs) {
    var i = 0;
    var loadMoreButton;
    // Får fat i query string i url og så fjener vi question mark 
    // ved at bruge substr(1) som fjerner første char
    var searchedBreed = this.props.location.search.substr(1); 
    var frontPage = this.props.location.pathname === "/" ? true : false;
    var breedBanner = searchedBreed.charAt(0).toUpperCase() + searchedBreed.substring(1) + " Breed";
    var text = frontPage ? this.state.frontPageBanner
      : breedBanner;

    // Hvis længden af dogs array er kortere end den nuværende mængde som vi gerne vil have,
    // så skal man ikke kunne load mere (da der ikke er mere at loade)
    // yderligere hvis vi er på forsiden så skal der heller ikke være en load mere button
    if (dogs.length < this.state.currentAmount 
      || frontPage) {
        loadMoreButton = "";   
    } 
    // Ellers sætter vi loadMoreButton variablen lig med et LoadMoreButton komponent  
    else {
      loadMoreButton = <LoadMoreButton onClick={this.loadMore} />;
    }
    return (
      <div>
        <BreedOverlay
          text={text}
        />
        <div className="row">
          {dogs.map(dog => (
            <DogCard
              key={i++} 
              img={dog}
            />
            
          ))}  
        </div>
        {loadMoreButton}
      </div>
    );
  }

  // bliver kaldt når "state" ændres 
  render() { 
    let contents =
      this.renderDogs(this.state.dogs);
    return (
      <div>{contents}</div>

    );

  }
}

export default DogList;




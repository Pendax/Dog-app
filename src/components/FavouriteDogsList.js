import React from 'react';
import DogCard from './DogCard';
import BreedOverlay from './BreedOverlay';


class FavouriteDogsList extends React.Component {
  
  constructor() {
    super();
    // State bliver benyttet til at opdatere componentet når
    // brugeren fortager sig en handling, som f.eks. at trykke
    // på en knap eller indtaste noget i et input felt.
    this.state = {
      dogs: []
    };
     

    this.fetchDogData = this.fetchDogData.bind(this);

  }
   // Bliver kaldt når dette component bliver insat ind i dom træet for første gang
  componentDidMount() {  
    this.fetchDogData(); 
  }
  // henter de hunde billider (som er gemt i string format) som er i localstorage
  // og putter dem ind i et array og opdatere state.dogs med det array.  
  fetchDogData() { 
    if (localStorage.getItem('myFav')) {
       
        var stringFavouriteDogs = localStorage.getItem('myFav');
        var favArr = stringFavouriteDogs.split(","); 
        this.setState({dogs: favArr}); 

      }

  }

// returner et object med DogCard komponenter for hver eneste entry i det array der 
// bliver parsed som parameterværdi   
  renderDogs(dogs) {
   var i = 0;
   var banner = this.state.dogs.length === 0 ? 
   "You haven't picked any favourites yet!" : "Your favourite dog pictures!";
    return (
      <div>
        <BreedOverlay
          text={banner} 
        />
        <div className="row">
          {dogs.map(dog => (
            <DogCard
              key={i++} 
              img={dog}
            />
            
          ))}  
        </div>
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

export default FavouriteDogsList;




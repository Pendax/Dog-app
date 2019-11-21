import React from 'react';  
import DogCategoryCard from './DogCategoryCard'; 
import BreedOverlay from "./BreedOverlay"


class DogCategoryList extends React.Component {
    constructor() {
        super();
        // State bliver benyttet til at opdatere componentet når
        // brugeren fortager sig en handling, som f.eks. at trykke
        // på en knap eller indtaste noget i et input felt, hvilket
        // så kan resultere i at properties i state objektet bliver ændret
        // og komponentet bliver så rerendered
        this.state = {
            categories: []
        };

        // Når vi binder this fra event handleren til komponent instansen
        // i constructoren, så kan vi parse funktionen som et callback uden at 
        // bekymre sig om at midste dens context og vi sørger for at den referere korrekt til this 
        this.fetchCategoryData = this.fetchCategoryData.bind(this);  
    } 
    // Bliver kaldt når dette component bliver insat ind i dom træet for første gang
    componentDidMount() {
        this.fetchCategoryData();  
    }
    // Bliver kaldt efter render metoden er udført 
    componentDidUpdate(prevProps, prevState, snapshot) { 
        // Får fat i search frase i url'en 
        let currentSearch = this.props.location.search;
        let oldSearch = prevProps.location.search;


        // kun refresh hvis søgning ændret  
        if (currentSearch !== oldSearch) {
            this.fetchCategoryData();
        }


    }
    // Kalder api og henter hunde categories 
    // og opdatere this.state.categories med de hentede kategorier 
    fetchCategoryData() {
      

        var url = "https://dog.ceo/api/breeds/list/all";
        // "fetch" fetcher resurser asynkront hen over nettet
        fetch(url, {
        })
            .then(response => {
                // parser respons som json 
                return response.json();
            }) 
            .then(json => {

                var arrayCategories = [];

                // json.message indeholder breed categories 
                for (let category in json.message) {
                    // Får fat i search frase i url'en og fjerner første char som er et question mark
                    var searchFrase = this.props.location.search.substr(1).toLowerCase(); 
                  

                    // tjekker om searchFrase matcher category 
                    if (category.includes(searchFrase)) { 

                        // Laver første bogstav til upper case. 
                        const breedName = category.charAt(0).toUpperCase()
                            + category.substring(1);

                       
                        fetch("https://dog.ceo/api/breed/" + category + "/images/random", {
                        })
                            .then(response => {
                                return response.json();
                            })
                            .then(json => {
                                arrayCategories.push({ "breedName": breedName, "breedPic": json.message });
                                this.setState({ categories: arrayCategories }) 
                            }).catch(() => {
                                console.log("An error occured");
                            });
                    }

                }
               

            }).catch(() => {
                console.log("An error occured");
            });

    }



// returner et object med DogCategoryCard komponenter for hver eneste entry i det array der 
// bliver parsed som parameterværdi 
    renderDogs(dogs) {

        return (
            <div className="row">
                {dogs.map(dog => (
                    <DogCategoryCard
                        key={dogs.indexOf(dog)}
                        dog={dog}
                    />

                ))}
            </div>
        );
    }


   // bliver kaldt når "state" ændres 
   // bliver også kaldt hvis this.props.history.push bliver brugt til at push til dette component
    render() {
         
        let contents =
            this.renderDogs(this.state.categories);
        return (
            <div> <BreedOverlay
                text={"Dog Breed Categories"}
            />
                {contents}
            </div> 

        );
    }
}

export default DogCategoryList;



 
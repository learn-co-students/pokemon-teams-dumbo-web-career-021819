// URLs
const baseUrl = 'http://localhost:3000';
const trainersUrl = `${baseUrl}/trainers`;
const pokemonsUrl = `${baseUrl}/pokemons`;


// Elements
const mainTag = document.querySelector('main');


// Helper Functions

const createTrainerCard = trainer => {
  return `<div class="card" data-id="${trainer["id"]}"><p>${trainer["name"]}</p>
            <button class="add" data-trainer-id="${trainer["id"]}">Add Pokemon</button>
            <ul></ul>
          </div>`;
};


const createPokemonListItem = pokemon => {
  return `<li>${pokemon["nickname"]} (${pokemon["species"]}) <button class="release" data-pokemon-id="${pokemon["id"]}">Release</button></li>`;
};


const deletePokemon = pokemonId => {
  fetch(`${pokemonsUrl}/${pokemonId}`, {
    method: 'DELETE'
  });
};


const addPokemon = pokemon => {
  return fetch(pokemonsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(pokemon)
  }).then(response => response.json());
};



document.addEventListener('DOMContentLoaded', event => {

  /*

  Fetching an array of trainer objects,
  making a display card for each trainer object,
  and then listing the members of that specific trainer's
  Pokémon team

  */

  fetch(trainersUrl).then(response => {
    return response.json();
  }).then(arrayOfTrainers => {
    arrayOfTrainers.forEach(trainer => {
      mainTag.innerHTML += createTrainerCard(trainer);
      let pokemonTeam = trainer["pokemons"];
      pokemonTeam.forEach(pokemon => {
        let ulTag = mainTag.lastChild.querySelector('ul');
        ulTag.innerHTML += createPokemonListItem(pokemon);
      });
    });
  });


  mainTag.addEventListener('click', event => {

    // Adding a Pokémon

    if (event.target.className === "add") {
      let currentAddPokemonButton = event.target;
      let divTagContainingAddButton = currentAddPokemonButton.parentElement;
      let ulTag = divTagContainingAddButton.querySelector('ul');
      let trainerId = parseInt(currentAddPokemonButton.dataset.trainerId);
      const pokemon = {
        "trainer_id": trainerId
      }
      let numberOfPokemon = ulTag.childElementCount;
      if (numberOfPokemon < 6) {
        addPokemon(pokemon).then(pokemon => {
          ulTag.innerHTML += createPokemonListItem(pokemon);
        });
      } else {
        alert("Release some Pokémon first!");
      };


    // Removing a Pokémon


    } else if (event.target.className === "release") {
      let currentReleasePokemonButton = event.target;
      let pokemonId = parseInt(currentReleasePokemonButton.dataset.pokemonId);
      deletePokemon(pokemonId);
      currentReleasePokemonButton.parentElement.remove();

    }; // This is the closing tag for the if/else if/else statement

  }); // This is the closing tag for the main tag event

}); // This is the closing tag for the document event

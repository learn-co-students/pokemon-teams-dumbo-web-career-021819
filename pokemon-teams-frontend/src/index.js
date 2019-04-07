const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.querySelector('main');

//creates Trainer card
const createTrainerCard = (trainer) => {
 return `<div class="card" id="${trainer.id}"><p>${trainer.name}</p>
  <button class="add-btn" data-trainer-id=${trainer.id}>Add Pokemon</button>
  <ul>
  </ul>
</div>
`};

//Used to add individual pokemon to team
const createPokemonTeam = (pokemon) => {
  return `<li>${pokemon.nickname} (${pokemon.species})
  <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`};

window.addEventListener('DOMContentLoaded', () => {

//populates page with API data
  fetch(TRAINERS_URL)
    .then((response) =>{
      return response.json();
    }).then((trainers) =>{
      trainers.forEach((trainer) => {
        mainTag.innerHTML += createTrainerCard(trainer);
        let trainerUl= mainTag.querySelector(`#\\3${trainer.id}`).querySelector('ul');
        trainer.pokemons.forEach((pokemon) => {
          trainerUl.innerHTML += createPokemonTeam(pokemon);
        })
      })
    });

//Add a pokemon to team
  mainTag.addEventListener('click', (event) => {
    if (event.target.className == 'add-btn') {
      if (event.target.parentElement.querySelectorAll('li').length == 6) {
        alert('The team is full! Please remove a pokemon before adding one.');
      } else {
        fetch(POKEMONS_URL, {
          method: "POST",
          headers: {'Content-Type': 'application/json',
                    Accept: "application/json"
                  },
          body: JSON.stringify({
            "trainer_id": `${event.target.parentElement.id}`
          })
        }).then((response) => {
          return response.json();
        }).then((pokemon) => {
          let trainerUl= mainTag.querySelector(`#\\3${event.target.parentElement.id}`).querySelector('ul')
          trainerUl.innerHTML += createPokemonTeam(pokemon);
        });

      };
      //release pokemon
    } else if (event.target.className == 'release') {
      fetch(`http://localhost:3000/pokemons/${event.target.dataset.pokemonId}`, {
        method: 'DELETE'
      }).then(() => {
        event.target.parentElement.delete();
      })
    };
  });


// DOMContentLoaded endpoint
});

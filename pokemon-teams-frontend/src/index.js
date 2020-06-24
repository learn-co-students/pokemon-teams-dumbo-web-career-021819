const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let addPokemon = false;
let mainDiv = document.querySelector('main');


fetch(TRAINERS_URL)
  .then( (response) => {
    return response.json();
  })
  .then( (trainers) => {
    trainers.forEach( (trainer) => {
      mainDiv.innerHTML += `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
                              <div class='new-pokemon-div' style="display:none">
                                <form class="new-pokemon-form" action='http://localhost:3000/pokemons' method='POST' >
                                  <label for="nickname">Nickname:</label>
                                  <input type="text" name="nickname" value=""><br>
                                  <label for="species">Species:</label>
                                  <input type="text" name="species" value=""><br>
                                  <input class="create-pokemon" type="Submit" value="Create New Pokemon">
                                </form>
                              </div>
                              <button class="add" data-trainer-id="1">Add Pokemon</button>
                              <ul>
                              </ul>
                            </div>`

      trainer.pokemons.forEach( (pokemon) => {
        let pokemonList = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`).querySelector('ul');
        pokemonList.innerHTML += `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`

      })

    });
  });

mainDiv.addEventListener('click', (e) => {
  if (e.target.className === 'add') {
  // hide & seek with the form
    let newPokemonDiv = e.target.parentElement.querySelector('.new-pokemon-div');
    addPokemon = !addPokemon
    if (addPokemon) {
      newPokemonDiv.style.display = 'block'
    } else {
      newPokemonDiv.style.display = 'none'
    }
  } else if (e.target.className === 'release') {
    let pokemonId = e.target.dataset.pokemonId;
    fetch(`http://localhost:3000/pokemons/${pokemonId}`,{
      method: "DELETE",
      headers: {
        "Accept": 'application/json',
        "Content-type": 'application/json'
      }
    })
      .then( response => {
        return response.json();
      })
      .then( json => {
        e.target.parentElement.remove();
      })
  } else if (e.target.className === "create-pokemon") {
    e.preventDefault();
    // console.log('created pokemon');
    // works
    let pokemonList = e.target.parentElement.parentElement.parentElement.querySelector('ul');
    if (pokemonList.children.length <= 6) {
      fetch("http://localhost:3000/pokemons/", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'nickname': e.target.parentElement.nickname.value,
          'species': e.target.parentElement.species.value,
          'trainer_id': parseInt(e.target.parentElement.parentElement.parentElement.dataset.id)
        })
      })
      .then( (response) => {
          return response.json();
      })
      .then( (pokemon) => {
          let pokemonList = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`).querySelector('UL');
          pokemonList.innerHTML += `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`;
      })
      .catch( (error) => {
          alert("Only 6 Pokemon allowed per team! Remove a pokemon before adding another!");
      })
    }

  };
});
//.querySelector('ul').children.length;

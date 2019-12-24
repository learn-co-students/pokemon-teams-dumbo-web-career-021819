const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


window.addEventListener('DOMContentLoaded', (event) => {
    mainTag = document.querySelector('main')

    fetchTrainers(mainTag);

    addPokemon(mainTag);

    deletePokemon(mainTag);
});



// / When the page loads, I want to make a GET request and then manipulate the DOM by rendering pokemon trainers and teams


const fetchTrainers = (mainTag) => {
  return fetch("http://localhost:3000/trainers").then((response) => {
    return response.json()
  }).then((trainers) => {
    trainers.forEach((trainer) => {

      // let pokemonUl = document.querySelector('ul')
      pokemonList = ""
      trainer.pokemons.forEach((pokemon) => {

          pokemonList += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
      })
      mainTag.innerHTML += trainerCard(trainer, pokemonList)
      // debugger;
    })
  })
}

const trainerCard = (trainer, pokemonList) => {
  return `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
      <button class="add" data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul class="pokemon-list">
      ${pokemonList}
      </ul>
      </div>`
}


// / When the the add button is clicked, I want to make a POST request and then manipulate the DOM by rendering that pokemon to the list


const addPokemon = (mainTag) => {
  mainTag.addEventListener('click', (event) => {
    if(event.target.innerText === "Add Pokemon") {
      // console.log(event)
      let ulTag = event.target.parentElement.querySelector('ul')
      let trainerId = event.target.dataset.trainerId
      newPokemonPost(trainerId, ulTag)
    }
  })
}

const newPokemonPost = (trainerId, ulTag) => {
  fetch("http://localhost:3000/pokemons", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': `${trainerId}`
    })
  }).then((response) => {
    return response.json()
  }).then((pokemon) => {
    if (ulTag.childElementCount < 6) {
      ulTag.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
    }
  })
}

// / When the the release button is clicked, I want to make a DELETE request and then manipulate the DOM by removing that pokemon (<li>) from the list

const deletePokemon = (mainTag) => {
  mainTag.addEventListener('click', (event) => {
    if (event.target.innerText === 'Release') {
      let pokemonId = event.target.dataset.pokemonId
      let liTag = event.target.parentElement
      // debugger;
      deleteRequest(pokemonId, liTag)
      // event.target.parentElement.remove()
    }
  })
}

const deleteRequest = (pokemonId, liTag) => {
  fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
    method: 'DELETE',
  })
  // debugger;
  liTag.remove()
}

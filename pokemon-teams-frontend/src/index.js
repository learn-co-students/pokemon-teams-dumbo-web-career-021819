const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.querySelector('main');

document.addEventListener('DOMContentLoaded', event => {
  fetchTrainerData().then(parsedTrainerData => {
    for (let trainer of parsedTrainerData) {
      mainTag.innerHTML += createTrainerCard(trainer);
      const currentCardDivTag = mainTag.querySelector(`[data-id="${trainer.id}"]`)
      const currentCardUlTag = currentCardDivTag.querySelector('ul');
      for (let pokemonObj of trainer["pokemons"]) {
        currentCardUlTag.innerHTML += `<li>${pokemonObj.nickname} (${pokemonObj.species}) <button name="free" class="release" data-pokemon-id="${pokemonObj.id}">Release</button></li>`
      }
    }
  })
})

const createTrainerCard = (trainerObj) => {
  return `<div class="card" data-id="${trainerObj.id}"><p>${trainerObj.name}</p>
      <button name="add" data-trainer-id="${trainerObj.id}">Add Pokemon</button>
      <ul>
      </ul>
   </div>
  `
};

const fetchTrainerData = () => {
  return fetch(TRAINERS_URL)
    .then(response => {
      return response.json();
    })
}

const addPokemon = (id) => {
  return fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "trainer_id": id
    })
  })
    .then(response => {
      return response.json();
    })
}

const releasePokemon = (id) => {
  fetch(`${POKEMONS_URL}/${id}`, {
    method: 'DELETE'
  })
}

mainTag.addEventListener('click', event => {
  if (event.target.innerHTML === "Add Pokemon") {
    const currentTrainerID = parseInt(event.target.dataset.trainerId);

    if (event.target.parentElement.querySelectorAll('li').length < 6) {
    addPokemon(currentTrainerID)
      .then(pokemonObj => {
        const currentCardDivTag = mainTag.querySelector(`[data-id="${currentTrainerID}"]`)
        const currentCardUlTag = currentCardDivTag.querySelector('ul');

        currentCardUlTag.innerHTML += `<li>${pokemonObj.nickname} (${pokemonObj.species}) <button name="free" class="release" data-pokemon-id="${pokemonObj.id}">Release</button></li>`
      })
    }

  } else if (event.target.innerHTML === "Release") {
    const currentPokemon = parseInt(event.target.dataset.pokemonId);
    releasePokemon(currentPokemon);
    event.target.parentElement.remove();
  }

})

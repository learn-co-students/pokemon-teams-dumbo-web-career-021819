const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const createTrainerCardHTML = (trainer) => {
  return `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
          <button data-trainer-id="${trainer.id}">Add Pokemon</button>
          <ul>
          </ul>
        </div>`
}

const createPokemonCardHTML = (pokemon) => {
  return `<li>${pokemon.nickname}(${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}

let trainersTag = document.querySelector('main')

fetch(TRAINERS_URL)
.then(response => response.json())
.then(trainersArray => trainersArray.forEach(trainer => {
	trainersTag.innerHTML += createTrainerCardHTML(trainer)
    trainer.pokemons.forEach(pokemon => {
		trainersTag.lastChild.querySelector('ul').innerHTML += createPokemonCardHTML(pokemon)
    })
}))




document.addEventListener('click', (event) => {
    if(event.target.innerText === "Add Pokemon"){
      // debugger
      return fetch(POKEMONS_URL, {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json'},
        body:JSON.stringify({trainer_id: event.target.parentElement.dataset.id})}
      )
      .then(res => res.json())
		  .then(res => event.target.parentElement.querySelector('ul').innerHTML += createPokemonCardHTML(res))
    } else if (event.target.innerText === "Release"){
      fetch( `${POKEMONS_URL}/${event.target.dataset.pokemonId}`,{
      method: 'DELETE'
      })
       event.target.parentElement.remove()
    }
})

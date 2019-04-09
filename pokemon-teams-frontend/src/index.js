const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.querySelector('main')

const trainerCard = (trainerObj)=>{
  return `<div class="card" data-id="${trainerObj.id}"><p>${trainerObj.name}</p>
  <button name="add" data-trainer-id="${trainerObj.id}">Add Pokemon</button>
  <ul class="pokelist-${trainerObj.id}">
  </ul>
</div>`
}

let pokemonLiTemplate = (pokemon)=>{
  return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-trainer-id="${pokemon.trainer_id}" data-pokemon-id="${pokemon.id}">Release</button></li>`
}

fetch(TRAINERS_URL)
.then((response)=>{return response.json()})
.then((trainers)=>{
  trainers.forEach((trainer)=>{
    let assocPokemon = trainer.pokemons;
    // console.log(`My name is ${trainer.name}! I have ${trainer.pokemons.length} pokemon.`)
    mainTag.innerHTML += trainerCard(trainer)
    const pokeUlTag = document.querySelector(`ul.pokelist-${trainer.id}`)
    assocPokemon.forEach((pokemon)=>{
      pokeUlTag.innerHTML += pokemonLiTemplate(pokemon)
    })
  })
})

mainTag.addEventListener('click', (event)=>{
  if (event.target.name == "add") {
    let trainer_id = event.target.dataset.trainerId
    const trainerObj = {"trainer_id": trainer_id}
    addPokemon(trainerObj).then((pokemon)=>{
      const pokeUlTag = document.querySelector(`ul.pokelist-${pokemon.trainer_id}`)
      pokeUlTag.innerHTML += pokemonLiTemplate(pokemon)
    })
  }
  else if (event.target.className == "release") {
    releasePokemon(event.target.dataset.pokemonId)
    event.target.parentElement.remove()
  }
  else (console.log('almost'))
})

const addPokemon = (pokemonObj) => {
  return fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
  		'Content-Type': 'application/json',
  		'Accept': 'application/json'
  	},
    body: JSON.stringify(pokemonObj)
  })
  .then((response)=>{return response.json()})
}

const releasePokemon = (pokemonId)=>{
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: 'DELETE'
  })
}

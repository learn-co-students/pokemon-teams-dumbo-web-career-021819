const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', () => {
let main = document.querySelector('main');
let pokemon = fetch(TRAINERS_URL)
.then( promise => promise.json())
.then( response => response.forEach( trainer => {
  main.innerHTML += createTrainerCard(trainer)
  trainer.pokemons.forEach( pokemon => {
    main.lastChild.querySelector('ul').innerHTML += createPokemonCard(pokemon)
  })
  // `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
  //  <button data-trainer-id=${trainer.id}>Add Pokemon</button>
  //   </div>`
  }))
  main.addEventListener('click', (event) => {
     if (event.target.className === 'release') {
         let eve = event.target
         let pokId = event.target.dataset.pokemonId
         eve.parentNode.remove()
         deletePokemon(pokId)
     } else if (event.target.className === 'add') {
       let trainerId = event.target.dataset.trainerId
       // console.log(trainerId)
       postNewPokemon(trainerId)
       // location.reload()
     }
   }
)}
);

function createTrainerCard (trainer) {
  return `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
   <button class="add" data-trainer-id=${trainer.id}>Add Pokemon</button>
   <ul></ul>
    </div>`
}

function createPokemonCard (pokemon) {
  return `
    <li>${pokemon.nickname}(${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
    `
}

function deletePokemon (id) {
  fetch(`http://localhost:3000/pokemons/${id}`, {
    method: 'DELETE' })}


function postNewPokemon(id) {
  let nick = prompt("What's the nickname?")
  let specie = prompt("What's the species?")
  let newPoke = {
    nickname:	nick,
    species:	specie,
    trainer_id:	id
  }
  fetch('http://localhost:3000/pokemons', {
    method: 'POST',
    headers:
  {
   'Content-Type' : "application/json",
   'Accept': "application/json"
  },
   body: JSON.stringify(newPoke)
 }).then( response => {
   if(response.status === 201) {
    location.reload()
  } else {
    console.log("Waiting");
  }
 })
 // createPokemonCard(newPoke)
}

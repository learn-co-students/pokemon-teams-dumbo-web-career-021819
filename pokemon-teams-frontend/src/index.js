const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const mainTag = document.querySelector('main')

const createTrainerCard = (trainer) => {
    return `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul>
    </ul>
  </div>`
}

const createPokemon = (pokemon) => {
    return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
    `
}

const addPokemon = (trainerId) => {
    return fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({trainer_id: trainerId})
    }).then(response => {
        return response.json()
    })
}

const deletePokemon = (id) => {
    fetch(`http://localhost:3000/pokemons/${id}`, {
        method: 'DELETE'
    })
}

fetch(TRAINERS_URL)
.then((resp) => {
    return resp.json()
}).then((trainer) => {
    trainer.forEach((trainer => {
        mainTag.innerHTML += createTrainerCard(trainer)
        trainer.pokemons.forEach((pokemon) => {
            const ulTag = mainTag.lastChild.querySelector('ul')
            ulTag.innerHTML += createPokemon(pokemon)
        })
    }))
})

mainTag.addEventListener('click', (event) => {
    let ulTag = event.target.parentElement.querySelector('ul');

    if(event.target.innerHTML === 'Add Pokemon') {
        let trainerId = ulTag.parentElement.dataset.id
        let pokemonCount = ulTag.childElementCount;
        if(pokemonCount < 6) {
            addPokemon(trainerId).then(newPokemon => {
                ulTag.innerHTML += createPokemon(newPokemon);
            })
        }
    }
    if(event.target.className === "release") {
        deletePokemon(event.target.dataset.pokemonId)
        event.target.parentElement.remove()
    }
})
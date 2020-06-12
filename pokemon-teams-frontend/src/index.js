const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(e) {
    console.log('All Loaded!');
    loadTrainersAndPokemon();
    deleteListener();
    addListener()
})

let i=0
const makeTrainerTag = (trainerObj) => {
    return `<div class="card" data-id="${i++}"><p>${trainerObj.name}</p>
    <button data-trainer-id="${trainerObj.id}">Add Pokemon</button>
    <ul>
    </ul>
    </div>`
}

const makePokemonTag = (pokemonObj) => {
    const newLi = document.createElement('li')
    newLi.innerHTML = `${pokemonObj.nickname} (${pokemonObj.species}) <button class="release" data-pokemon-id="${pokemonObj.id}">Release</button>`
    return newLi
}

const loadTrainersAndPokemon = () => {
    fetch('http://localhost:3000/trainers')
    .then(resp => resp.json())
    .then(trainersArray => trainersArray.forEach (trainerObj => {
        const mainTag = document.querySelector('main');
        mainTag.innerHTML += makeTrainerTag(trainerObj);
        trainerObj.pokemons.forEach (pokemon => {
            mainTag.lastChild.querySelector('ul').append(makePokemonTag(pokemon))
        })
    }))
}

const main = document.querySelector('main')

const deleteListener =() => {
    main.addEventListener('click', function(e) {
    if (e.target.className === 'release') {
        e.target.parentElement.remove();
        const pokemonId = e.target.dataset.pokemonId
        fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: 'DELETE'
        })
    }
})}

function addListener() {
    document.addEventListener('click', function(e) {
        if (e.target.innerText === 'Add Pokemon') {
            const pokemonCount = e.target.parentElement.querySelectorAll('li').length;
            (pokemonCount < 6) ? addPokemonForm(e) : alert('You can only have 6 Pokemon! Please release one first.');
        }else if (e.target.className === 'nvm'){
            e.target.parentElement.remove();
        }else if (e.target.className === 'add') {
            const pokemonLi = e.target.parentElement
            const rawInput = pokemonLi.querySelector('input').value;
            const pokemonObj = {
                nickname: /.*(?=\s\()/.exec(rawInput)[0],
                species: /(?<=\().*(?=\))/.exec(rawInput)[0],
                trainerId: e.target.parentElement.parentElement.parentElement.querySelector('button').dataset.trainerId
            };
            createPokemonInDB(pokemonObj)
            .then(obj => {

                pokemonLi.parentElement.append(makePokemonTag(obj));
                const form = document.querySelector('#new-pokemon-li')
                pokemonLi.remove()
                // debugger
            })//.then(() => pokemonLi.remove())
            // e.target.parentElement.remove()
            // pokemonLi.remove()
            // console.log(pokemonLi.parentElement)

        }
    })
}

function createPokemonInDB(pokemonObj) {
    return fetch(POKEMONS_URL, {
    method: 'POST',
	headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nickname: pokemonObj.nickname, species: pokemonObj.species, 'trainer_id': pokemonObj.trainerId}
    )})
    .then(resp => resp.json())
}

function createPokemonTag(pokemonObj) {

}

function addPokemonForm(e) {
    // debugger
    e.target.parentElement.querySelector('ul').innerHTML += formTag
}

const formTag = `<li id='new-pokemon-li'><input placeholder="nickname (species)"><button class="add">Add</button><button class="nvm">X</button></li>`

// const pokemonCount = (trainerId, e) => {
//     // let pokemonCount = 6;
//     fetch(`${TRAINERS_URL}`)
//     .then(resp => resp.json())
//     .then(trainers => trainers[ trainerId - 1 ].pokemons.length)
//     .then(pokemonCount => addPokemonOrNot(pokemonCount, e))
// }

// function addPokemonOrNot(num, e) {
//     if (num < 6) {
//         const pokemonUl = e.target.parentElement.querySelector('ul')
//         pokemonUl.innerHTML += 'heyyy'
//     }else{
//         alert('You can only have 6 Pokemon!')
//     }
// }

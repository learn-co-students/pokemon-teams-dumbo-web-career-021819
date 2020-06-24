const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainTag = document.querySelector('main')

fetch(TRAINERS_URL).then((response)=> { return response.json()})
.then((trainers)=>{ 
trainers.forEach((trainer)=> {

    let trainerLiTag = ""

	const trainerPopulate = (array)=> {array.forEach((item)=>
		{trainerLiTag += `<li>${item.nickname} (${item.species}) <button class="release" data-pokemon-id="${item.id}">Release</button></li>`

	})
	return trainerLiTag
	}
	
	mainTag.innerHTML += `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
  <button data-trainer-id="${trainer.id}">Add Pokemon</button>
  <ul>
  ${trainerPopulate(trainer.pokemons)}
  </ul>
</div>`
})

}).then(() => {
console.log('LoadedMOFO')
   mainTag.addEventListener('click', (event) => {
    const trainerID = event.target.dataset.trainerId
	if (event.target.innerHTML == "Add Pokemon") {
	
		     fetch(TRAINERS_URL).then((response)=> {return response.json()})
             .then((trainers)=>{

        	                   trainers.forEach((trainer)=>{
        	                   if (trainer.id == trainerID) {
        	                   	trainer
        	                  
                                    if (trainer.pokemons.length >=6){
        		                    alert("You can only have 6 on a team\nPlease release before adding more")
        		                    location.reload();
        	                        }
        	                        console.log('match')

        	                    //ADD NEW POKEMON WITH FETCH
        	                        fetch(POKEMONS_URL, {
        	                    	    method:'POST',
        	                    	    headers: {
        	                    		    'Content-Type': 'application/json'
        	                    	             }, 
        	                    	             body: JSON.stringify({"trainer_id": `${trainer.id}`})
        	                        }).then((response)=> {return response.json()
                                    })
                                    .then((object)=> {
                                    	

                                    	mainTag.querySelectorAll(`.card[data-id="${trainer.id}"]`)[0].lastElementChild.innerHTML += `<li>${object.nickname} (${object.species}) <button class="release" data-pokemon-id="${object.id}">Release</button></li>`


                                    })
        	                    }
        
    


	                           })
              })

    }
 //create item remove function here

if (event.target.innerHTML == "Release"){ 
	//create a fetch to DELETE from datbase by ID. 

	let id = event.target.dataset.pokemonId
	
	fetch(`${POKEMONS_URL}/${id}`, {method:"DELETE"})
	.then((response)=> {console.log(response)}).then(()=>{

event.target.parentElement.remove()
	})

}


  })

  

})

 




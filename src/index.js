document.addEventListener('DOMContentLoaded', () => {
  fetchTrainers()
})

// fetch trainers and their associated pokemon
function fetchTrainers () {
  fetch('http://localhost:3000/trainers')
  .then(res => res.json())
  .then(trainers => {
    trainers.forEach((trainer) => showTrainer(trainer))
  })
}

function showTrainer (trainer) {
  let main = document.querySelector('main')
  let trainerDiv = document.createElement('div')
  let trainerName = document.createElement('p')
  let addBtn = document.createElement('button')
  let pokeList = document.createElement('ul')

  for (let i = 0; i < trainer.pokemons.length; i++) {
    showPokemon(trainer.pokemons[i], pokeList)
  }

  trainerDiv.className = 'card'
  trainerName.innerText = trainer.name
  addBtn.innerText = 'Add Pokemon'
  pokeList.id = `trainer-${trainer.id}`

  main.appendChild(trainerDiv)
  trainerDiv.append(trainerName, addBtn, pokeList)

  addBtn.addEventListener('click' , () => {
    addPokemon(trainer)
  })
}

// add a pokemon from the backend
function addPokemon (trainer) {
  let pokeCount = this.event.target.nextElementSibling.children.length
  if (pokeCount <= 5) {
    fetch('http://localhost:3000/pokemons', {
      method: 'post',
      body: JSON.stringify({trainer_id: trainer.id}),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(res => res.json())
    .then(pokemon => showPokemon(pokemon))
  } else {
    window.alert("You can only have 6 pokemon!!! Don't be greedy, give one up and then you can add another.")
  }
}

// add the new pokemon to the front end
function showPokemon (pokemon, pokeList) {
  if (pokeList === undefined) {
    pokeList = document.getElementById(`trainer-${pokemon.trainer_id}`)
  }
  let pokeName = document.createElement('li')
  let relBtn = document.createElement('button')

  pokeName.innerText = `${pokemon.nickname} (${pokemon.species})`
  pokeName.id = `trainer-${pokemon.trainer_id}-pokemon-${pokemon.id}`
  relBtn.className = 'release'
  relBtn.innerText = 'Release'

  pokeList.appendChild(pokeName)
  pokeName.appendChild(relBtn)

  relBtn.addEventListener('click', () => {
    releasePokemon(pokemon)
  })
}

// release a pokemon from front end optimistically
function releasePokemon (pokemon) {
  let poke = document.getElementById(`trainer-${pokemon.trainer_id}-pokemon-${pokemon.id}`)
  poke.remove()
  deletePokemon(pokemon)
}

// 'release' pokemon from backend
function deletePokemon (pokemon) {
  fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {method: 'delete'})
}

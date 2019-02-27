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
  // access pokemon by trainer.pokemons[0]
  // refactor with a showpokemon later
  let main = document.querySelector('main')
  let trainerDiv = document.createElement('div')
  let trainerName = document.createElement('p')
  let addBtn = document.createElement('button')
  let pokeList = document.createElement('ul')

  trainer.pokemons.forEach((pokemon) => { //try with a regular for loop
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
  })

  trainerDiv.className = 'card'
  trainerName.innerText = trainer.name
  addBtn.innerText = 'Add Pokemon'
  pokeList.id = `trainer-${trainer.id}`

  main.appendChild(trainerDiv)
  trainerDiv.append(trainerName, addBtn, pokeList)

  addBtn.addEventListener('click' , addPokemon)
}

// add a pokemon from the backend
function addPokemon (e) {
  let pokeCount = e.target.nextElementSibling.children.length
  if (pokeCount <= 5) {
    let id = e.target.nextElementSibling.id.split('-')[1]
    fetch('http://localhost:3000/pokemons', {
      method: 'post',
      body: JSON.stringify({trainer_id: id}),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(res => res.json())
    .then(pokemon => showNewPokemon(pokemon))
  } else {
    window.alert("You can only have 6 pokemon!!! Don't be greedy, give one up and then you can add another.")
  }
}

// add the new pokemon to the front end
function showNewPokemon (pokemon) {
  let pokeList = document.getElementById(`trainer-${pokemon.trainer_id}`)
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

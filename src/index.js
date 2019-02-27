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

  trainer.pokemons.forEach((pokemon) => {
    let pokeName = document.createElement('li')
    let relBtn = document.createElement('button')

    pokeName.innerText = `${pokemon.nickname} (${pokemon.species})`
    relBtn.className = 'release'
    relBtn.innerText = 'Release'

    pokeList.appendChild(pokeName)
    pokeName.appendChild(relBtn)

    // relBtn.addEventListener('click', releasePokemon)
  })

  trainerDiv.className = 'card'
  trainerName.innerText = trainer.name
  addBtn.innerText = 'Add Pokemon'

  main.appendChild(trainerDiv)
  trainerDiv.append(trainerName, addBtn, pokeList)

  addBtn.addEventListener('click' , addPokemon)
}

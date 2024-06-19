const characterCard = document.querySelector('.character__wrapper')
const searchInput = document.getElementById('input-id')
const baseURL = 'https://rickandmortyapi.com/api/character'

const fetchAllCharacter = async () => {
    const response = await fetch(baseURL, {
        method: 'GET',
    })
    if (!response.ok) {
        throw new Error('Ошибка запроса')
    }
    return await response.json()
}

const displayCharacters = (characters) => {
    characterCard.innerHTML = ''
    characters.forEach((character) => {
        characterCard.innerHTML +=
            `<div class="character__card">
                <p class="character__title">${character.name}</p>
                <img class="character__img" src="${character.image}" alt="${character.name}">
                <div class="character__text-wrapper">
                    <p class="character__text">Specie: <span>${character.species}</span></p>
                    <p class="character__text">State: <span>${character.status}</span></p>
                    <p class="character__text">Location: <span>${character.location.name}</span></p>
                </div>
            </div>
            `
    })
}

const filterCharactersByName = (characters, name) => {
    return characters.filter(character => {
        return (`
        ${character.name} 
        ${character.status} 
        ${character.location.name} 
        ${character.species}
        `).toLowerCase().includes(name.toLowerCase().trim())
    })
}

const getFilteredCharacters = async () => {
    const response = await fetchAllCharacter()
    displayCharacters(response.results)
    searchInput.addEventListener('input', (event) => {
        const filteredCharacters = filterCharactersByName(response.results, event.target.value)
        displayCharacters(filteredCharacters)
    })
}

getFilteredCharacters()
    .catch(error => {
        console.error('Ошибка запроса: ', error)
    })
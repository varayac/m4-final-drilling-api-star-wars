const BASE_URL = 'https://swapi.dev/api/people/'
// let popularData, secondaryData, significantData
// let popularGen, secondaryGen, significantGen
let isPopularDone = false
let isSecondaryDone = false
let isSignificantDone = false

const fetchData = async () => {
    /*  
    const responsePage1 = await fetch(`${BASE_URL}?page=1`)
    const responsePage2 = await fetch(`${BASE_URL}?page=2`)
    const page1 = await responsePage1.json()
    const page2 = await responsePage2.json()
    const data1 = page1.results
    const data2 = page2.results
    const allData = [...data1, ...data2]
*/

    const [responsePage1, responsePage2] = await Promise.all([
        fetch(`${BASE_URL}?page=1`),
        fetch(`${BASE_URL}?page=2`),
    ])
    const [page1, page2] = await Promise.all([responsePage1.json(), responsePage2.json()])
    const allData = [...page1.results, ...page2.results]

    const popularPeople = await allData.slice(0, 5)
    const secondaryPeople = await allData.slice(5, 10)
    const significantPeople = await allData.slice(11, 16)

    try {
        console.log('allPeople: ', allData)
        console.log('popularPeople: ', popularPeople)
        console.log('secondaryPeople: ', secondaryPeople)
        console.log('significantPeople: ', significantPeople)

        return { allData, popularPeople, secondaryPeople, significantPeople }
        // return allData
    } catch (error) {
        console.error('Error al obtener datos de la API: ', error)
        return []
    } finally {
        // loadingData(false)
        console.log('DATOS CARGADOS EXITOSAMENTE...')
    }
}

// loadingData = () => {}

// BLOQUE PRIMEROS 5 (0-5) PERSONAJES
// Funcion generadora que recorre y pinta los personajes "populares"(?) via template en row1
function* popularGenerator(data) {
    const popularSection = document.getElementById('popular-section')
    const popularTemplate = document.getElementById('popular-template')
    const fragment = document.createDocumentFragment()
    // popularData = data.slice(0, 5)

    for (let item of data) {
        // yield console.log(`Nombre: ${item.name} Altura: ${item.height} Peso: ${item.mass}`)
        const clone = popularTemplate.content.cloneNode(true)
        clone.querySelector('.card-title').textContent = item.name
        clone.querySelector('.height').textContent = item.height
        clone.querySelector('.mass').textContent = item.mass
        fragment.appendChild(clone)
        yield popularSection.appendChild(fragment)
    }
}
// Funcion que gatilla la funcion generadora y valida su estado
const triggerPopularCards = (popularGen) => {
    if (!isPopularDone) {
        const { value, done } = popularGen.next()
        console.log(`popularGen VALUE: ${value}, DONE: ${done}`)
        isPopularDone = done
    } else {
        console.log('Nada mas que imprimir')
    }
}
// FIN BLOQUE PRIMEROS 5 (0-5) PERSONAJES

// BLOQUE 6-11 (5-10) PERSONAJES
// Funcion generadora que recorre y pinta los personajes "secundarios"(?) via template en row2
function* secondaryGenerator(data) {
    const secondarySection = document.getElementById('secondary-section')
    const secondaryTemplate = document.getElementById('secondary-template')
    const fragment = document.createDocumentFragment()
    // secondaryData = data.slice(5, 11)

    for (let item of data) {
        // yield console.log(`Nombre: ${item.name} Altura: ${item.height} Peso: ${item.mass}`)
        const clone = secondaryTemplate.content.cloneNode(true)
        clone.querySelector('.card-title').textContent = item.name
        clone.querySelector('.height').textContent = item.height
        clone.querySelector('.mass').textContent = item.mass
        fragment.appendChild(clone)
        yield secondarySection.appendChild(fragment)
    }
}
// Funcion que gatilla la funcion generadora y valida su estado
const triggerSecondaryCards = (secondaryGen) => {
    if (!isSecondaryDone) {
        const { value, done } = secondaryGen.next()
        console.log(`secondaryGen VALUE: ${value}, DONE: ${done}`)
        isSecondaryDone = done
    } else {
        console.log('Nada mas que imprimir')
    }
}
// FIN BLOQUE 6-11 (5-10) PERSONAJES

// BLOQUE 12-17 (11-16) PERSONAJES
// Funcion generadora que recorre y pinta los personajes "significativos"(?) via template en row3
function* significantGenerator(data) {
    const significantSection = document.getElementById('significant-section')
    const significantTemplate = document.getElementById('significant-template')
    const fragment = document.createDocumentFragment()
    // secondaryData = data.slice(5, 11)

    for (let item of data) {
        // yield console.log(`Nombre: ${item.name} Altura: ${item.height} Peso: ${item.mass}`)
        const clone = significantTemplate.content.cloneNode(true)
        clone.querySelector('.card-title').textContent = item.name
        clone.querySelector('.height').textContent = item.height
        clone.querySelector('.mass').textContent = item.mass
        fragment.appendChild(clone)
        yield significantSection.appendChild(fragment)
    }
}
// Funcion que gatilla la funcion generadora y valida su estado
const triggerSignificantCards = (significantGen) => {
    if (!isSignificantDone) {
        const { value, done } = significantGen.next()
        console.log(`significantGen VALUE: ${value}, DONE: ${done}`)
        isSignificantDone = done
    } else {
        console.log('Nada mas que imprimir')
    }
}
// FIN BLOQUE 12-17 (11-16) PERSONAJES

document.addEventListener('DOMContentLoaded', async () => {
    const popularMainCard = document.getElementById('popular-main-card')
    const secondaryMainCard = document.getElementById('secondary-main-card')
    const significantMainCard = document.getElementById('significant-main-card')
    // Se cargan los arrays cortados de la funcion fetch
    const { popularPeople, secondaryPeople, significantPeople } = await fetchData()

    const popularGen = popularGenerator(popularPeople)
    const secondaryGen = secondaryGenerator(secondaryPeople)
    const significantGen = significantGenerator(significantPeople)

    popularMainCard.addEventListener('mouseover', () => triggerPopularCards(popularGen))
    secondaryMainCard.addEventListener('mouseover', () => triggerSecondaryCards(secondaryGen))
    significantMainCard.addEventListener('mouseover', () => triggerSignificantCards(significantGen))
    /* 
    popularMainCard.addEventListener('click', () => triggerPopularCards(popularGen))
    secondaryMainCard.addEventListener('click', () => triggerSecondaryCards(secondaryGen))
    significantMainCard.addEventListener('click', () => triggerSignificantCards(significantGen)) 
    */
})

const BASE_URL = 'https://swapi.dev/api/people/'
let popularGen
let isDone = false

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

    try {
        console.log('allData: ', allData)
        return allData
    } catch (error) {
        console.error('Error al obtener datos de la API: ', error)
        return []
    } finally {
        // loadingData(false)
        console.log('YA CARGUE...')
    }
}

function* popularGenerator(data) {
    const popularSection = document.getElementById('popular-section')
    const popularTemplate = document.getElementById('popular-template')
    const fragment = document.createDocumentFragment()
    const popularData = data.splice(0, 5)

    for (let item of popularData) {
        // yield console.log(`Nombre: ${item.name} Altura: ${item.height} Peso: ${item.mass}`)
        const clone = popularTemplate.content.cloneNode(true)
        clone.querySelector('.card-title').textContent = item.name
        clone.querySelector('.height').textContent = item.height
        clone.querySelector('.mass').textContent = item.mass
        fragment.appendChild(clone)
        yield popularSection.appendChild(fragment)
    }
}

const printPopularCards = () => {
    if (!isDone) {
        const { value, done } = popularGen.next()
        console.log(`VALUE: ${value}, DONE: ${done}`)
        isDone = done
    } else {
        console.log('Nada mas que imprimir')
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const popularMainCard = document.getElementById('popular-main-card')
    const secondaryMainCard = document.getElementById('secondary-main-card')
    const significantMainCard = document.getElementById('significant-main-card')

    const data = await fetchData()
    popularGen = popularGenerator(data)

    popularMainCard.addEventListener('click', () => printPopularCards())
})

const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchValue = document.querySelector('.input-field input')
let allCountriesCards

const formatPopulationNumber = (number) => {
    return new Intl.NumberFormat('en-IN').format(number);
}

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        renderCountriesCards(data)
        allCountriesCards = data
    })

filterByRegion.addEventListener('change', (e) => {
    // console.log(e.target.value);
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
        .then(res => res.json())
        .then(renderCountriesCards)
})

searchValue.addEventListener('input', (e) => {
    // console.log(e.target.value);
    const searchCountries = allCountriesCards.filter((country) => {
        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    renderCountriesCards(searchCountries)
})

function renderCountriesCards(data) {
    countriesContainer.innerHTML = ''
    // console.log(data);
    data.forEach(country => {
        const cardContainer = document.createElement('a')
        cardContainer.classList.add('card-container')
        cardContainer.href = `/country.html?name=${country.name.common}`
        // console.log(cardContainer);
        const cardHTML = `
                        <img src = ${country.flags.svg} alt=${country.flags.alt}>
                        <div class="card-content">
                            <h3>${country.name.common}</h3>
                            <p><b>Population: ${formatPopulationNumber(country.population)}</b></p>
                            <p><b>Region: ${country.region} </b></p>
                            <p><b>Capital: ${country.capital?.[0]} </b></p>
                        </div>
                `
        cardContainer.innerHTML = cardHTML
        countriesContainer.append(cardContainer)
    })
}

const darkMode = document.querySelector('.dark-mode')
const darkModeValue = JSON.parse(localStorage.getItem('darkModeValue')) || {}


darkMode.addEventListener('click', () => {
    document.body.classList.toggle('switch-to-dark')
    if (document.body.classList.contains('switch-to-dark')) {
        darkModeValue.isDark = true
    } else {
        darkModeValue.isDark = false
    }
    localStorage.setItem('darkModeValue', JSON.stringify(darkModeValue))
})

if (darkModeValue.isDark) {
    document.body.classList.add('switch-to-dark')
}



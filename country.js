const countryName = new URLSearchParams(location.search).get('name')
const mainElement = document.querySelector('main')
const countryFlag = document.querySelector('.flag-image img')
const countryNameElement = document.querySelector('.country-info h2')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.tld')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
const borderCountriesSpan = document.querySelector('.border-countries span')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => res.json())
    .then(([country]) => {

        countryFlag.src = country.flags.svg
        countryNameElement.innerText = country.name.common


        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        } else {
            nativeName.innerText = country.name.common
        }
        population.innerText = country.population.toLocaleString('en-IN')
        region.innerText = country.region

        if (country.subregion) {
            subRegion.innerText = country.subregion
        }

        if (country.capital) {
            capital.innerText = country.capital.join(', ')
        }

        topLevelDomain.innerText = country.tld.join(', ')

        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
        }

        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(', ')
        }

        if (country.borders) {
            country.borders.forEach((border) => {
                // console.log(border);
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([border]) => {
                        // console.log(border.name.common);
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.innerText = border.name.common
                        borderCountryTag.href = `/country.html?name=${border.name.common}`
                        borderCountries.append(borderCountryTag)
                    })
            })
        } else {
            borderCountriesSpan.innerText = 'No neighboring countries'
        }
    })


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


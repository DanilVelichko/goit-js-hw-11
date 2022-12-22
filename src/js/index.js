import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
    searchBox: document.querySelector('input'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
    const countryName = refs.searchBox.value.trim();
    const findUrl = `https://restcountries.com/v2/name/${countryName}`;
    if (countryName == "" || countryName == " " ) {
        clearFields();
    } else {
        fetch(findUrl)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                Notiflix.Notify.failure('Oops, there is no country with that name');
                throw new Error(response.status);
            })
            .then((data) => {
            
                if (data.length > 10) {
                    clearFields();
                    Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.');
                    throw new Error(data.status);
                }
                else if (data.length > 2 && data.length < 10) {
                    clearFields();
                    showDataList(data);
                }
                else {
                    Notiflix.Notify.info(data[0].name);
                    clearFields();
                    showDataInfo(data);
                }
            })

            .catch(error => console.log('Catch >>>> error', error));
    }
}

function createMarkup(obj) {
    return `<div class='flag-country'>
            <img class='flag-img'
            src='${obj.flags.svg}'> 
            <h2>${obj.name}</h2>
            </div>`;
}

function showDataList(arrData) {
    refs.countryList.innerHTML = '';
    refs.countryList.insertAdjacentHTML('beforeend',
        arrData
        .map(data => createMarkup(data))
        .join(''));
}

function showDataInfo(data) {
    return refs.countryInfo.innerHTML = `
            <div class='flag-country'>
            <img class='flag-img'  src='${data[0].flags.svg}'> 
            <h2>${data[0].name}</h2>
            </div>
            <div class='details-div'>
            <ul class='list'>
            <li class='item'>Capital: <span class="text-span">${data[0].capital}</span></li>
            <li class='item'>Population: <span class="text-span"> ${data[0].population} people</span></li>
            <li class='item'>Languages: <span class="text-span">${((data[0].languages).map(a => a.name))
            .toString().split(',').join(', ')}</span></li>
            </ul>
            </div>
            `;
}

function clearFields() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}
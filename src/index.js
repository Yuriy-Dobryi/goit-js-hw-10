
import './css/styles.css';
// import 'node-normalize/modern-normalize.css';
import { fetchCountries } from './fetchCountries.js';
import { buildCountryMarkup, buildCountriesMarkup } from './markup';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchRef = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');

searchRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchQuery = e.target.value.trim();

  if (!searchQuery) {
    countryList.innerHTML = '';
    return;
  }
  
  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        countryList.innerHTML = '';
        return;
      }
      countryList.innerHTML =
        data.length === 1
          ? buildCountryMarkup(data[0])
          : buildCountriesMarkup(data);
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });;
}
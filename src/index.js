import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchRef = document.getElementById('search-box');

searchRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchQuery = e.target.value.trim();

  if (!searchQuery) {
    return;
  }
  
  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }
      console.log(data[0].languages);
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });;
}
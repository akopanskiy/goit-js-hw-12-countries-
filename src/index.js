import './styles.css';
import './styles.css';
import fetchCountries from './js/fetchCountries';
import countryTpl from './templates/country.hbs';
import countriesTpl from './templates/countries.hbs';
var { error } = require('@pnotify/core');
// var { defaults } = require('@pnotify/core');
var debounce = require('lodash.debounce');

const searchFormRef = document.querySelector('.js-search-form');
const countriesItemRef = document.querySelector('.countries');

searchFormRef.addEventListener('input', debounce(inputValue, 1000));

function inputValue(event) {
  event.preventDefault();

  const name = event.target.value;
  countriesItemRef.innerHTML = '';
  fetchCountries(name).then(res => {
    if (res.length === 1) {
      countryMarkup(res);
    } else if (res.length > 1 && res.length <= 10) {
      countriesMarkup(res);
    } else if (res.length > 10) {
      error({
        text: 'Too many matches found. Please enter a more specific query!',
        delay: 3000,
        type: 'error',
        styling: 'brighttheme',
      });
    } else if (res.status === 404) {
      error({
        text: 'No country has been found. Please enter a more specific query!',
        delay: 3000,
        styling: 'brighttheme',
      });
    }
  });
}
function countryMarkup(country) {
  const markup = countryTpl(country);
  countriesItemRef.insertAdjacentHTML('beforeend', markup);
}
function countriesMarkup(country) {
  const markup = countriesTpl(country);
  countriesItemRef.insertAdjacentHTML('beforeend', markup);
}

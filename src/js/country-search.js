import fetchCountries from './services/fetch-countries';
import countriesListTemplate from '../templates/countries-list-template.hbs';
import countryTemplate from '../templates/country-template.hbs';
import debounce from 'lodash.debounce';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyStyleMaterial';

const refs = {
  inputSearch: document.querySelector('.js-input-search'),
  countriesList: document.querySelector('.js-countries-list'),
  countryContent: document.querySelector('.js-country-content'),
};

refs.inputSearch.addEventListener('input', debounce(inputSearchHandler, 500));

function inputSearchHandler(e) {
  const input = e.target.value;
  fetchCountry(input);
}

function insertListCountries(countries) {
  const markup = countriesListTemplate(countries);
  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

function insertCountry(country) {
  const markup = countryTemplate(country);
  refs.countryContent.insertAdjacentHTML('afterbegin', markup);
}

function clearListCountries() {
  refs.countriesList.innerHTML = '';
  refs.countryContent.innerHTML = '';
}

function checkListCountriesNameLength(country) {
  if (country.length >= 2 && country.length <= 10) {
    insertListCountries(country);
  }

  if (country.length === 1) {
    insertCountry(country);
  }

  if (country.length > 10) {
    PNotify.error({
      text: 'Too many mathes found. Please enter a more specific query!',
      styling: 'material',
      icons: 'material',
      icon: true,
      width: '260px',
      minHeight: '120px',
      delay: 2000,
    });
  }

  PNotify.error({
    text: 'No results for your request. Please еnter the correct data!',
    styling: 'material',
    icons: 'material',
    icon: true,
    width: '260px',
    minHeight: '120px',
    delay: 2000,
  });
}

function fetchCountry(country) {
  clearListCountries();
  if (country) {
    fetchCountries(country)
      .then(countries => checkListCountriesNameLength(countries))
      .catch(error => console.warn(error));
  }
}

const basedUrl = 'https://restcountries.eu/rest/v2/name/';

export default function fetchCountries(searchQuery) {
  const requestParam = `${searchQuery}`;

  return fetch(basedUrl + requestParam)
    .then(response => response.json())
    .catch(error => console.warn(error));
}

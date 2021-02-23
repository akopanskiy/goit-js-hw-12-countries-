import { error } from '../notify/notification';
function fetchCountries(searchQuery) {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

  return fetch(url).then(res => res.json());
  //     .catch(error => {
  //       error({ text: 'You must enter query parameters!' });
  //       console.log(error);
  //     });
}
export default fetchCountries;

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader'); 
const catCard= document.querySelector('.cat-info');

fetchBreeds()
  .then(breeds =>
    createMarkUp(breeds))
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    )
  });

function createMarkUp(breeds) {
  console.log(breeds);
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
    })
    .join('');
  select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
};

select.addEventListener('change', showCard);
loader.classList.add('is-hidden');
function showCard(evt) {
  loader.classList.remove('is-hidden');
  catCard.innerHTML = '';
  loader.classList.remove('is-hidden');
  const breedId = evt.target.value;
  fetchCatByBreed(breedId)
    .then(breed => createCatsCard(breed))
    .catch(err => {
      console.log(err);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
  .finally(() => loader.classList.add('is-hidden'));
}
function createCatsCard(breed) {
  const markUpCard = `<div class="card">
    <img class="cat-picture" src="${breed.url}" alt="${breed.id}"/>
    <div class="description"
    <h2>${breed.breeds[0].name}</h2>
    <p>${breed.breeds[0].description}</p>
    <p>Temperament: ${breed.breeds[0].temperament}</p>
    </div>
    </div>`;
  catCard.insertAdjacentHTML('beforeend', markUpCard);
  
};





//     .catch(error => {
//       Notiflix.Notify.failure(
//         'Oops! Something went wrong! Try reloading the page!'
//       );
//     })
//     .finally(() => loaderEl.classList.add('unvisible'));
// }



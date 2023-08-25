const urlbreeds = 'https://api.thecatapi.com/v1/breeds';
const urlId = 'https://api.thecatapi.com/v1/images';


const KEY =
  'live_y99Hb9GJjw2Seb87KLpg9U285hlJkQ29aJRDxE4KWrYGxwYlwTnBPzDKS5ZtnJyB';


function fetchBreeds() {
    return fetch(`${urlbreeds}?api_key=${KEY}`)
        .then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
};


function fetchCatByBreed(breedId)  {
    return fetch(`${urlId}/${breedId}?api_key=${KEY}`)
        .then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
};



export { fetchBreeds, fetchCatByBreed };
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById("loader");

let photoArr = []

const count = 10;
const apiKey = 'kLEhZ2be4Ci7GimZ5DD-kpPrZ3mU_oRlcxJOBWFYYaE';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Create Elements for links and photos add to DOM
function displayPhotos() {
  photoArr.forEach((photo) => {
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const res = await fetch(apiURL);
    photoArr = await res.json()
    displayPhotos()
  } catch (error) {
    console.log(error);
  }
}

getPhotos()
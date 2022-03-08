const imageContainer = document.getElementById('image-container');
const loader = document.getElementById("loader");

let photoArr = []

const count = 10;
const apiKey = 'kLEhZ2be4Ci7GimZ5DD-kpPrZ3mU_oRlcxJOBWFYYaE';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create Elements for links and photos add to DOM
function displayPhotos() {
  photoArr.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank"
    })

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

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

// if scrolling near bottom load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    getPhotos()
    console.log('load MORE!');
  }
})

getPhotos()
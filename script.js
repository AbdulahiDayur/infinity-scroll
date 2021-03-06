const imageContainer = document.getElementById('image-container');
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArr = [];

const count = 30;
const apiKey = 'kLEhZ2be4Ci7GimZ5DD-kpPrZ3mU_oRlcxJOBWFYYaE';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if img loaded
function imageLoad() {
  imagesLoaded++;

  if (imagesLoaded == totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create Elements for links and photos add to DOM
function displayPhotos() {
  imagesLoaded = 0
  totalImages = photoArr.length;
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

    // check when loading is done
    img.addEventListener("load", imageLoad);

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
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos()
  }
})

getPhotos()
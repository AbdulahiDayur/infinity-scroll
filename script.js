const count = 10;
const apiKey = 'kLEhZ2be4Ci7GimZ5DD-kpPrZ3mU_oRlcxJOBWFYYaE';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json()
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getPhotos()
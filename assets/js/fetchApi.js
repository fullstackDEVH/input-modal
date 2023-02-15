let url = "https://63ec999932a08117239df65b.mockapi.io/api/v1/imgs";

export let getAllImgs = () => {
  try {
    let arrData = [];

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data
      })
    
      
  } catch (error) {
    alert("error fetch api  ", error.message);
  }
};


// Define a function to fetch the images in batches
function fetchImagesInBatches(batchSize) {
  // Make a single API request to fetch all the image links
  fetch('https://example.com/images')
    .then(response => response.json())
    .then(data => {
      // Divide the image links into batches
      const batches = [];
      let batch = [];
      data.forEach(link => {
        batch.push(link);
        if (batch.length === batchSize) {
          batches.push(batch);
          batch = [];
        }
      });
      if (batch.length > 0) {
        batches.push(batch);
      }

      // Process each batch of image links
      batches.forEach(batch => {
        // Create an array to hold the promises for each image
        const promises = [];

        // Loop through the batch and create a promise for each image
        batch.forEach(link => {
          // Create an Image object and set the src attribute to the link
          const img = new Image();
          img.src = link;

          // Add the promise for the image to the promises array
          promises.push(
            new Promise(resolve => {
              img.onload = () => resolve();
            })
          );
        });

        // Wait for all the promises to resolve before moving on to the next batch
        Promise.all(promises).then(() => {
          console.log(`Batch of ${batch.length} images loaded`);
        });
      });
    });
}

// Call the fetchImagesInBatches function with a batch size of 10
fetchImagesInBatches(10);
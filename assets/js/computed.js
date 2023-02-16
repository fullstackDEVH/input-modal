const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


export const aspectRatioImg = (image, containerImg) => {
    // var container = document.getElementById("container");
    // var image = document.getElementById("image");

    // Get the aspect ratio of the image
    var aspectRatio = image.naturalWidth / image.naturalHeight;

    // Set the width and height of the image based on the container size and aspect ratio
    var containerWidth = containerImg.clientWidth;
    var containerHeight = containerImg.clientHeight;
    var containerAspectRatio = containerWidth / containerHeight;

    if (containerAspectRatio > aspectRatio) {
      image.style.width = containerHeight * aspectRatio + "px";
      image.style.height = containerHeight + "px";
    } else {
      image.style.width = containerWidth + "px";
      image.style.height = containerWidth / aspectRatio + "px";
    }
  };




export const aspectRatieqweoImg = (img, containerImg) => {
    var container = document.getElementById("container");
    var image = document.getElementById("image");

    // Get the aspect ratio of the image
    var aspectRatio = image.naturalWidth / image.naturalHeight;

    // Set the width and height of the image based on the container size and aspect ratio
    var containerWidth = container.clientWidth;
    var containerHeight = container.clientHeight;
    var containerAspectRatio = containerWidth / containerHeight;

    if (containerAspectRatio > aspectRatio) {
      image.style.width = containerHeight * aspectRatio + "px";
      image.style.height = containerHeight + "px";
    } else {
      image.style.width = containerWidth + "px";
      image.style.height = containerWidth / aspectRatio + "px";
    }
  };
const accessKey = '_1UggZecJbxuAyNUiYE3zoOW3o1DrBGnf6UVmNH5phI';
const apiUrl = 'https://api.unsplash.com/photos/';
let page = 1;
let currentImageIndex = 0;

// Function to fetch images from Unsplash API
async function getUnsplashImages() {
  try {
    const response = await fetch(`${apiUrl}?page=${page}&client_id=${accessKey}`);
    const images = await response.json();
    
    displayImages(images);
  } catch (error) {
    console.error('Error fetching images:', error.message);
  }
}


// Function to open the modal and display image details
function openModal(image, index) {
  currentImageIndex = index;
  const modal = $('#imageModal');
  const modalImage = $('#modalImage');
  const imageDetails = $('#imageDetails');

  const imageUrl = getImageUrl(image);

  modalImage.attr('src', imageUrl);
  imageDetails.html(`
    <p>${image && image.description || 'No description available'}</p>
    <p>Author: ${image && image.user && image.user.name || 'Unknown'}</p>
    <p>Location: ${image && image.location ? image.location.title : 'Not specified'}</p>
    <p>Likes: ${image && image.likes || 0}</p>
  `);

  const prevArrow = $('#prevArrow');
  const nextArrow = $('#nextArrow');

  if (currentImageIndex === 0) {
    prevArrow.hide();
  } else {
    prevArrow.show();
  }

  if (currentImageIndex === $('.masonry-container img').length - 1) {
    nextArrow.hide();
  } else {
    nextArrow.show();
  }

  modal.css('display', 'flex');
  console.log('Modal displayed');
}

// Function to get the image URL with proper checks
function getImageUrl(image) {
  console.log('image.urls');
  console.log(image.urls);
  if (image && image.urls && image.urls.full) {
    console.log('Modal displayed 1');
    return image.urls.full;
  } else if (image && image.urls && image.urls.full) {
    console.log('Modal displayed 2');
    return image.urls.full;
  } else {
    console.log('Modal displayed 3');
    return ''; 
  }
}


function closeModal() {
  const modal = $('#imageModal');
  modal.css('display', 'none');
}

function showPrevious() {
  const images = $('.masonry-container img');
  if (currentImageIndex > 0) {
    currentImageIndex--;
    openModal(images.eq(currentImageIndex).data('unsplashData'), currentImageIndex);
  }
}

// Function to show the next image in the modal
function showNext() {
  const images = $('.masonry-container img');
  if (currentImageIndex < images.length - 1) {
    currentImageIndex++;
    openModal(images.eq(currentImageIndex).data('unsplashData'), currentImageIndex);
  }
}

// Modify the displayImages function to store Unsplash data with each image
function displayImages(images) {
  const galleryContainer = $('#gallery');

  images.forEach((image, index) => {
    const imgElement = $('<img>')
      .attr('src', getImageUrl(image))
      .attr('alt', image.description || 'No description available')
      .data('unsplashData', image) // Store Unsplash data with the image
      .click(() => openModal(image, index));

    galleryContainer.append(imgElement);
  });
}

// Fetch images when the page loads
$(document).ready(() => {
  getUnsplashImages();
  $('#prevArrow, #nextArrow').hide();
});

// Event listener for scrolling to the bottom of the page to load more images
$(window).scroll(() => {
  if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
    page++;
    getUnsplashImages();
  }
});

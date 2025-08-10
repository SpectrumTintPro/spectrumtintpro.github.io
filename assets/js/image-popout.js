// Image Popout Gallery
$(document).ready(function() {
  // Create popout elements and add to body
  const popoutHTML = `
    <div class="image-popout">
      <div class="popout-close">&times;</div>
      <div class="popout-nav popout-prev">&lsaquo;</div>
      <div class="popout-nav popout-next">&rsaquo;</div>
      <div class="popout-content"></div>
    </div>
  `;
  $('body').append(popoutHTML);
  
  // Cache DOM elements
  const $popout = $('.image-popout');
  const $popoutContent = $('.popout-content');
  const $close = $('.popout-close');
  const $prev = $('.popout-prev');
  const $next = $('.popout-next');
  
  // Variables to track state
  let currentIndex = 0;
  let galleryImages = [];
  
  // Preload high-resolution images
  function preloadGalleryImages() {
    galleryImages = [];
    $('#screenshots .item img').each(function(index) {
      const src = $(this).attr('src');
      // Get the high-resolution version (remove any thumbnails or size indicators)
      const highResSrc = src;
      
      galleryImages.push({
        src: highResSrc,
        alt: $(this).attr('alt') || `Gallery Image ${index + 1}`
      });
      
      // Create image element for popout
      $popoutContent.append(`<img class="popout-image" src="${highResSrc}" alt="${galleryImages[index].alt}" data-index="${index}">`);
    });
  }
  
  // Show image popout
  function showPopout(index) {
    currentIndex = index;
    
    // Hide all images first
    $('.popout-image').removeClass('active');
    
    // Show current image
    $(`.popout-image[data-index="${currentIndex}"]`).addClass('active');
    
    // Show popout
    $popout.addClass('active');
    
    // Disable scrolling on body
    $('body').css('overflow', 'hidden');
  }
  
  // Close popout
  function closePopout() {
    $popout.removeClass('active');
    // Re-enable scrolling
    $('body').css('overflow', '');
  }
  
  // Navigate to previous image
  function prevImage() {
    $('.popout-image').removeClass('active swipe-left swipe-right');
    
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    
    const $currentImage = $(`.popout-image[data-index="${currentIndex}"]`);
    $currentImage.addClass('active swipe-right');
  }
  
  // Navigate to next image
  function nextImage() {
    $('.popout-image').removeClass('active swipe-left swipe-right');
    
    currentIndex = (currentIndex + 1) % galleryImages.length;
    
    const $currentImage = $(`.popout-image[data-index="${currentIndex}"]`);
    $currentImage.addClass('active swipe-left');
  }
  
  // Initialize the gallery
  function initGallery() {
    preloadGalleryImages();
    
    // Click event for gallery images
    $('#screenshots .item img').on('click', function() {
      const index = $(this).closest('.item').index();
      showPopout(index);
    });
    
    // Click event for close button
    $close.on('click', closePopout);
    
    // Click events for navigation
    $prev.on('click', prevImage);
    $next.on('click', nextImage);
    
    // Close when clicking outside the image
    $popout.on('click', function(e) {
      if ($(e.target).hasClass('image-popout')) {
        closePopout();
      }
    });
    
    // Keyboard navigation
    $(document).on('keydown', function(e) {
      if (!$popout.hasClass('active')) return;
      
      switch(e.which) {
        case 27: // ESC key
          closePopout();
          break;
          
        case 37: // Left arrow
          prevImage();
          break;
          
        case 39: // Right arrow
          nextImage();
          break;
      }
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    $popout.on('touchstart', function(e) {
      touchStartX = e.originalEvent.touches[0].clientX;
    });
    
    $popout.on('touchend', function(e) {
      touchEndX = e.originalEvent.changedTouches[0].clientX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50; // minimum distance for swipe
      const swipeDistance = touchEndX - touchStartX;
      
      if (swipeDistance > swipeThreshold) {
        // Swiped right, go to previous image
        prevImage();
      } else if (swipeDistance < -swipeThreshold) {
        // Swiped left, go to next image
        nextImage();
      }
    }
  }
  
  // Initialize when document is ready
  initGallery();
});

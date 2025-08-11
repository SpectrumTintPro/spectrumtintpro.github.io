// Preloader //

jQuery(document).ready(function($) {  

$(window).load(function(){
  $('#preloader').fadeOut('slow',function(){$(this).remove();});
});

});


// Closes the sidebar menu
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Scrolls to the selected menu item on the page
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

// wow

new WOW().init();

// carousel

$(document).ready(function() {
 
  var owl = $("#screenshots");
 
  owl.owlCarousel({
    autoPlay: false,
    pagination: false,
    stopOnHover: true,
  });
 
  // Custom Navigation Events
  $(".next").click(function(){
    owl.trigger('owl.next');
  })
  $(".prev").click(function(){
    owl.trigger('owl.prev');
  })
 
});

// Testimonial

$(document).ready(function() {
 
  $("#review").owlCarousel({
 
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
      
 
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
 
  });
 
});

// Set Header Background

$(window).scroll(function(){
  var sticky = $('.sticky'),
      scroll = $(window).scrollTop();

  if (scroll >= 100) sticky.addClass('fixed');
  else sticky.removeClass('fixed');
});

// Team overlay

// $(document).ready(function(){
//   $(".img-overlay").hover(function(){
//     $(".overlay").toggleClass("overlay_hover");
//   });

// });

// Form validation
$(document).ready(function() {
  // Define a variable to store the CSV data
  var formDataCSV = '';
  
  // Restrict phone input to only allow numbers and basic formatting characters with 10-digit limit
  $('#phone').on('input', function() {
    var input = $(this).val();
    // Filter out non-numeric characters except basic formatting
    var filteredInput = input.replace(/[^0-9\-\+\(\)\s]/g, '');
    
    // Count only numeric digits
    var digitCount = filteredInput.replace(/[^0-9]/g, '').length;
    
    // Check for exceeding 10 digits
    if (digitCount > 10) {
      // Keep only first 10 digits and any formatting between them
      var digits = filteredInput.replace(/[^0-9]/g, '');
      digits = digits.substring(0, 10);
      
      // Recreate formatted string with only 10 digits
      var formattedResult = '';
      var digitIndex = 0;
      
      for (var i = 0; i < filteredInput.length && digitIndex < 10; i++) {
        if (/[0-9]/.test(filteredInput[i])) {
          formattedResult += digits[digitIndex];
          digitIndex++;
        } else {
          formattedResult += filteredInput[i];
        }
      }
      
      filteredInput = formattedResult;
      
      // Show temporary validation message for digit limit
      var errorBlock = $(this).siblings('.help-block');
      errorBlock.addClass('text-danger').text('Phone numbers cannot exceed 10 digits.');
      setTimeout(function() {
        errorBlock.text('').removeClass('text-danger');
      }, 3000); // Clear message after 3 seconds
    }
    
    // Check for non-numeric characters
    if (input !== filteredInput) {
      // If filtered, replace with cleaned version
      $(this).val(filteredInput);
      // Show temporary validation message
      var errorBlock = $(this).siblings('.help-block');
      errorBlock.addClass('text-danger').text('Phone numbers can only contain digits, spaces, and basic formatting characters.');
      setTimeout(function() {
        errorBlock.text('').removeClass('text-danger');
      }, 3000); // Clear message after 3 seconds
    }
  });
  
  // Custom form validation
  $('#contactForm').on('submit', function(event) {
    event.preventDefault(); // Always prevent default form submission
    var formIsValid = true;
    
    // Phone validation - enforce numbers only as a double-check
    var phoneField = $('#phone');
    var phoneValue = phoneField.val().trim();
    var phoneErrorBlock = phoneField.siblings('.help-block');
    
    // First check if it's empty and required
    if (phoneField.prop('required') && !phoneValue) {
      formIsValid = false;
      phoneErrorBlock.addClass('text-danger').text('Please enter your phone number.');
      phoneField.addClass('is-invalid');
    }
    // Check if it exceeds 10 digits
    else if (phoneValue && phoneValue.replace(/[^0-9]/g, '').length > 10) {
      formIsValid = false;
      phoneErrorBlock.addClass('text-danger').text('Phone numbers cannot exceed 10 digits.');
      phoneField.addClass('is-invalid');
    }
    // Then check if it contains only valid characters
    else if (phoneValue && !/^[0-9\-\+\(\)\s]*$/.test(phoneValue)) {
      formIsValid = false;
      phoneErrorBlock.addClass('text-danger').text('Please enter a valid phone number (numbers only).');
      phoneField.addClass('is-invalid');
    } else {
      phoneField.removeClass('is-invalid');
      phoneErrorBlock.removeClass('text-danger').text('');
    }
    
    // Check each required field
    $(this).find('[required]').each(function() {
      var field = $(this);
      var errorBlock = field.siblings('.help-block');
      
      // Clear previous error
      errorBlock.text('');
      
      // Check if empty
      if (!field.val().trim()) {
        formIsValid = false;
        var errorMessage = field.attr('data-validation-required-message');
        errorBlock.addClass('text-danger').text(errorMessage);
        field.addClass('is-invalid');
      } else {
        // Specific validation for email field
        if (field.attr('type') === 'email') {
          var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (!emailRegex.test(field.val())) {
            formIsValid = false;
            errorBlock.addClass('text-danger').text('Please enter a valid email address.');
            field.addClass('is-invalid');
          } else {
            field.removeClass('is-invalid');
            errorBlock.removeClass('text-danger').text('');
          }
        } else {
          field.removeClass('is-invalid');
          errorBlock.removeClass('text-danger').text('');
        }
      }
    });
    
    // If the form is valid, create CSV and show success message
    if (formIsValid) {
      // Collect field values
      var name = $('#name').val();
      var email = $('#email').val();
      var phone = $('#phone').val();
      var referral = $('#referral').val() || 'N/A'; // Use N/A if empty
      var meetingDate = $('#meeting-date').val();
      var meetingTime = $('#meeting-time').val();
      var message = $('#message').val().replace(/\r?\n/g, ' ').replace(/,/g, ';'); // Replace newlines and commas
      
      // Create CSV string
      // Format: name,email,phone,referral,date,time,message
      formDataCSV = [
        name,
        email,
        phone,
        referral,
        meetingDate,
        meetingTime,
        message
      ].join(',');
      
      // Display success message and log the CSV data
      $('#success').html('<div class="alert alert-success">Your message has been saved!</div>');
      console.log('Form Data (CSV format):', formDataCSV);
      
      // Make the CSV data available globally if needed
      window.formDataCSV = formDataCSV;
    } else {
      // Reset CSV data if validation fails
      formDataCSV = '';
      $('#success').html('');
      
      // Scroll to the first error
      var firstError = $('.help-block:visible').first();
      if (firstError.length) {
        $('html, body').animate({
          scrollTop: firstError.offset().top - 100
        }, 500);
      }
    }



    function submitter(_paramsObj) {
      const formData = new FormData();
      formData.append("Message", _paramsObj.Data);
      fetch(_paramsObj.ScriptURL, { method: "POST", body: formData })
        .then((response) => {
          if (response.ok) {
            console.log("Success! Data sent.");
          } else {
            console.log("Error! Unable to send data.");
          }
        })
        .catch((error) => {
          console.log("Catch Error!", error.message);
        });
    }



setTimeout(function(){    submitter({
  Data: formDataCSV,
  ScriptURL:
    "https://script.google.com/macros/s/AKfycbz0rsn55O8RyzKBGOO-uc0kPA7m46TnWsXtfHMLaAhwWdMmIDaGcFG7V8A1DwaLQZRutA/exec",
});},3000);
    









  });
  
  // Clear error messages when field is being edited
  $('#contactForm input, #contactForm textarea').on('input', function() {
    $(this).siblings('.help-block').text('');
    $(this).removeClass('is-invalid');
  });
  
  // Add some CSS for validation feedback
  $('<style>\n.is-invalid { border-color: #dc3545; background-color: #fff8f8; }\n.alert-success { color: #155724; background-color: #d4edda; border-color: #c3e6cb; padding: 15px; margin-bottom: 20px; border: 1px solid transparent; border-radius: 4px; }\n.text-danger { color: #dc3545 !important; font-weight: bold; }\n</style>').appendTo('head');
});

/* global $, Stripe */

$(document).on('turbolinks:load', function(){
  
  // var declaration
  var theForm = $('#pro_form'),
      submitBtn = $('form-signup-btn');
  
  // Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // When user clicks submit, 
  submitBtn.click(function(event){
    // prevent default submission path
    event.preventDefault();
    submitBtn.val("Processing...").prop('disabled', true);
    
  
  // Collect credit card fields
  var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
      
      
      
  // BEGIN ERROR HANDLING
  var error = false;
  
  // Validate card number
  if (!Stripe.card.validateCardNumber(ccNum)) {
    error = true;
    alert("The credit card number appears to be invalid.");
  }
  
  // Validate CVC
  if (!Stripe.card.validateCardNumber(cvcNum)) {
    error = true;
    alert("The CVC number on the back of your card appears to be invalid.");
  }
  
  // Validate expiration date
  if (!Stripe.card.validateExpiry(expMonth, expYear)) {
    error = true;
    alert("The expiration date appears to be invalid.");
  }
  // END ERROR HANDLING
  
  
  
  if (error) {
    // If there are card errors, do not send to Stripe
    submitBtn.prop('disabled', false).val("Sign Up");
  } else {
    // Send card info to stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  }
  
  return false;
  });
  

    
  // Stripe will return a card token
  function stripeResponseHandler(status, response) {
    
    // Get the token from the response
    var token = response.id;
    
    // Inject card token as hidden field into form
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    // Submit form to our Rails app
    theForm.get(0).submit();
  }
  
});



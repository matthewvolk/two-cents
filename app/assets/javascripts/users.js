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
  });
  
  // Collect credit card fields
  var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
  
  // Send card info to stripe
  Stripe.createToken({
    number: ccNum,
    cvc: cvcNum,
    exp_month: expMonth,
    exp_year: expYear
  }, stripeResponseHandler);
  
  // Stripe will return a card token
  // Inject card token as hidden field into form
  // Submit form to our Rails app
});
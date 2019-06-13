$(document).ready(function(){
  $('#nav-bar .logo, .header').on("click", function(){
    $('html, body').animate({scrollTop:0}, 'slow');
  })

  $('.compose').on("click", function(){
    $('html, body').animate({
      scrollTop: $(".new-tweet").offset().top - 140},
      'slow');
    $(".new-tweet textarea").focus();
  })
})
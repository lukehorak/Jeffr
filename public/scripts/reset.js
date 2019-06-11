$(document).ready(function(){
  $('#nav-bar .logo, .header').on("click", function(){
    $('html, body').animate({scrollTop:0}, 'slow');
  })
})
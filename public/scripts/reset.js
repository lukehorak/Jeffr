$(document).ready(function(){
  $('#nav-bar .logo, .header').on("click", function(){
    $('html, body').animate({scrollTop:0}, 'slow');
  })

  $('.compose').on("click", function(){
    $('html, body').animate({scrollTop: 0},'slow');
    $('.new-tweet').slideToggle(300);
    $(".new-tweet textarea").focus();
  })
})
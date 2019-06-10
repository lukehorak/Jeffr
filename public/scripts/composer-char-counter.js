$(document).ready(function(){
  console.log("Gimme the Jeff!");
  $('.new-tweet textarea').on("input", function(){
    const inputLength = $(this).val().length;
    const charsLeft = 140 - inputLength;
    $(this).siblings('.counter')[0].innerHTML = charsLeft
    // Red for over, yellow for < 10
    const textColor = charsLeft < 0 ? "red" : charsLeft < 10 ? "goldenrod" : "";
    $(this).siblings('.counter').css("color", textColor);
  })
});
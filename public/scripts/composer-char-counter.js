$(document).ready(function(){
  $('.new-tweet textarea').on('input', function(){
    const inputLength = $(this).val().length;
    const charsLeft = 140 - inputLength;
    
    // Red for over, goldenrod for < 10
    const status = charsLeft < 0 ? 'over' : charsLeft < 10 ? 'warn' : 'under';
    $(this).siblings('.counter').text(charsLeft).attr('data-status', status);
  })
});
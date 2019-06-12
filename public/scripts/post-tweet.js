$(document).ready(function() {
  var $button = $('#jeff-it');
  $button.on('click', function (event) {
    event.preventDefault();
    const serialized = $button.parent().serialize();
    console.log('Button clicked, sending the Jeff...: ', serialized);
    $.ajax({
      type: 'POST',
      url: '/tweets/',
      data: serialized
    })
  });
})

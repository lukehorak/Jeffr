const sendTheJeff = () => {
  var $button = $('#jeff-it');
  $button.on('click', function (event) {
    event.preventDefault();
    const formData = $button.siblings("textarea").val();
    console.log('Button clicked, sending the Jeff...: ', formData);
    // $.ajax({
    //   type: 'POST',
    //   url: '/tweets/',
    //   data: formData
    // })
  });
}

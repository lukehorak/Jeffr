const invalidForm = (serialForm) => {
  if(serialForm.email && serialForm.password){
    return undefined;
  }
  let errorMessage = "Oops! Your submission was invalid due to the following:";
  if (!serialForm.email) {
    errorMessage += " No email was provided;";
  }
  if (!serialForm.password) {
    errorMessage += " No password was provided;"
  }
  return errorMessage.trim();
}

const buildForm = (response) => {
  // Template Literal
  let footerText;
  if (response.form === 'login') {
    footerText = 'Don\'t have an account? <a href="/register">Click here</a> to register instead.'
  } else {
    footerText = 'Already have an account? <a href="/login">Click here</a> to log in instead.'
  }
  const formText = `
    <form class="form auth-form" action="/${response.form}" method="POST">
      <div class="form-group mb-2">
        <h4>Username (Email):</h4>
        <input class="form-control" type="email" name="email" placeholder="you@youremail.com"
          style="width: 300px; margin-top: 0.5em; margin-bottom: 0.5em">
        <h4>Password:</h4>
        <input class="form-control" type="password" name="password" placeholder="Password"
          style="width: 300px; margin-top: 0.5em; margin-bottom: 0.5em">
        <button type="submit" class="${response.buttonClass}">${response.buttonText}</button>
      </div>
    </form>
    <p class="footer-text">${footerText}</p>
  `

  return $('<div>').addClass('form-div').html(formText);
};

$(document).ready(function () {
  $('.login-out').on("click", function () {
    console.log('SHOW ME THE LOGIN!');
    $.ajax({
        type: 'GET',
        url: '/login',
        dataType: 'json'
      })
      .done(function (response) {
        $('.modal').addClass('modal-show');
        $('.modal-content').append(buildForm(response));
      });

  });

  $('.modal-close').on("click", function () {
    console.log("BEGONE THOT");
    $('.modal').removeClass('modal-show');
  });

  $('.form-div button').on("click", function (event) {
    event.preventDefault();
    $form = $('.auth-form');
    const serialized = $form.serialize();
    if (invalidForm(serialized)){
      $('.form-div .error').remove();
      $('.new-tweet').append($error);
      $('.form-div').append($error);
    } else {
        // errorBuilder() is defined in post-tweet.js
        $error = errorBuilder(error);
        $('.error').remove();
        $.ajax({
        type: 'POST',
        url: '/login',
        data: serialized
      });
      // TODO - get response, use to manipulate front-end
    }
  })

})
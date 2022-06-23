(function() {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: './helpers/proxy.php',
      data: $(this).serialize(),
    })
    .then((response) => {
      const data = JSON.parse(response);
      console.log(data);
      const emailInputElem = document.getElementById('emailInputContainer');
      const emailErrorElem = emailInputElem.getElementsByClassName('errorMsg')[0];
      emailErrorElem.textContent = '';
      emailErrorElem.style.display = 'none';

      const passwordInputElem = document.getElementById('passwordInputContainer');
      const passwordErrorElem = passwordInputElem.getElementsByClassName('errorMsg')[0];
      passwordErrorElem.textContent = '';
      passwordErrorElem.style.display = 'none';

      if (data.jsonCode === 200) {
        /* success */
      } else if (data.jsonCode === 404) {
        emailErrorElem.textContent += 'This email doesn\'t match any account.';
        emailErrorElem.style.display = 'block';
      } else if (data.jsonCode === 401) {
        passwordErrorElem.textContent += 'Incorrect password. Please try again.';
        passwordErrorElem.style.display = 'block';
      }
    })
    .fail((err) => {
      console.log('API Error: ', err);
    });
  })
})();
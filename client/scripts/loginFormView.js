import transactionsView from './transactionsView.js';
import cookies from './cookies.js';

const loginFormView = {

  form: document.getElementById('loginForm'),

  initialize: () => {
    loginFormView.form.addEventListener('submit', loginFormView.handleSubmit);
  },

  handleSubmit: (e) => {
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: '../../server/proxy.php',
      data: $(loginFormView.form).serialize(),
    })
      .then((response) => {
        const data = JSON.parse(response);
        const emailInputElem = document.getElementById('emailInputContainer');
        const emailErrorElem = emailInputElem.getElementsByClassName('errorMsg')[0];
        emailErrorElem.textContent = '';
        emailErrorElem.style.display = 'none';

        const passwordInputElem = document.getElementById('passwordInputContainer');
        const passwordErrorElem = passwordInputElem.getElementsByClassName('errorMsg')[0];
        passwordErrorElem.textContent = '';
        passwordErrorElem.style.display = 'none';

        if (data.jsonCode === 200) {
          cookies.setCookie('authToken', data.authToken);
          transactionsView.render();
        } else if (data.jsonCode === 404) {
          emailErrorElem.textContent += 'This email doesn\'t match any account.';
          emailErrorElem.style.display = 'block';
        } else if (data.jsonCode === 401) {
          passwordErrorElem.textContent += 'Incorrect password. Please try again.';
          passwordErrorElem.style.display = 'block';
        } else if (data.jsonCode === 407) {
          cookies.setCookie('authToken', undefined);
        } else {
          console.log('ERROR CODE: ', data.jsonCode);
          console.log(data.message);
        }
      })
      .fail((err) => {
        console.log('API Error: ', err);
      });
  },

  hide: () => {
    document.getElementById('loginContent').style.display = 'none';
  },

};

export default loginFormView;

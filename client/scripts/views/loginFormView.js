import loginFormModel from '../models/loginFormModel.js';
import cookies from '../cookies.js';

const loginFormView = {

  page: document.getElementById('loginContent'),

  form: document.getElementById('loginForm'),

  emailErrorElem: document.getElementById('login-email-error'),

  passErrorElem: document.getElementById('login-password-error'),

  initialize: (callback) => {
    loginFormView.form.addEventListener('submit', (e) => loginFormView.handleSubmit(e, callback));
  },

  handleSubmit: (e, callback = () => {}) => {
    e.preventDefault();

    loginFormModel.fetchAuth(loginFormView.form)
      .then((response) => {
        loginFormView.emailErrorElem.textContent = '';
        loginFormView.emailErrorElem.style.display = 'none';

        loginFormView.passErrorElem.textContent = '';
        loginFormView.passErrorElem.style.display = 'none';

        if (response.jsonCode === 200) {
          cookies.setCookie('authToken', response.authToken);
          loginFormView.hide();
          callback();
        } else if (response.jsonCode === 404) {
          loginFormView.emailErrorElem.textContent += 'This email doesn\'t match any account.';
          loginFormView.emailErrorElem.style.display = 'block';
        } else if (response.jsonCode === 401) {
          loginFormView.passwordErrorElem.textContent += 'Incorrect password. Please try again.';
          loginFormView.passwordErrorElem.style.display = 'block';
        } else if (response.jsonCode === 407) {
          cookies.setCookie('authToken', undefined);
        } else {
          console.log('ERROR CODE: ', response.jsonCode);
          console.log(response.message);
        }
      })
      .catch((err) => {
        console.error('API ERROR: ', err);
      });
  },

  hide: () => {
    loginFormView.page.style.display = 'none';
  },

  show: () => {
    loginFormView.page.style.display = 'block';
  },

};

export default loginFormView;

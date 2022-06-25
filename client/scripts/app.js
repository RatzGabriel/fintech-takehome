import loginFormView from './loginFormView.js';
import transactionsView from './transactionsView.js';
import cookies from './cookies.js';

const app = {

  authToken: cookies.getSingleCookie('authToken'),

  initialize: () => {
    if (app.authToken === 'undefined') {
      loginFormView.initialize();
    } else {
      loginFormView.hide();
      transactionsView.render();
    }
  },

};

app.initialize();

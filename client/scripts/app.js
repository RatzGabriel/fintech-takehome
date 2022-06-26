import loginFormView from './views/loginFormView.js';
import loginFormController from './controllers/loginFormController.js';
import transactionsController from './controllers/transactionsController.js';
import cookies from './cookies.js';

const app = {

  initialize: () => {
    const authToken = cookies.getSingleCookie('authToken');

    if (authToken === 'undefined') {
      loginFormController.initialize(() => transactionsController.initialize());
    } else {
      loginFormView.hide();
      transactionsController.initialize(() => {
        loginFormController.initialize(() => transactionsController.initialize());
      });
    }
  },

};

app.initialize();

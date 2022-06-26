import loginFormView from '../views/loginFormView.js';
import transactionsView from '../views/transactionsView.js';
import transactionsModel from '../models/transactionsModel.js';
import cookies from '../cookies.js';

const transactionsController = {

  counter: 0,

  incrementCounter: () => {
    transactionsController.counter += 1;
  },

  initialize: () => {
    transactionsView.render();
    transactionsView.startSpinner();
    setTimeout(() => transactionsController.loadTransactions(), 50);
  },

  loadTransactions: () => {
    transactionsModel.fetchTransactions()
      .then((response) => {
        transactionsView.stopSpinner();
        if (response.jsonCode === 200) {
          const list = response.transactionList;
          transactionsController.loadInitialTransactions(list);
          window.addEventListener('scroll', () => transactionsController.loadRemainingTransactions(list));
        } else if (response.jsonCode === 404) {
          /* fail */
        } else if (response.jsonCode === 401) {
          /* fail 2 */
        } else if (response.jsonCode === 407) {
          cookies.setCookie('authToken', undefined);
          transactionsView.hide();
          loginFormView.show();
        }
      })
      .catch((err) => {
        console.error('API ERROR: ', err);
      });
  },

  loadInitialTransactions: (list) => {
    const interval = setInterval(() => {
      const htmlScrollHeight = document.documentElement.scrollHeight;
      const userScrollDistance = window.scrollY + window.innerHeight;

      if (userScrollDistance < htmlScrollHeight || transactionsController.counter === list.length) {
        clearInterval(interval);
      }

      transactionsController.addTransaction(list[transactionsController.counter]);
    }, 50);
  },

  loadRemainingTransactions: (list) => {
    const htmlScrollHeight = document.documentElement.scrollHeight;
    const userScrollDistance = window.scrollY + window.innerHeight;

    if (userScrollDistance >= htmlScrollHeight) {
      transactionsController.addMultipleTransactions(list, 10);
    }
  },

  addTransaction: (transaction) => {
    transactionsModel.addTransaction(transaction);
    const newTransaction = transactionsModel.getTransaction(transactionsController.counter);
    transactionsView.renderSingleTransaction(
      newTransaction.date,
      newTransaction.merchant,
      newTransaction.amount,
    );
    transactionsController.incrementCounter();
  },

  addMultipleTransactions: (list, numOfTransactions = 0) => {
    for (let i = 0; i < numOfTransactions; i++) {
      transactionsController.addTransaction(list[transactionsController.counter]);
    }
  },

};

export default transactionsController;

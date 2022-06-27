import transactionsView from '../views/transactionsView.js';
import transactionsModel from '../models/transactionsModel.js';
import cookies from '../cookies.js';

const transactionsController = {

  counter: 0,

  incrementCounter: () => {
    transactionsController.counter += 1;
  },

  initialize: (callback) => {
    transactionsView.initialize();
    transactionsView.startSpinner();

    transactionsView.form.addEventListener('submit', (e) => {
      transactionsView.handleSubmit(e, () => {
        transactionsController.postTransaction();
      });
    });

    setTimeout(() => transactionsController.loadTransactions(callback), 50);
  },

  loadTransactions: (callback) => {
    transactionsModel.fetchTransactions(cookies.getSingleCookie('authToken'))
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
          callback();
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
      if (transactionsController.counter !== list.length) {
        transactionsController.addTransaction(list[transactionsController.counter]);
      }
    }
  },

  postTransaction: () => {
    transactionsModel.postTransaction(transactionsView.form, cookies.getSingleCookie('authToken'))
      .then((response) => {
        const transaction = response.transactionList[0];
        if (response.jsonCode === 200) {
          transactionsController.addTransaction(transaction);
          window.alert('Transaction added!');
        }
      })
      .catch((err) => console.error(err));
  },

};

export default transactionsController;

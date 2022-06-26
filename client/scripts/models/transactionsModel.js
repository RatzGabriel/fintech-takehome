import cookies from '../cookies.js';

const transactionsModel = {

  data: [],

  fetch: () => new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: '../../server/transactions.php',
      data: {
        authToken: cookies.getSingleCookie('authToken'),
      },
    })
      .then((response) => resolve(JSON.parse(response)))
      .fail((err) => reject(err));
  }),

  addTransaction: (transaction) => {
    const formattedTransaction = transactionsModel.formatTransaction(transaction);
    transactionsModel.data.push(formattedTransaction);
  },

  formatTransaction: (transaction) => {
    const date = new Date(transaction.created.replaceAll('-', '/'));
    const { currency } = transaction;
    const { amount } = transaction;

    const formattedTransaction = {
      merchant: transaction.merchant,
      amount: new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount),
      date: {
        month: date.toLocaleString('default', { month: 'short' }),
        day: date.getDate(),
        year: date.getFullYear(),
      },
    };

    return formattedTransaction;
  },

  getTransaction: (index) => transactionsModel.data[index],

};

export default transactionsModel;

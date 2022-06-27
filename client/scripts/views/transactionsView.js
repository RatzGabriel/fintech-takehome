import createElem from '../createElem.js';

const calendarIconSrc = './client/images/calendar-icon.svg';

const transactionsView = {

  form: document.getElementById('transaction-form'),

  spinner: document.getElementById('transaction-spinner'),

  page: document.getElementById('transaction-page'),

  table: document.getElementById('transaction-table-body'),

  sidebar: document.getElementById('transaction-side-bar'),

  addTransactionBtn: document.getElementsByClassName('add-transaction-btn-container')[0].firstChild.nextSibling,

  backBtn: document.getElementById('transaction-form').firstChild.nextSibling,

  initialize: () => {
    transactionsView.render();

    transactionsView.addTransactionBtn.addEventListener('click', () => {
      transactionsView.showForm();
    });

    transactionsView.backBtn.addEventListener('click', () => {
      transactionsView.hideForm();
    })
  },

  render: () => {
    transactionsView.page.style.display = 'flex';
  },

  renderSingleTransaction: (date, merchant, amount) => {
    let merchantName = merchant;
    if (merchantName.length > 15) merchantName = `${merchantName.slice(0, 14)}...`;

    const card = createElem('div', { className: 'transaction-card' });

    const dateContainer = createElem('div', { className: 'date-container' });
    const calendarIcon = createElem('img', { src: calendarIconSrc, alt: 'Calendar icon' });
    const dateTextContainer = createElem('div', { className: 'date-text-container' });
    dateTextContainer.append(
      createElem('p', { className: 'date' }, `${date.month} ${date.day}`),
      createElem('p', { className: 'year' }, date.year),
    );
    dateContainer.append(calendarIcon, dateTextContainer);

    const merchantElem = createElem('p', { className: 'transaction-merchant' }, merchantName);

    const amountContainer = createElem('div', { className: 'transaction-amount' });
    amountContainer.append(
      createElem('p', {}, 'Amount'),
      createElem('p', { className: 'amount' }, amount),
    );

    card.append(dateContainer, merchantElem, amountContainer);

    transactionsView.table.append(card);
  },

  hide: () => {
    transactionsView.page.style.display = 'none';
  },

  startSpinner: () => {
    transactionsView.spinner.style.display = 'block';
  },

  stopSpinner: () => {
    transactionsView.spinner.style.display = 'none';
  },

  handleSubmit: (e, callback) => {
    e.preventDefault();
    callback();
  },

  showForm: () => {
    transactionsView.sidebar.style.right = 0;
  },

  hideForm: () => {
    transactionsView.sidebar.style.right = '100%';
  },

};

export default transactionsView;

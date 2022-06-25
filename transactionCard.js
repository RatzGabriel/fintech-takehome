// assets
const calendarIconSrc = './assets/images/calendar-icon.svg';

function createElem(tag, props = {}, innerText = '') {
  const elem = Object.assign(document.createElement(tag), props);
  if (innerText) elem.innerText = innerText;
  return elem;
}

function createTransactionCard() {
  const card = createElem('div', { className: 'transaction-card' });

  const dateContainer = createElem('div', { className: 'date-container' });
  const calendarIcon = createElem('img', { src: calendarIconSrc, alt: 'Calendar icon' });
  const dateTextContainer = createElem('div', { className: 'date-text-container' });
  dateTextContainer.append(
    createElem('p', { className: 'date' }, 'Jun 11'),
    createElem('p', { className: 'year' }, '2021'),
  );
  dateContainer.append(calendarIcon, dateTextContainer);

  const merchant = createElem('p', { className: 'transaction-merchant' }, 'Top transaction');

  const amountContainer = createElem('div', { className: 'transaction-amount' });
  amountContainer.append(
    createElem('p', {}, 'Amount'),
    createElem('p', { className: 'amount' }, '$45,600.00'),
  );

  card.append(dateContainer, merchant, amountContainer);
  return card;
}

export default createTransactionCard;

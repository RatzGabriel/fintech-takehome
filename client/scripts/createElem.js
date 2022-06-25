function createElem(tag, props = {}, innerText = '') {
  const elem = Object.assign(document.createElement(tag), props);
  if (innerText) elem.innerText = innerText;
  return elem;
}

export default createElem;

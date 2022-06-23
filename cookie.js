function getAllCookies() {
  let cookiesObj = document.cookie.split(';')
  .map((cookie) => (cookie.split('=')))
  .reduce((accumulator, [key, value]) => ({
    ...accumulator, [key.trim()]: decodeURIComponent(value),
  }), {});

  return cookiesObj;
}

function getCookie(cname) {
  const cookiesObj = getAllCookies();
  return cookiesObj[cname];
}

function setCookie(key, value) {
  document.cookie = `${key}=${value}`;
}

export { getAllCookies, getCookie, setCookie };

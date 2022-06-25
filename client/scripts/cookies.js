const cookies = {

  getAllCookies: () => {
    const cookiesObj = document.cookie.split(';')
      .map((cookie) => (cookie.split('=')))
      .reduce((accumulator, [key, value]) => ({
        ...accumulator, [key.trim()]: decodeURIComponent(value),
      }), {});

    return cookiesObj;
  },

  getSingleCookie(cname) {
    const cookiesObj = cookies.getAllCookies();
    return cookiesObj[cname];
  },

  setCookie: (key, value) => {
    let newValue = value;
    if (typeof value !== 'string') newValue = JSON.stringify(value);
    document.cookie = `${key}=${newValue}`;
  },

};

export default cookies;

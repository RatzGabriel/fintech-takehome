const loginFormModel = {

  fetchAuth: (formData) => new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: '../../proxies/postAuth.php',
      data: $(formData).serialize(),
    })
      .then((response) => resolve(JSON.parse(response)))
      .fail((err) => reject(err));
  }),

};

export default loginFormModel;

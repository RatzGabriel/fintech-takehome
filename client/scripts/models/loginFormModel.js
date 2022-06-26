const loginFormModel = {

  fetchAuth: (formData) => new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: '../../server/proxy.php',
      data: $(formData).serialize(),
    })
      .then((response) => resolve(JSON.parse(response)))
      .fail((err) => reject(err));
  }),

};

export default loginFormModel;

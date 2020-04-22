

function postRegister() {
  url = '/register';

  let data = {
    email: document.getElementById("mailAddress").value,
    username: document.getElementById("username").value,
    password1: document.getElementById("password1").value,
    password2: document.getElementById("password2").value
  };

  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers
  };

  fetch(url,fetchData)
    .then(function(resp){
      console.log(fetchData);
      console.log(resp);
    });
    //.catch(err => console.log(err));
};

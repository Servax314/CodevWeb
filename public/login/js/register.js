

function postRegister() {
  url = '/register';

  let data = {
    email: document.getElementById("mailAddress").value,
    username: document.getElementById("username").value,
    password1: document.getElementById("password1").value,
    password2: document.getElementById("lastpassword").value
  };

  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers
  };

  fetch(url,fetchData)
    .then(function(res){
      if(res.status == 200) {
        alert('User registered !')
        window.location.replace(res.url);
      }else{
        alert("Error" + res.status + " : "+ res.statusText);
        window.location.replace(res.url);
      }
    })
    .catch(err => console.log(err));
};

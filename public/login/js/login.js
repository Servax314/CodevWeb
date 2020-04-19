let data = {};
let headers = new Headers();
headers.append('Content-Type', 'application/json');
let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers
    };

function funcFetch() {
  if(i) {
    url = '/register';
    let data = {
      email: document.getElementById("mailAddress").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }
    fetch(url,fetchData)
      .then(function(resp){
        console.log(fetchData);
        console.log(resp);
        if(resp.status == 200) {
          console.log("well registered");
          switchHtml();
        }else{
          console.log("error on register");
        }
      })
  }else{
    url = '/login';
    let data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }
    fetch(url,fetchData)
      .then(function(resp){
        console.log(fetchData);
        console.log(resp);
        if(resp.status == 200) {
          console.log("welcome");
        }else{
          console.log("error on login");
        }
      })

  }
}

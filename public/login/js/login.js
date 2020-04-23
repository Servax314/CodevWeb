

function funcFetch() {
  url = '/login';
  let data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  }
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers
      };
  fetch(url,fetchData)
    .then(function(res){
      console.log(fetchData);
      console.log(res);
      if(res.status == 200) {
        window.location.replace(res.url);
      }else{
        window.location.replace(res.url);
        ///////////////////////////////////////////;//alert(res.error_msg);
      }
    })
}

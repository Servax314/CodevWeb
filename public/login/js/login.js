

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
      if(res.url === "http://localhost/9000") {
        alert('Logging in, welcome to the moula side.');
        window.location.replace(res.url);
      }else{
        alert('Failed to log in, wrong password/username.');
        window.location.replace(res.url);
      }
    })
}

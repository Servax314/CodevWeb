function funcFetch() {
  url = '/admin/ban';
  let data = {
    username: document.getElementById("email").value,
    password: document.getElementById("reason").value
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
      alert('User successfully banned');
      }
    })

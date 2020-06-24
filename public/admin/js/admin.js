function funcBan() {
  url = '/admin/ban';
  let data = {
    email: document.getElementById("mailBan").value,
    reason: document.getElementById("reasonBan").value
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
      window.location.replace(res.url);
    })
  }

  function funcUnban() {
    url = '/admin/unban';
    let data = {
      email: document.getElementById("mailUnan").value
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let fetchData = {
          method: 'DELETE',
          body: JSON.stringify(data),
          headers: headers
        };
    fetch(url,fetchData)
      .then(function(res){
        alert('Fix that message');
        window.location.replace(res.url);
      })
    }

  function funcCountUser() {
    url = '/admin/usercount';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let fetchData = {
          method: 'GET',
          body: JSON.stringify(data),
          headers: headers
        };
    fetch(url,fetchData)
      .then(function(res){
        document.getElementById("userCount").innerHTML = res.get(usercount);
      })
  }

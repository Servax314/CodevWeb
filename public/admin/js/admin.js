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
      alert("User indefinitely banned."); 
      window.location.replace(res.url);
    })
  }

  function funcUnban() {
    url = '/admin/unban';
    let data = {
      email: document.getElementById("mailUnban").value
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
        if(res.url ==200){
          alert("User removed from the ban list."); // to be corrected
          window.location.replace(res.url);
        }else{
          alert(res.status+" : No such user in the ban list.");
          window.location.replace(res.url);
        }

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

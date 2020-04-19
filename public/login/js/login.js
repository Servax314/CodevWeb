let i = 0
let registerHtml = '<div id="registerForm" class="form">'
           +'<form action="/login" method="POST">'
           +'<label>Mail address :</label>'
           +'<input class="field" id="mailAddress" name="mailAddress" type="text" autocapitalize="off" autocorrect="off"/></br>'
           +'<label>Login :</label>'
           +'<input class="field" id="Username" name="Username" type="text" autocapitalize="off" autocorrect="off"/></br>'
           +'<label> Password : </label>'
           +'<input class="field" id="Password" name="Password" type="Password" autocapitalize="off" autocorrect="off"/></br>'
           +'<label>Repeat Password : </label>'
           +'<input class="field" id="Password" name="Password" type="Password" autocapitalize="off" autocorrect="off"/></br>'
           +'<input id="registerButton" name="registerButton" type="submit" value="Register">'
           +'</form>'
           +'</div>'

  let loginHtml = ''

function updateHtml(){
  i +=1;
  if {
    var obj = document.getElementById("loginForm");
    obj.innerHTML = registerHtml;
  }else{
    var obj = document.getElementById("registerForm");
    obj.innerHTML = loginHtml;
  }
}

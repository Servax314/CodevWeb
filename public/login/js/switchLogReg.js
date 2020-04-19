let i = true;


let registerHtml = '<div id="registerForm" class="form">'
           +'<label>Mail address :</label>'
           +'<input class="field" id="mailAddress" name="mailAddress" type="text" autocapitalize="off" autocorrect="off"/></br>'
           +'<label>Login :</label>'
           +'<input class="field" id="username" name="username" type="text" autocapitalize="off" autocorrect="off"/></br>'
           +'<label> Password : </label>'
           +'<input class="field" id="password" name="password" type="password" autocapitalize="off" autocorrect="off"/></br>'
           +'<label>Repeat Password : </label>'
           +'<input class="field" id="password" name="password" type="password" autocapitalize="off" autocorrect="off"/></br>'
           +'<input id="registerButton" name="registerButton" type="submit" value="Register">'
           +'</div>';

  let loginHtml = '<div id="loginForm" class="form">'
             +     '<label  >Username :</label>'
              +    '<input class="field" id="username" name="username" type="text" autocapitalize="off" autocorrect="off"/></br></br>'
           +   '<label > Password : </label>'
             +   '<input class="field" id="password" name="password" type="password" autocapitalize="off" autocorrect="off"/></br>'
             +   '<input id="loginButton" name="loginButton" type="submit" value="Log In">'
          +'</div>';

function switchHtml(){
  if (i){
    i = false;
    var obj = document.getElementById("loginForm");
    obj.innerHTML = registerHtml;

  }else{
    var obj = document.getElementById("registerForm");
    obj.innerHTML = loginHtml;
    i=true;
  }
};

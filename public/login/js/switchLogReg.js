let i = true;


let registerHtml = '<div id="registerForm" class="form"><div class="form-style-8">'
           +'<input placeholder="Mail address" class="field" id="mailAddress" name="mailAddress" type="text" autocapitalize="off" autocorrect="off"/></br>'
           +'<input placeholder="Username" class="field" id="username" name="username" type="text" autocapitalize="off" autocorrect="off"/></br>'
           +'<input placeholder="Password " class="field" id="password" name="password" type="password" autocapitalize="off" autocorrect="off"/></br>'
           +'<input placeholder="Repeat Password" class="field" id="password" name="password" type="password" autocapitalize="off" autocorrect="off"/></br>'
           +'<input id="registerButton" name="registerButton" type="submit" value="Register">'
           +'</div></div>';

  let loginHtml = '<div id="loginForm" class="form"><div class="form-style-8">'
              +    '<input placeholder="Username " class="field" id="username" name="username" type="text" autocapitalize="off" autocorrect="off"/></br></br>'
             +   '<input placeholder="Password " class="field" id="password" name="password" type="password" autocapitalize="off" autocorrect="off"/></br>'
             +   '<input id="loginButton" name="loginButton" type="submit" value="Log In">'
          +'</div></div>';

function switchHtml(){
  if (i){
    i = false;
    var obj = document.getElementById("loginForm");
    obj.innerHTML = registerHtml;
    console.log('login to register');

  }else{
    var obj = document.getElementById("registerForm");
    obj.innerHTML = loginHtml;
    i=true;
    console.log('register to login');
  }
};

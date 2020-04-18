function register(){
    
    var obj = document.getElementById("loginForm");
    var x = '<div id="registerForm" class="registerForm">'
            +'<form action="/register" method="POST">'
            +'<label>Mail address :</label>'
             +'<input id="mailAddress" name="mailAddress" type="text" autocapitalize="off" autocorrect="off"/></br>'
               + '<label>Login :</label>'
                +'<input id="Username" name="Username" type="text" autocapitalize="off" autocorrect="off"/></br>'
               + '<label> Password : </label>'
               + '<input id="Password" name="Password" type="Password" autocapitalize="off" autocorrect="off"/></br>'
               + '<label> Password : </label>'
               + '<input id="Password" name="Password" type="Password" autocapitalize="off" autocorrect="off"/></br>'
                +'<input id="registerButton" name="registerButton" type="submit" value="Register">'
           + '</form>'
        +'</div>'
    obj.innerHTML = x;

}



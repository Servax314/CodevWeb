function register(){
    
    var obj1 = document.getElementById("loginForm");
    var x1 = '<div id="registerForm" class="form">'
               +'<form action="/login" method="POST">'
               +'<label>Mail address :</label>'
               +'<input class="field" id="mailAddress" name="mailAddress" type="text" autocapitalize="off" autocorrect="off"/></br>'
               + '<label>Login :</label>'
               +'<input class="field" id="Username" name="Username" type="text" autocapitalize="off" autocorrect="off"/></br>'
               + '<label> Password : </label>'
               + '<input class="field" id="Password" name="Password" type="Password" autocapitalize="off" autocorrect="off"/></br>'
               + '<label>Repeat Password : </label>'
               + '<input class="field" id="Password" name="Password" type="Password" autocapitalize="off" autocorrect="off"/></br>'
               +'<input id="registerButton" name="registerButton" type="submit" value="Register" onclick="login()">'
               + '</form>'
               +'</div>'
    obj1.innerHTML = x1;
}

function login(){
    
    var obj2 = document.getElementById("registerForm");
    var x2 = '<div id="loginForm" class="form">'
              +  '<form action="/login" method="POST">'
               +     '<label  >Username :</label>'
                +    '<input class="field" id="Username" name="Username" type="text" autocapitalize="off" autocorrect="off"/></br></br>'
    		     +   '<label > Password : </label>'
       	 	     +   '<input class="field" id="Password" name="Password" type="Password" autocapitalize="off" autocorrect="off"/></br>'
        	     +   '<input id="loginButton" name="loginButton" type="submit" value="Log In">'
               + '</form>'
            +'</div>'
    obj2.innerHTML = x2;
}


var PARAMS = {
  particles : {
    speed: {
    max : 0.5,
    min : -0.5
    },
    size : {
      max : 1.1,
      min : 0.1
    },
    style : {
      color : 'black',
      opacity : 1
    }
  },
  lines : {
    enable : true,
    color : 'black',
    opacity : .01,
    distance : 80
  },
  globale : {
    particlesAtStart : 150,
    limits : 50,
    particleMax : 150,
    mode : 'normal',
    retina : false
  },
  events : {
    onclick : {
      nb : 5
    },
    newcreated : {
      time : 500,
      nb : 4
    }
  },
  mobile : {
    speed : 2,
    size : 2,
    nb : 2,
    line_o : 2,
    line_d : 2
  }
}


const express = require('express');
const router = express.Router();

//register page
router.get('/register', (req,res) => res.sendFile('register.html', {root: './views'}))

//register handle
router.post('/register', (req,res,next) => {

  if( req.body.username && req.bodyemail && req.bodypassword1 && req.bodypassword2) {
    if( req.body.password1 === req.body.password2){
      return res.redirect('/login');
    }else{
      const err = new Error("Both password don't match");
      err.status = 401;
      err.statusText = "Both password don't match";
      next(err);
    }

  }else{
    const err = new Error("Fill all fields");
    err.status = 401;
    err.statusText = "Fill all fields";
    next(err);
  }

});

module.exports = router;

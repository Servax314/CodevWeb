//DEVMOD REMOVE THE !=true

module.exports = {
  checkAuthenticated: function(req,res,next) {
    if (req.isAuthenticated()) {
      return next()
    }
    //res.redirect('/login')
    return next()
  },

  checkNotAuthenticated: function(req,res,next) {
    if(req.isAuthenticated()) {
      //return res.redirect('/')
      return next()
    }
    next()
  },

  checkAdmin: function(req,res,next) {
    console.log(req)
    if(req.isAuthenticated() && req.admin) {
      return next();
    }
    //res.redirect('/');
    return next()
  }
};

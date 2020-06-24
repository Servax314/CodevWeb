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
    if(req.isAuthenticated() && req.user.admin) {
      return next();
    }
    //res.redirect('/');
    return next()
  }
};

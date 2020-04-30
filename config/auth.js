//DEVMOD REMOVE THE !=true

module.exports = {
  checkAuthenticated: function(req,res,next) {
    if (req.isAuthenticated()!= true) {
      return next()
    }
    res.redirect('/login')
  },

  checkNotAuthenticated: function(req,res,next) {
    if(req.isAuthenticated()!=true) {
      return res.redirect('/')
    }
    next()
  }


};

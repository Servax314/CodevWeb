const express = require('express');
const router = express.Router();
const {checkAdmin} = require('../config/auth.js');
const UserBan = require('../models/UserBan.js');
const User = require('../models/User.js');

router.get('/admin', checkAdmin, (req,res) => res.sendFile('admin.html', { root: './views'}));

router.get('/admin/usercount', checkAdmin, function (req,res){
  res.send({usercount: User.count()});
});

router.post('/admin/ban', checkAdmin, function (req,res){
  if(req.body.email && req.body.reason){
    var message = "";
    User.findOne({email: req.body.email})
      .then(user=>{
        if(user){   //boucle non instanciée?
          user.remove();
          message = "User removed from the database."
        };
        const newUserBan = new UserBan({
          email: req.body.email,
          reason:req.body.reason
        });
        newUserBan.save();
        res.statusMessage = message+" User is now ban indefinitely.";
        res.redirect('/admin');
        res.statusMessage = message+" User is now ban indefinitely.";
        console.log(res.statusText);
      });
  }
});

router.delete('/admin/unban', checkAdmin, function (req, res,next){
  if(req.body.email){
    var message = "";
    UserBan.findOne({email:req.body.email})
      .then(userBan =>{
        if(userBan){
          userBan.remove();
          message = "User removed from the ban list.";
        }else{
          const err = new Error("No such user found in the ban list");
          err.status = 400;
          message = "No such user found in the ban list";
          next(err);
        };
        res.statusText = message;
        res.redirect('/admin');
      });
  }
});

module.exports = router;

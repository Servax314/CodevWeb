const express = require('express');
const router = express.Router();
const {checkAdmin} = require('../config/auth.js');
const UserBan = require('../models/UserBan.js');
const User = require('../models/User.js');

router.get('/admin', checkAdmin, (req,res) => res.sendFile('admin.html', { root: './views'}));

router.post('/admin/ban', checkAdmin, function (req,res){
  if(req.body.email && req.body.reason){
    User.findOne({email: req.body.email})
      .then(user=>{
        if(user){
          user.remove();
        };
        const newUserBan = new UserBan({
          email: req.body.email,
          reason:req.body.reason
        });
        newUserBan.save();
      });
  }
});

router.delete('/admin/ban', checkAdmin, function (req, res){
  if(req.body.email){
    UserBan.findOne({email:req.body.email})
      .then(userBan =>{
        if(userBan){
          userBan.remove();
        }else{
          const err = new Error("No such user found in the ban list");
          err.status = 400;
          next(err);
        };
      });
  }
});

module.exports = router;

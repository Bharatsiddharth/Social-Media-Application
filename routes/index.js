var express = require('express');
var router = express.Router();

const User = require('../models/userSchema')
const passport = require('passport');
const Localstrategy = require('passport-local');
const user = require('../models/userSchema');

passport.use(new Localstrategy(User.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user:req.user });
});

router.get('/register', function(req, res, next) {
  res.render('register', { user:req.user });
});

router.post('/register-user',async function(req, res, next) {
  try {
    // const newUser = new User(req.body);
    // await newUser.save();

    const {name,username,email,password} = req.body;
    await User.register({username,email,name}, password)

    res.redirect('./login')
  } catch (error) {
    res.send(error)
  }
});

router.get('/about', function(req, res, next) {
  res.render('about', { user:req.user });
});

router.get('/login', function(req, res, next) {
  res.render('login', {user:req.user});
});

router.post(
  "/login-user",
  passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/login",
  }),
  function (req, res, next) {}
);


router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile', { user:req.user });
});








router.get('/update-user/:id', isLoggedIn, function(req, res, next) {
  res.render('updateUser', { user:req.user });
});

router.get('/reset-password/:id', isLoggedIn, function(req, res, next) {
  res.render('userresetpassword', { user:req.user });
});

router.post('/reset-password/:id', isLoggedIn,async function(req, res, next) {
  try {
    await req.user.changePassword(
      req.body.oldpassword,
      req.body.newpassword
    );
    req.user.save();
    res.redirect(`/update-user/${req.user._id}`)
  } catch (error) {
    res.send(error)
  }
});

router.get("/logout-user", function (req, res, next) {
  req.logout(() => {
      res.redirect("/login");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.redirect("/login");
  }
}

module.exports = router;

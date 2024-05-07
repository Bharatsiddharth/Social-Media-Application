var express = require('express');
var router = express.Router();

const User = require('../models/userSchema')
const passport = require('passport');
const Localstrategy = require('passport-local');

passport.use(new Localstrategy(User.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
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
  res.render('about', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
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
  res.render('profile');
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

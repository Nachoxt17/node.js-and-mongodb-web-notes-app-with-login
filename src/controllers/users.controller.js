const usersCtrl = {};

const passport = require("passport");

const User = require("../models/User.js");

usersCtrl.renderSignUpForm = (req, res) => {
  res.render("users/signup.hbs");
};

usersCtrl.signup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: "Passwords must match." });
  }
  if (password.length < 10) {
    errors.push({ text: "Passwords must be at least 10 Characters." });
  }
  if (errors.length > 0) {
    res.render("users/signup.hbs", { errors, name, email });
  } else {
    const existingEmailUser = await User.findOne({ email: email });
    const existingNameUser = await User.findOne({ name: name });
    if (existingEmailUser || existingNameUser) {
      req.flash(
        "error_msg",
        "This UserName and/or Email are already registered."
      );
      res.redirect("/users/signup");
    } else {
      const newUser = new User({
        name: name,
        email: email,
        password: password,
      });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are Registered.");
      res.redirect("/users/signin");
    }
  }
};

usersCtrl.renderSignInForm = (req, res) => {
  res.render("users/signin.hbs");
};

usersCtrl.signin = passport.authenticate("local", {
  failureRedirect: "/users/signin",
  successRedirect: "/notes",
  failureFlash: true,
});

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are Logged Out now.");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;

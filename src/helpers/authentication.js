const helpers = {};

helpers.isValidated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Not Authorized: You must Sign In.");
  res.redirect("/users/signin");
};

module.exports = helpers;

const express = require("express");
const router = express.Router();

const {
  renderSignUpForm,
  renderSignInForm,
  signup,
  signin,
  logout,
} = require("../controllers/users.controller.js");

router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", signup);

router.get("/users/signin", renderSignInForm);

router.post("/users/signin", signin);

router.get("/users/logout", logout);

module.exports = router;

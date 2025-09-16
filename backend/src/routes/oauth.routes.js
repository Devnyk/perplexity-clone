// src/routes/oauth.routes.js
const express = require("express");
const passport = require("passport");
require("../services/googleAuth.service"); // import Google strategy
const jwt = require("jsonwebtoken");

const router = express.Router();

// Start Google Auth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback from Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }); // secure: true in prod
    res.redirect("http://localhost:5173/"); // Redirect to frontend home
  }
);

module.exports = router;

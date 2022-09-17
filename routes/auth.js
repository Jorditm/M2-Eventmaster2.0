const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const router = express.Router();
const bcryptSalt = 10;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup", {
    errorMessage: "",
  });
});

router.post("/signup", (req, res, next) => {
  const nameInput = req.body.name;
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  if (emailInput === "" || passwordInput === "") {
    res.render("auth/signup", {
      errorMessage: "Ingrese el correo electrónico y la contraseña para iniciar sesión.",
    });
    return;
  }

  User.findOne({ email: emailInput }, "_id", (err, existingUser) => {
    if (err) {
      next(err);
      return;
    }

    if (existingUser !== null) {
      res.render("auth/signup", {
        errorMessage: `El correo ${emailInput} ya existe.`,
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPass = bcrypt.hashSync(passwordInput, salt);

    const userSubmission = {
      name: nameInput,
      email: emailInput,
      password: hashedPass,
    };

    const theUser = new User(userSubmission);

    theUser.save((err) => {
      if (err) {
        res.render("auth/signup", {
          errorMessage: "Something went wrong. Try again later.",
        });
        return;
      }
      req.session.currentUser = theUser;
      res.redirect("/");
    });
  });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    errorMessage: "",
  });
});

router.post("/login", (req, res, next) => {
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  if (emailInput === "" || passwordInput === "") {
    res.render("auth/login", {
      errorMessage: "Ingrese el correo electrónico y la contraseña para iniciar sesión.",
    });
    return;
  }

  User.findOne({ email: emailInput }, (err, theUser) => {
    if (err || theUser === null) {
      res.render("auth/login", {
        errorMessage: `No existe una cuenta con el siguiente correo: ${emailInput}.`,
      });
      return;
    }

    if (!bcrypt.compareSync(passwordInput, theUser.password)) {
      res.render("auth/login", {
        errorMessage: "Contraseña incorrecta",
      });
      return;
    }

    req.session.currentUser = theUser;
    res.redirect("/");
  });
});

router.get('/logout', (req, res, next) => {
    if (!req.session.currentUser) {
      res.redirect('/');
      return;
    }
  
    req.session.destroy((err) => {
      if (err) {
        next(err);
        return;
      }
  
      res.redirect('/');
    });
  });

module.exports = router;
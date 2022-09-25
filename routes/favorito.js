const express = require("express");
const router = express.Router();
const User = require("../models/user");

const Favorito = require("../models/favorito");

router.use((req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect("/auth/login");
  } else {
    next();
  }
});

router.get("/", (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .populate("favoritos")
    .then((usuario) => {
      res.render("favoritos", { favoritos: usuario.favoritos });
    })
    .catch((error) => console.log(error));
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const newFavorite = {
    eventId: req.body.eventId,
    name: req.body.name,
    url: req.body.url,
    images: req.body.images,
    localDate: req.body.localDate,
    country: req.body.country,
    city: req.body.city,
    address: req.body.address,
  };
  const theFavorito = new Favorito(newFavorite);
  theFavorito
    .save()
    .then((favoritoCreado) => {
      return User.findByIdAndUpdate(
        req.session.currentUser._id,
        { $push: { favoritos: favoritoCreado._id } },
        { new: true }
      );
    })
    .then((usuarioActualizado) => res.redirect(req.header("Referer")))
    .catch((error) => console.log(error));
});

router.post("/:id/delete", (req, res, next) => {
  Favorito.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/favoritos");
    })
    .catch((error) => {
      console.log("Error:", error);
    });

  User.findByIdAndUpdate(req.session.currentUser._id, {
    $pull: { favoritos: req.params.id },
  })
    .populate("favoritos")
    .then((event) => {
      res.status(200).json({ message: "Borrado" }, event);
    })
    .catch((err) => console.log(err));
});

module.exports = router;

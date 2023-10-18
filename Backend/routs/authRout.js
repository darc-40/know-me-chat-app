const express = require("express");
const router = express.Router();
// const multer = require('multer')
// const sharp = require("sharp");

// IMPORTING ROUTES
const { createUser, login } = require("../controllers/authController");
const { upload } = require("../middlewares/multerMiddleware");

// ROUTES LOGICS
router.post("/createUser", upload.single("profile"), createUser);
router.post("/login", login);

module.exports = router;

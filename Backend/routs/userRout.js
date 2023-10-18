const express = require("express");
const router = express.Router();
// const multer = require('multer')
// const sharp = require("sharp");

// IMPORTING ROUTES
const { getUsers, sendingRequest, getFriendRequests } = require("../controllers/userController");



// ROUTES LOGICS
router.get("/getUsers/:userId", getUsers);
router.post("/sendingRequest", sendingRequest);
router.get("/getFriendRequests/:userId", getFriendRequests);


module.exports = router;

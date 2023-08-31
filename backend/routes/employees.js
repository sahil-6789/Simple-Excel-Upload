const express = require('express');
const multer = require("multer");
const { fetchUser, addUser } = require('../controller/employee');

const router = express.Router();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "dummy/");
    },
    filename: (req, file, cb) => {
        cb(null, Math.random() + "_" + file.originalname);
    }
});

const dummy = multer({ storage: storage });

router.get('/', fetchUser)
      .post('/', dummy.single("xlsx"),addUser)



module.exports = router

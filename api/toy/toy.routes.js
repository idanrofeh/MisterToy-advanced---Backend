const express = require("express");
const { getToys, addToy, updateToy, removeToy } = require("./toy.controller");
const router = express.Router();


router.get("/", getToys);
router.post("/", addToy);
router.put("/", updateToy);
router.delete("/:toyId", removeToy);

module.exports = router;
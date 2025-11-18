const express = require("express");
const router = express.Router();
const listsController = require("../controllers/listsController");

// Routes
router.post("/", listsController.createList);
router.get("/search/:query", listsController.searchLists);
router.get("/:name", listsController.getListByName);
router.get("/", listsController.getAllLists);

module.exports = router;

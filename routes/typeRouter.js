const express = require("express");
const router = express.Router();
const controller = require("../controllers/typeController");

router.get("/new",                  controller.newTypeForm);
router.get("/",                     controller.listTypes);
router.post("/",                    controller.createType);
router.get("/:id",                  controller.showType);
router.get("/:id/edit",             controller.editTypeForm);
router.post("/:id/update",          controller.updateType);
router.get("/:id/delete",           controller.deleteTypeForm);
router.post("/:id/delete",          controller.deleteType);

module.exports = router;
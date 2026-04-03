const express = require("express");
const router = express.Router();
const controller = require("../controllers/trainerController");

router.get("/new",                        controller.newTrainerForm);
router.get("/",                           controller.listTrainers);
router.post("/",                          controller.createTrainer);
router.get("/:id",                        controller.showTrainer);
router.get("/:id/edit",                   controller.editTrainerForm);
router.post("/:id/update",                controller.updateTrainer);
router.get("/:id/delete",                 controller.deleteTrainerForm);
router.post("/:id/delete",                controller.deleteTrainer);
router.post("/:id/add-pokemon",           controller.addPokemon);
router.post("/:id/remove-pokemon",        controller.removePokemon);

module.exports = router;
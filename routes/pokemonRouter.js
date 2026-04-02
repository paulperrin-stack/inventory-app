const express = require("express");
const router = express.Router();
const controller = require("../controllers/pokemonController");

router.get("/new",                  controller.newPokemonForm);
router.post("/",                    controller.createPokemon);
router.get("/:id",                  controller.showPokemon);
router.get("/:id/edit",             controller.editPokemonForm);
router.post("/:id/update",          controller.updatePokemon);
router.get("/:id/delete",           controller.deletePokemonForm);
router.post("/:id/delete",          controller.deletePokemon);

module.exports = router;
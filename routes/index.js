const express = require("express");
const router = express.Router();
const db = require("../db/queries");

router.get("/", async (req, res) => {
    const types = await db.getAllTypes();
    const pokemons = await db.getAllPokemons();
    const trainers = await db.getAllTrainers();
    res.render("index", { types, pokemons, trainers });
});

module.exports = router;
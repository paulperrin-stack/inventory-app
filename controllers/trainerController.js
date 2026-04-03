const db = require("../db/queries");

exports.listTrainers = async (req, res) => {
    const trainers = await db.getAllTrainers();
    res.render("trainers/index", { trainers });
};

exports.showTrainer = async (req, res) => {
    const trainer = await db.getTrainerById(req.params.id);
    const myPokemons = await db.getPokemonsByTrainer(req.params.id);
    const allPokemons = await db.getAllPokemons();
    // Filter out pokemons the trainer already has
    const myPokemonIds = myPokemons.map(p => p.id);
    const availablePokemons = allPokemons.filter(p => !myPokemonIds.includes(p.id));
    res.render("trainers/detail", { trainer, myPokemons, availablePokemons });
};

exports.newTrainerForm = (req, res) => {
    res.render("trainers/form", { trainer: null });
};

exports.createTrainer = async (req, res) => {
    await db.createTrainer(req.body);
    res.redirect("/trainers");
};

exports.editTrainerForm = async (req, res) => {
    const trainer = await db.getTrainerById(req.params.id);
    res.render("trainers/form", { trainer });
};

exports.updateTrainer = async (req, res) => {
    await db.updateTrainer(req.params.id, req.body);
    res.redirect(`/trainers/${req.params.id}`);
};

exports.deleteTrainerForm = async (req, res) => {
    const trainer = await db.getTrainerById(req.params.id);
    res.render("trainers/delete", { trainer });
};

exports.deleteTrainer = async (req, res) => {
    await db.deleteTrainer(req.params.id);
    res.redirect("/trainers");
};

exports.addPokemon = async (req, res) => {
    await db.addPokemonToTrainer(req.params.id, req.body.pokemon_id);
    res.redirect(`/trainers/${req.params.id}`);
};

exports.removePokemon = async (req, res) => {
    await db.removePokemonFromTrainer(req.params.id, req.body.pokemon_id);
    res.redirect(`/trainers/${req.params.id}`);
};
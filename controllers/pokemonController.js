const db = require("../db/queries");

exports.showPokemon = async (req, res) => {
    const pokemon = await db.getPokemonById(req.params.id);
    res.render("pokemons/detail", { pokemon });
};

exports.newPokemonForm = async (req, res) => {
    const types = await db.getAllTypes();
    res.render("pokemons/form", { pokemon: null, types });
};

exports.createPokemon = async (req, res) => {
    await db.createPokemon(req.body);
    res.redirect("/types");
};

exports.editPokemonForm = async (req, res) => {
    const pokemon = await db.getPokemonById(req.params.id);
    const types = await db.getAllTypes();
    res.render("pokemons/form", { pokemon, types });
};

exports.updatePokemon = async (req, res) => {
    await db.updatePokemon(req.params.id, req.body);
    res.redirect(`/pokemons/${req.params.id}`);
};

exports.deletePokemonForm = async (req, res) => {
    const pokemon = await db.getPokemonById(req.params.id);
    res.render("pokemons/delete", { pokemon });
};

exports.deletePokemon = async (req, res) => {
    await db.deletePokemon(req.params.id);
    res.redirect("/types");
}
const db = require("../db/queries");

exports.listTypes = async (req, res) => {
    const types = await db.getAllTypes();
    res.render("types/index", { types });
};

exports.showType = async (req, res) => {
    const type = await db.getTypeById(req.params.id);
    const pokemons = await db.getPokemonByType(req.params.id);
    res.render("types/detail", { type, pokemons });
};

exports.newTypeForm = (req, res) => {
    res.render("types/form", { type: null });
};

exports.createType = async (req, res) => {
    const type = await db.getTypeById(req.params.id);
    res.render("types/form", { type });
};

exports.editTypeForm = async (req, res) => {
    const type = await db.getTypeById(req.params.id);
    res.render("types/form", { type });
};

exports.updateType = async (req, res) => {
    await db.updateType(req.params.id, req.body);
    res.redirect(`/types/${req.params.id}`);
};

exports.deleteTypeForm = async (req, res) => {
    const type = await db.getTypeById(req.params.id);
    res.render("types/delete", { type });
};

exports.deleteType = async (req, res) => {
    await db.deleteType(req.paramis.id);
    res.redirect("/types");
};
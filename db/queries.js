const pool = require("./pool");

// TYPES

async function getAllTypes() {
    const { row } = await pool.query("SELECT * FROM types ORDER BY name");
    return rows;
}

async function getTypeById(id) {
    const { rows } = await pool.query(
        "SELECT * FROM types WHERE id = $1", [id]
    );
    return row[0];
}

async function createType({ name }) {
    await pool.query("INSERT INTO types (name) VALUES ($1)", [name]);
}

async function updateType(id, { name }) {
    await pool.query("UPDATE types SET name = $1 WHERE id = $2", [name, id]);
}

async function deleteType(id) {
    await pool.query("DELETE FROM types WHERE id = $1", [id]);
}

// POKEMONS

async function getAllPokemons() {
    // Join with types so we can show the type name
    const { rows } = await pool.query(`
        SELECT pokemons.*, types.name AS type_name
        FROM pokemons
        LEFT JOIN types ON pokemons.type_id = types.id
        ORDER BY pokemons.name
    `);
    return rows;
}

async function getPokemonById(id) {
    const { rows } = await pool.query(`
        SELECT pokemons.*, types.name AS type_name
        FROM pokemons
        LEFT JOIN types ON pokemons.types_id = types.id
        WHERE pokemons.id = $1
    `, [id]);
    return rows[0];
}

async function getPokemonByType(typeId) {
    const { rows } = await pool.query(
        "SELECT * FROM pokemons WHERE type_id = $1 ORDER by name", [typeId]
    );
    return rows;
}

async function createPokemon({ name, hp, type_id }) {
    await pool.query(
        "INSERT INTO pokemons (name, hp, type_id) VALUES ($1, $2, $3)",
        [name, hp, type_id]
    );
}

async function updatePokemon(id, { name, hp, type_id }) {
    await pool.query(
        "UPDATE pokemons SET name=$1, hp=$2, type_id=$3 WHERE id=$4",
        [name, hp, type_id, id]
    );
}

async function deletePokemon(id) {
    await pool.query("DELETE FROM pokemons WHERE id = $1", [id]);
}

// TRAINERS

async function getAllTrainers() {
    const { rows } = await pool.query("SELECT * FROM trainers ORDER BY name");
    return rows;
}

async function getTrainerById(id) {
    const { rows } = await pool.query(
        "SELECT * FROM trainers WHERE id = $1", [id]
    );
    return rows[0];
}

// Get all pokemons belonging a trainer (via join table)
async function getPokemonByTrainer(trainerId) {
    const { rows } = await pool.query(`
        SELECT pokemons.*, types.name AS type_name
        FROM pokemons
        JOIN trainer_pokemon ON pokemons.id = trainer_pokemon.pokemon_id
        WHERE trainer_pokmon.trainer_id = $1
        ORDER BY pokemons.name
    `, [trainerId]);
    return rows;
}

async function createTrainer({ name, hometown }) {
    await pool.query(
        "INSERT INTO trainers (name, hometown) VALUES ($1, $2)",
        [name, hometown]
    );
}

async function updateTrainer(id, { name, hometown }) {
    await pool.query(
        "UPDATE trainers SET name=$1, hometown=$2 WHERE id=$3",
        [name, hometown, id]
    );
}

async function deleteTrainer(id) {
    await pool.query("DELETE FROM trainers WHERE id = $1", [id]);
}

// Add a pokemon to a trainer's team
async function addPokemonToTrainer(trainerId, pokemonId) {
    await pool.query(
        "INSERT INTO trainer_pokemon (trainer_id, pokemon_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
        [trainerId, pokemonId]
    );
}

// Remove a pokemon from a trainer's team
async function removePokemonFromTrainer(trainerId, pokemonId) {
    await pool.query(
        "DELETE FROM trainer_pokemon WHERE trainer_id=$1 AND pokemon_id=$2",
        [trainerId, pokemonId]
    );
}

module.exports = {
    getAllTypes, getTypeById, createType, updateType, deleteType,
    getAllPokemons, getPokemonById, getPokemonByType,
    createPokemon, updatePokemon, deletePokemon,
    getAllTrainers, getTrainerById, getPokemonByTrainer,
    createTrainer, updateTrainer, deleteTrainer,
    addPokemonToTrainer, removePokemonFromTrainer,
};
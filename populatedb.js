require("dotenv").config();
const pool = require("./db/pool");

async function main() {
    console.log("Creating tables...");

    // Types table (like categories)
    await pool.query(`
        CREATE TABLE IF NOT EXISTS types (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );
    `);

    // Pokemon table - each pokemon has ONE type
    await pool.query(`
        CREATE TABLE IF NOT EXISTS pokemons (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            hp INT NOT NULL,
            type_id INT REFERENCES types(id) ON DELETE SET NULL
        );
    `);

    // Trainers table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS trainers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            hometown VARCHAR(100)
        );
    `);

    // Join table - links trainers to their pokemons (many-to-many)
    await pool.query(`
        CREATE TABLE IF NOT EXISTS trainer_pokemon (
            trainer_id INT REFERENCES trainers(id) ON DELETE CASCADE,
            pokemon_id INT REFERENCES pokemons(id) ON DELETE CASCADE,
            PRIMARY KEY (trainer_id, pokemon_id)
        );
    `);

    console.log("Inserting data...");

    await pool.query(`
        INSERT INTO types (name) VALUES
            ('Fire'), ('Water'), ('Grass'),
            ('Electric'), ('Psychic'), ('Normal')
        ON CONFLICT (name) DO NOTHING;
    `);

    await pool.query(`
        INSERT INTO pokemons (name, hp, type_id) VALUES
            ('Charmander', 39, 1),
            ('Charizard',  78, 1),
            ('Squirtle',   44, 2),
            ('Blastoise',  79, 2),
            ('Bulbasaur',  45, 3),
            ('Pikachu',    35, 4),
            ('Mewtwo',    106, 5),
            ('Snorlax',   160, 6)
        ON CONFLICT DO NOTHING;
    `);

    await pool.query(`
        INSERT INTO trainers (name, hometown) VALUES
            ('Ash',     'Pallet Town'),
            ('Misty',   'Cerulean City'),
            ('Brock',   'Pewter City'),
            ('Gary',    'Pallet Town')
        ON CONFLICT DO NOTHING;
    `);

    // Ash has: Pikachu, Charizard, Bulbasaur, Squirtle
    // Misty has: Squirtle, Blastoise
    // Brock has: Snorlax
    // Gary has: Blastoise, Mewtwo
    await pool.query(`
        INSERT INTO trainer_pokemon (trainer_id, pokemon_id) VALUES
            (1, 6), (1, 2), (1, 5), (1, 3),
            (2, 3), (2, 4),
            (3, 8),
            (4, 4), (4, 7)
        ON CONFLICT DO NOTHING;
  `);

  console.log("Done! Database is ready.");
  await pool.end();
}

main();
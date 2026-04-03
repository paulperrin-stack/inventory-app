require("dotenv").config();
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true}));

const indexRouter       = require("./routes/index");
const typeRouter        = require("./routes/typeRouter");
const pokemonRouter     = require("./routes/pokemonRouter");
const trainerRouter     = require("./routes/trainerRouter");

app.use("/",            indexRouter);
app.use("/types",       typeRouter);
app.use("/pokemons",    pokemonRouter);
app.use("/trainers",    trainerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Pokédex running at http://localhost:${PORT}`));
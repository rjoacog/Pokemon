const { Router } = require('express');
const pokemonRouter = require("./pokemon.js");
const typesRouter = require("./tipo.js")
var cors = require('cors');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use(cors());
router.use("/pokemons", pokemonRouter)
router.use("/types", typesRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

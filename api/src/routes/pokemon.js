const { Pokemon, Tipo } = require('../db.js')
const router = require('express').Router();
const axios = require("axios");




router.get('/', async function (req, res) {
    const { name } = req.query;
    if (!name) {
        const pokemonApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
        // console.log(pokemonApi);
        const pokemon = await Pokemon.findAll({
            include: [{ model: Tipo, as: "tipo" }]
        });
        console.log(pokemon)
        const pokemonWithAllData = await Promise.all(
            await pokemonApi.data.results.map(async e => {
                const info = await axios.get(e.url);
                return {
                    ...e,
                    img: info.data.sprites.front_default,
                    types: info.data.types,
                    fuerza: info.data.stats[1].base_stat,
                    id: info.data.id
                }
            })
        )
        const pokemonData = pokemonWithAllData.concat(pokemon);
        console.log(pokemonData);
        res.json(pokemonData);
    } else {
        getByName(req, res);
    }
});

const getPokemonFromDb = async (idPokemon) => {
    try {
        const pokemonDb = await Pokemon.findAll({
            where: {
                id: idPokemon
            },
            include: [{
                model: Tipo, as: "tipo"
            }]
        });
        return pokemonDb;
    } catch (error) {
        return "No existe";
    }
}


router.get('/:idPokemon', async function (req, res) {
    try {
        const { idPokemon } = req.params;
        const pokemonDb = await getPokemonFromDb(idPokemon);
        console.log("entre");
        if (pokemonDb !== "No existe") {
            console.log(pokemonDb)
            return res.send(pokemonDb[0])
        }
        if (pokemonDb === "No existe") {
            const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
            const pokemonData = {
                //...pokemonDb.data,
                name: pokemonApi.data.species.name,
                img: pokemonApi.data.sprites.front_default,
                types: pokemonApi.data.types,
                altura: pokemonApi.data.height,
                peso: pokemonApi.data.weight,
                vida: pokemonApi.data.stats[0].base_stat,
                ataque: pokemonApi.data.stats[1].base_stat,
                defensa: pokemonApi.data.stats[2].base_stat,
                velocidad: pokemonApi.data.stats[5].base_stat,
                id: pokemonApi.data.id
            };
            res.json(pokemonData)
        }
    } catch (error) {
        console.log("ENTRE ACA ID!!!")
        //console.log(error)
        res.status(404).send("no existe un pokemon con dicho id");
    }
});


const getNamePokemonFromDb = async (name) => {
    try {
        console.log("ENTRO AL TRY")
        const pokemonDb = await Pokemon.findAll({
            where: {
                name: name
            },
            include: [{
                model: Tipo, as: "tipo"
            }]
        })
        // console.log(pokemonDb)
        return pokemonDb ? pokemonDb : "No existe!";

    } catch (error) {
        return "No existe!"
    }
}

async function getByName(req, res) {
    try {
        const { name } = req.query;
        // console.log(name);
        const pokemonDb = await getNamePokemonFromDb(name.toLowerCase());
        console.log(pokemonDb);
        if (pokemonDb === "No existe!" || !pokemonDb || !pokemonDb.length) {
            const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            // console.log(pokemonApi);
            const pokemonData = {
                ...pokemonDb.data,
                name: pokemonApi.data.species.name,
                img: pokemonApi.data.sprites.front_default,
                types: pokemonApi.data.types,
                Altura: pokemonApi.data.height,
                Peso: pokemonApi.data.weight,
                Vida: pokemonApi.data.stats[0].base_stat,
                Ataque: pokemonApi.data.stats[1].base_stat,
                Defensa: pokemonApi.data.stats[2].base_stat,
                Velocidad: pokemonApi.data.stats[5].base_stat,
                id: pokemonApi.data.id
            };
            res.json(pokemonData);
            // console.log(pokemonData)
        } else {
            res.json(pokemonDb[0]);
            // console.log(pokemonDb)
        }
    } catch (error) {
        // console.log("ENTRE ACA!!!");
        // console.log(error);
        res.status(404).send("No existe este pokemon");
    }
};

router.post("/", async (req, res) => {
    const {
        name,
        vida,
        fuerza,
        velocidad,
        defensa,
        altura,
        peso,
        createdInDb,
        tipo
    } = req.body;
    if (!name) {
        console.log("ENTROOOOOOOOOOOOO")   
       return  res.status(400).json({message:"nombre obligatorio"})
    }
    try {
        const pokemonCreate = await Pokemon.create({
            name,
            vida,
            fuerza,
            velocidad,
            defensa,
            altura,
            peso,
            createdInDb,
        });
        const tipoDb = await Tipo.findAll({
            where: { name: tipo }
            // include: [{Tipo, as: "tipo"}]
        });
        pokemonCreate.addTipo(tipoDb);
        console.log("LO CREA")
        res.send("Pokemon creado con exito")
    } catch (error) {
        console.log(error);
        res.status(400).send("El nombre es obligatorio")
    }
})


module.exports = router;

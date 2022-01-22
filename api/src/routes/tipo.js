const router = require('express').Router();
const axios = require("axios");
const { Pokemon, Tipo } = require('../db.js');

router.get("/", async (req, res) => {
    try {
        const types = await Tipo.findAll();
        if (types.length) {
            res.send(types)
        } else {
            const typesApi = await axios.get("https://pokeapi.co/api/v2/type");
            const typesArray = typesApi.data.results.map(e => ({ name: e.name }));
            await Tipo.bulkCreate(typesArray, { returning: true });
            res.status(200).send("SE GUARDO");
            //console.log(typesApi);
        };
    } catch (error) {
        console.log("ENTREEEEEE")
        console.log(error)
    }
});

module.exports = router;

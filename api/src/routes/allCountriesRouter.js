const express = require("express");
const findAllCountries = require("../controllers/findAlllCountries");
const findCountryByQuery = require("../controllers/findCountryByQuery")
const findCountry = require("../controllers/findCountry");

const allCountriesRouter = express.Router()

allCountriesRouter.get("/", async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            const countryByQuery = await findCountryByQuery(name)
            return res.status(200).json(countryByQuery);
        }
        const countries = await findAllCountries();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
allCountriesRouter.get("/:idCountry", async (req, res) => {
    try {
        const {idCountry} = req.params;
        const country = await findCountry(idCountry)
        res.status(200).json(country)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = allCountriesRouter; 
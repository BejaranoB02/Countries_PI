const { Country } = require("../db")

const findAllCountries = async () => {
    const countries = await Country.findAll();
    return countries;
};

module.exports = findAllCountries; 
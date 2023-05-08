const { Country } = require("../db")

const findCountry = async (idCountry) => {
      const countryById = await Country.findByPk(idCountry);
      return countryById;
}

module.exports = findCountry;
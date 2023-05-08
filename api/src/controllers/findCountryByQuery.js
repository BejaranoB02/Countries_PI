const { Country } = require("../db")
const { Op } = require("sequelize")

const findCountryByQuery = async (name) => {
    console.log(name)
    const countryByQuery = await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            }
        }
    })
    console.log(name[1])
    return countryByQuery;
}

module.exports = findCountryByQuery;

//[ Op.iLike ]:'%'+genreName}
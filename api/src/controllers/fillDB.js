const { where } = require("sequelize");
const { Country } = require("../db")

const fillDB = () => {
    fetch(`https://restcountries.com/v3/all`)
        .then(response => response.json())
        .then((data)=>{
            data.forEach((country) => {
                const objCountry = {
                    name: country.translations.spa.common,
                    flagImage: country.flags[1],
                    continent: country.region ? country.region : "not found",
                    capital: country.capital ? country.capital[0] : "not found",
                    subregion: country.subregion ? country.subregion : "not found",
                    area: country.area,
                    population: country.population,
                }
                Country.findOrCreate({where: {
                    name: objCountry.name,
                    flagImage: objCountry.flagImage,
                    continent: objCountry.continent,
                    capital: objCountry.capital,
                    subregion: objCountry.subregion,
                    area: objCountry.area,
                    population: objCountry.population,
                }})
                console.log(objCountry);
            });
        })
        .catch((error)=>{console.log(error.message)})
    

    
}

module.exports = fillDB;
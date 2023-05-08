const { Activity, Country } = require("../db");

const findAllActivities = async () => {
    const allActivities =  await Activity.findAll({
        include: {
            model: Country,
            attributes: ["name"],
            through: {
                attributes: []
            }            
        }
    });
    
    return allActivities;
}

module.exports = findAllActivities;

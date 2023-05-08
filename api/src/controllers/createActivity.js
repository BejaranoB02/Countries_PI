const { Activity } = require("../db")
const createActivity = async ({ name, dificulty, duration, season, countries }) => {
    console.log({ name, dificulty, duration, season, countries });
    const addActivity = await Activity.create({ name, dificulty, duration, season });
    addActivity.addCountries(countries);
    return addActivity;
}
module.exports = createActivity; 
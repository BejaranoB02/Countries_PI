const express = require("express");
const createActivity = require("../controllers/createActivity")

const activityRouter = express.Router();

activityRouter.post("/", async (req, res) => {
    try {
        const {name, dificulty, duration, season, countries} = req.body;
        console.log(countries)
        const addActivity = await createActivity({name, dificulty, duration, season, countries});
        res.status(200).json(addActivity);
    } catch (error) {
        res.status(500).json({ error: error.message});
    };
});

module.exports = activityRouter;
const express = require("express");
const findAllActivities = require("../controllers/findAllActivities")
const allActivitiesRouter = express.Router();

allActivitiesRouter.get("/", async (req, res) => {
    try {
        const allActivities = await findAllActivities()
        res.status(200).json(allActivities) 
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

module.exports = allActivitiesRouter;
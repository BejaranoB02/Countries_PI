const { Router } = require('express');
const allCountriesRouter = require("./allCountriesRouter");
const activityRouter = require("./activityRouter")
const allActivitiesRouter = require("./allActivitiesRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", allCountriesRouter)
router.use("/activities", activityRouter)//POST
router.use("/activities", allActivitiesRouter)//GET


module.exports = router;

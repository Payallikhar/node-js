const express = require('express');
const controller = require('../controller/fruit_controller_1')


/*
 * ROUTES SECTION
 */

// Lets create routes as middleware now
const router = express.Router();


/*
 * ACTUAL ROUTES
 */

router.route("/").get(controller.getAllFruits).post(controller.createFruit);
router.route("/:id").get(controller.getAFruit);

module.exports = router;
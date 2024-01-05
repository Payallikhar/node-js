const express = require('express');
const controller = require('../controller/fruit_controller_4')


/*
 * ROUTES SECTION
 */

// Lets create routes as middleware now
const router = express.Router();

/*
 * ACTUAL ROUTES
 */

router.route("/").get(controller.getAllFruits).post(controller.createFruit);
router.route("/:id").get(controller.getAFruit).patch(controller.patchFruit).delete(controller.deleteFruit);

module.exports = router;
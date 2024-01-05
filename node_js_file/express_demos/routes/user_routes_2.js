const express = require('express');
const controller = require('../controller/user_controller_1');
  /*
 * ROUTES SECTION
 */

// Lets create routes as middleware now
const router = express.Router();

/*
 * ACTUAL ROUTES
 */

router.route("/").get(controller.getAllUsers).post(controller.createUser);
router.route("/:id").get(controller.getAUser);

module.exports = router;
const express = require('express');

const getAllUsers = (req, res) => {
    res
      .status(500)
      .json({ status: "error", message: "This route is not yet defined" });
  };
  
  const getAUser = (req, res) => {
    res
      .status(500)
      .json({ status: "error", message: "This route is not yet defined" });
  };
  
  const createUser = (req, res) => {
    res
      .status(500)
      .json({ status: "error", message: "This route is not yet defined" });
  };

  /*
 * ROUTES SECTION
 */

// Lets create routes as middleware now
const router = express.Router();

/*
 * ACTUAL ROUTES
 */

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getAUser);

module.exports = router;
const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers/field");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.getAll
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.create
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.remove
);
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.update
);

module.exports = router;

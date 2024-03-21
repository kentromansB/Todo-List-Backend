const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

// router.delete('/todos/:id', async (req, res) => {
//     await Todo.findByIdAndDelete(req.params.id);
//     res.status(204).send();
// });

module.exports = router;

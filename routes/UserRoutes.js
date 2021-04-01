const express=require('express');
const userController = require('../controllers/userController');
const router = express.Router();
router.route("/").get(userController.getAlluser).post(userController.addUser);
router.route("/:id").patch(userController.updateUser).delete(userController.deleteUser).get(userController.getUser);
module.exports=router;

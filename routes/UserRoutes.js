const express=require('express');
const Authorization = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.route("/login").post(Authorization.login);
router.route("/").get(Authorization.protect,userController.getAlluser).post(Authorization.protect,Authorization.restrictTo('user'),userController.addUser);
router.route("/:id").patch(userController.updateUser).delete(userController.deleteUser).get(userController.getUser);
module.exports=router;

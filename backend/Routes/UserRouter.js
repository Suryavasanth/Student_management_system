const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");

router.post("/signup",userController.addUsers);
router.post("/login",userController.loginUser);
router.get("/getStudents",userController.getStudents);
router.post("/addStudent",userController.addStudent);
router.delete("/deleteStudent/:id",userController.deleteStudent);
router.put("/updateStudent/:id",userController.updateStudent);

module.exports = router;

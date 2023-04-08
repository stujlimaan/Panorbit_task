const express = require("express")
const router=express.Router()

const user = require("../controllers/userController")

router.post("/create",user.userRegistration)
router.post("/login",user.userLogin)

module.exports = router
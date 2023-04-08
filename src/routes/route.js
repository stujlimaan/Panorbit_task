const express = require("express")
const router=express.Router()

const user = require("../controllers/userController")
const customer = require("../controllers/customerController")

router.post("/create",user.userRegistration)
router.post("/login",user.userLogin)

router.post("/create",customer.customerRegistration)
router.post("/login",customer.customerLogin)

module.exports = router
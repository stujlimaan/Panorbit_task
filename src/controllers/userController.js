const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistration = async function (req, res) {
    try {
      const requestBody = { ...req.body };
      const queryParams = req.query;
  
      //no data is required from query params
      if (Validator.isValidInputBody(queryParams)) {
        return res.status(404).send({ status: false, message: "Page not found" });
      }
  
      if (!Validator.isValidInputBody(requestBody)) {
        return res.status(400).send({
          status: false,
          message: "User data is required for registration",
        });
      }
  
      //using destructuring
      let { fname, lname, email, phone, password,  } = requestBody;
  
      // each key validation starts here
      if (!Validator.isValidInputValue(fname)) {
        return res
          .status(400)
          .send({
            status: false,
            message: "First name is required like : Suraj.",
          });
      }
  
      if (!Validator.isValidOnlyCharacters(fname)) {
        return res.status(400).send({
          status: false,
          message: "Only alphabets allowed in first name",
        });
      }
  
      if (!Validator.isValidInputValue(lname)) {
        return res
          .status(400)
          .send({ status: false, message: "last name is required like: DOE" });
      }
  
      if (!Validator.isValidOnlyCharacters(lname)) {
        return res.status(400).send({
          status: false,
          message: "Only alphabets allowed in last name",
        });
      }
  
      if (!Validator.isValidInputValue(email)) {
        return res
          .status(400)
          .send({ status: false, message: "email address is required" });
      }
  
      if (!Validator.isValidEmail(email)) {
        return res.status(400).send({
          status: false,
          message: "Please enter a valid email address like : xyz@gmail.com",
        });
      }
  
      const isUniqueEmail = await UserModel.findOne({ email });
  
      if (isUniqueEmail) {
        return res
          .status(400)
          .send({ status: false, message: "Email address already exist" });
      }
  
      if (!Validator.isValidInputValue(phone)) {
        return res
          .status(400)
          .send({ status: false, message: "Phone number is required" });
      }
  
      if (!Validator.isValidPhone(phone)) {
        return res.status(400).send({
          status: false,
          message: "Please enter a valid phone number like : 9638527410",
        });
      }
  
      const isUniquePhone = await UserModel.findOne({ phone });
  
      if (isUniquePhone) {
        return res
          .status(400)
          .send({ status: false, message: "phone number already exist" });
      }
  
      if (!Validator.isValidInputValue(password)) {
        return res
          .status(400)
          .send({ status: false, message: "password is required" });
      }
  
      if (!Validator.isValidPassword(password)) {
        return res.status(400).send({
          status: false,
          message:
            "Password should be of 8 to 15 characters and  must have 1 letter and 1 number",
        });
      }
  
  
      //! password encryption
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
  
      const userData = {
        fname: fname.trim(),
        lname: lname.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: encryptedPassword,
      };
  
      const newUser = await UserModel.create(userData);
  
      res.status(201).send({
        status: true,
        message: "User successfully registered",
        data: newUser,
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
  //**********************************************USER LOGIN*************************************************** */
  
  const userLogin = async function (req, res) {
    try {
      const queryParams = req.query;
      const requestBody = req.body;
  
      //no data is required from query params
      if (Validator.isValidInputBody(queryParams)) {
        return res.status(404).send({ status: false, message: "Page not found" });
      }
  
      if (!Validator.isValidInputBody(requestBody)) {
        return res.status(400).send({
          status: false,
          message: "User data is required for login",
        });
      }
  
      const userName = requestBody.email;
      const password = requestBody.password;
  
      if (!Validator.isValidInputValue(userName)) {
        return res
          .status(400)
          .send({ status: false, message: "email is required" });
      }
  
      if (!Validator.isValidEmail(userName)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter a valid email " });
      }
  
      if (!Validator.isValidInputValue(password)) {
        return res
          .status(400)
          .send({ status: false, message: "password is required" });
      }
  
      if (!Validator.isValidPassword(password)) {
        return res.status(400).send({
          status: false,
          message:
            "Enter password of 8 to 15 characters and must contain one letter and digit ",
        });
      }
      // finding user by given email
      const userDetails = await UserModel.findOne({ email: userName });
  
      if (!userDetails) {
        return res
          .status(404)
          .send({ status: false, message: "No user found by email" });
      }
      // comparing hashed password and login password
      const isPasswordMatching = await bcrypt.compare(
        password,
        userDetails.password
      );
  
      if (!isPasswordMatching) {
        return res
          .status(400)
          .send({ status: false, message: "incorrect password" });
      }
  
      // creating JWT token
      const payload = { userId: userDetails._id };
      const expiry = { expiresIn: "1800s" };
      const secretKey = "123451214654132466ASDFGwnweruhkwerbjhiHJKL!@#$%^&";
  
      const token = jwt.sign(payload, secretKey, expiry);
  
      // setting bearer token in response header
      res.header("Authorization", "Bearer " + token);
  
      const data = { userId: userDetails._id, token: token };
  
      res
        .status(200)
        .send({ status: true, message: "login successful", data: data });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
  //********************************************GET USER PROFILE DETAILS***************************************** */
  
  
  //*******************************************EXPORTING ALL HANDLERS OF USER************************************** */
  
  module.exports = {
    userRegistration,
    userLogin
  };
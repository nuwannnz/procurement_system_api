const express = require("express");
const router = express.Router();
const { verifyJWTToken } = require("./middleware");

const userService = require("../services/user.service");

router.get("/has-admin", async (req, res, next) => {
  try {
    const hasAdmin = await userService.hasAdmin();
    res.json({ hasAdmin });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to get has admin" });
  }
});

router.get("/", verifyJWTToken, async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to get users" });
  }
});

router.post("/signup", async (req, res, next) => {
  // extract email and password
  const { email, password } = req.body;

  try {
    // sign up user
    const user = await userService.signup(email, password);
    if (user) {
      return res.json({ status: true });
    }
    return res.json({ status: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to signup user" });
  }
});

router.post("/", verifyJWTToken, async (req, res, next) => {
  // extract email and password
  const { email, password, role } = req.body;

  try {
    // sign up user
    const user = await userService.createUser({
      fName: "",
      lName: "",
      role,
      password,
      email,
    });
    if (user) {
      return res.json({ status: true });
    }
    return res.json({ status: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to create user" });
  }
});

router.post("/login", async (req, res, next) => {
  // extract email and password
  const { email, password } = req.body;

  try {
    // check if credentials are valid
    const userInfo = await userService.login(email, password);
    if (userInfo) {
      const token = userService.generateToken(email);
      return res.json({ isAuth: true, token, userInfo });
    }
    return res.json({ isAuth: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to get has admin" });
  }
});

router.delete("/:id", async (req, res, next) => {
  // extract id
  const userId = req.params.id;

  try {
    // check if credentials are valid
    const userDeleted = await userService.removeUser(userId);
    if (userDeleted) {
      return res.json({ status: true });
    }
    return res.json({ status: false });
  } catch (error) {
    console.error(error);
    res.json({ error: "Failed to remove user" });
  }
});

module.exports = router;

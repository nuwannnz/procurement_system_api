const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

/**
 * USER_ROLES
 * 1 = ADMIN
 * 2 = MANAGEMENT
 * 3 = PROCUMENT_STAFF
 * 4 = SITE_MANAGER
 * 5 = SUPPLIER
 *
 */

/**
 * This function will check whether an
 * administrator account is registered
 */
const hasAdmin = async () => {
  const adminCount = await User.count();
  return adminCount > 0;
};

/**
 * This function will create a new user
 * with the given email and password
 * @param {string} email Email of the user
 * @param {string} password Password of the user
 */
const signup = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });
  return user;
};

/**
 * This function will check if the given
 * email and the password matches
 * @param {string} email Email of the user
 * @param {string} password Password of the user
 */
const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (user === null) {
    return false;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return false;
  }
  const userInfo = user.toJSON();
  delete userInfo.password;
  return { ...userInfo };
};

/**
 * This function will return a list
 * of emails of the all users
 */
const getUserEmails = async () => {
  const users = await User.findAll();

  return users.map((user) => user.email);
};

/**
 * This function will generate a JWT with the
 * given email
 * @param {string} email Email to hash
 */
const generateToken = (email) => {
  const token = jwt.sign({ email }, config.jwt.secret, config.jwt.tokenOptions);
  return token;
};

const createUser = async ({ fName, lName, role, password, email }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    fName,
    lName,
    userRole: role,
  });
  return user;
};

const removeUser = async (userId) => {
  await User.destroy({ where: { id: userId } });
};

module.exports = {
  hasAdmin,
  login,
  signup,
  generateToken,
  getUserEmails,
  createUser,
};

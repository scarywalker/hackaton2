// const {
//     _getAllUsers,
//     _getOneUser,
//     _addUser,
//     _updateUser,
//     _logUser,
//   } = require("../models/users.model.js");
  
  const getAllUsers = async (req, res) => {
    try {
      const data = await _getAllUsers();
      res.json(data);
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  const getUserById = async (req, res) => {
    console.log("params=>", req.params);
    const { id } = req.params;
  
    try {
      const data = await _getOneUser(id);
      if (data.length === 0)
        return res.status(404).json({ msg: "No User Found" });
      res.json(data);
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  const registerUser = async (req, res) => {
    console.log("body=>", req.body);
    const { login, password, email, first_name, last_name } = req.body;
    try {
      await _addUser(login, password, email, first_name, last_name);
      getAllUsers(req, res);
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  const loginUser = async (req, res) => {
    const { login, password } = req.body;
    try {
      const user = await _logUser(login, password);
  
      if (user) {
        console.log(`User "${user.login}" logged in successfully.`);
        res
          .status(200)
          .json({ msg: `User "${user.login}" logged in successfully.` });
      } else {
        console.log("Login failed. Invalid username or password.");
        res
          .status(401)
          .json({ msg: "Login failed. Invalid username or password." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, first_name, last_name } = req.body;
    try {
      const dataToUpdate = { email, first_name, last_name };
      await _updateUser(id, dataToUpdate);
      getAllUsers(req, res);
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    updateUser,
    loginUser,
  };
  
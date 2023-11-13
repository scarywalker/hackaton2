const {
  _getAllUsers,
  _getOneUser,
  _addUser,
  _updateUser,
  _logUser,
} = require("../models/users.model");

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
  const {
    username,
    password,
    full_name,
    email,
    contact_telephone,
    areas_of_interest,
    available_locations,
  } = req.body;
  try {
    await _addUser(
      username,
      password,
      full_name,
      email,
      contact_telephone,
      areas_of_interest,
      available_locations
    );
    getAllUsers(req, res);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await _logUser(username, password);

    if (user) {
      console.log(`User "${user.username}" logged in successfully.`);
      res
        .status(200)
        .json({ msg: `User "${user.username}" logged in successfully.` });
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
  const {
    full_name,
    email,
    contact_telephone,
    areas_of_interest,
    available_locations,
  } = req.body;
  try {
    const dataToUpdate = {
      full_name,
      email,
      contact_telephone,
      areas_of_interest,
      available_locations,
    };
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

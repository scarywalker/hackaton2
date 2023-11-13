// const {
//     _getAllOrgs,
//     _getOneOrg,
//     _addOrg,
//     _updateOrg,
//     _logOrg,
//   } = require("../models/model.users.js");
  
  const getAllOrgs = async (req, res) => {
    try {
      const data = await _getAllOrgs();
      res.json(data);
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  const getOrgById = async (req, res) => {
    console.log("params=>", req.params);
    const { id } = req.params;
  
    try {
      const data = await _getOneOrg(id);
      if (data.length === 0)
        return res.status(404).json({ msg: "No Org Found" });
      res.json(data);
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  const registerOrg = async (req, res) => {
    console.log("body=>", req.body);
    const { username, password, email, first_name, last_name } = req.body;
    try {
      await _addOrg(username, password, email, first_name, last_name);
      getAllOrgs(req, res);
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  const loginOrg = async (req, res) => {
    const { username, password } = req.body;
    try {
      const org = await _logOrg(username, password);
  
      if (org) {
        console.log(`Org "${org.username}" logged in successfully.`);
        res
          .status(200)
          .json({ msg: `Org "${org.username}" logged in successfully.` });
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
  
  const updateOrg = async (req, res) => {
    const { id } = req.params;
    const { email, first_name, last_name } = req.body;
    try {
      const dataToUpdate = { email, first_name, last_name };
      await _updateOrg(id, dataToUpdate);
      getAllOrgs(req, res);
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  module.exports = {
    getAllOrgs,
    getOrgById,
    registerOrg,
    updateOrg,
    loginOrg,
  };
  
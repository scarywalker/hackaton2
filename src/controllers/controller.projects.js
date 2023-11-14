const {
  _getAllProjects,
  _getOneProject,
  _addProject,
  _updateProject,
  _deleteProject,
} = require("../models/model.projects.js");

const getProjects = async (req, res) => {
  try {
    const data = await _getAllProjects();
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getProjectId = async (req, res) => {
  console.log("params=>", req.params);
  const { username } = req.params;

  try {
    const data = await _getOneProject(username);
    if (data.length === 0)
      return res.status(404).json({ msg: "No Project Found" });
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const addProject = async (req, res) => {
  console.log("body=>", req.body);
  const { username, title, description, location } = req.body;
  try {
    await _addProject({ username, title, description, location });
    getProjects(req, res);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    await _deleteProject(id);
    getProjects(req, res);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, location } = req.body;

  try {
    await _updateProject(id, title, description, location);
    getProjects(req, res);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getProjects,
  getProjectId,
  addProject,
  deleteProject,
  updateProject,
};

const db = require("../config/db.js");

const _getAllProjects = () => {
  return db("projects_table").select("*").orderBy("id");
};

const _getOneProject = (username) => {
  return db("projects_table").select("*").where({ username });
};

const _addProject = ({ username, title, description, location }) => {
  return db("projects_table").insert(
    { username, title, description, location },
    ["id", "username", "title", "description", "location"]
  );
};

const _updateProject = (id, title, description, location) => {
  return db("projects_table")
    .where({ id })
    .update({ title, description, location }, [
      "id",
      "username",
      "title",
      "description",
      "location",
    ]);
};

const _deleteProject = (id) => {
  return db("projects_table").where({ id }).del();
};

module.exports = {
  _getAllProjects,
  _getOneProject,
  _addProject,
  _updateProject,
  _deleteProject,
};

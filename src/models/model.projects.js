const db = require("../config/db.js");

const _getAllProjects = () => {
  return db("projects_table").select("*").orderBy("id");
};

const _getOneProject = (id) => {
  return db("projects_table").select("*").where({ id });
};

const _addProject = ({ organization_id, title, description, location }) => {
  return db("projects_table").insert(
    { organization_id, title, description, location },
    ["id", "organization_id", "title", "description", "location"]
  );
};

const _updateProject = (id, title, description, location) => {
  return db("projects_table")
    .where({ id })
    .update({ title, description, location }, [
      "id",
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
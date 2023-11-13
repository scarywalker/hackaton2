const router = require("express").Router();
const controllerUsers = require("../controllers/controller.users");
const controllerOrgs = require("../controllers/controller.orgs");
const controllerProjects = require("../controllers/controller.projects");

router.get("/users/", controllerUsers.getAllUsers);
router.get("/users/:id", controllerUsers.getUserById);
router.post("/users/register", controllerUsers.registerUser);
router.post("/users/login", controllerUsers.loginUser);
router.put("/users/:id", controllerUsers.updateUser);

// router.get("/orgs/", controllerOrgs.getAllOrgs);
// router.get("/orgs/:id", controllerOrgs.getOrgById);
// router.post("/orgs/register", controllerOrgs.registerOrg);
// router.post("/orgs/login", controllerOrgs.loginOrg);
// router.put("/orgs/:id", controllerOrgs.updateOrg);

// router.get("/projects/", controllerProjects.getAllProjects);
// router.get("/projects/:id", controllerProjects.getProjectById);
// router.post("/projects/register", controllerProjects.registerProject);
// router.post("/projects/login", controllerProjects.loginProject);
// router.put("/projects/:id", controllerProjects.updateProject);

module.exports = router;

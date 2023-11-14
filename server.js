const express = require("express");
const app = express();
const routes = require("./src/routes/index");
const PORT = 5000;

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static(__dirname + "/public"));

app.use("/", routes);

app.listen(PORT, () => console.log(`Port:${PORT}`));

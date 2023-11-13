const express = require("express");
const app = express()
const routes = require("./src/routes/index");
const PORT = 5000;


app.use(express.static("./public"))
app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => console.log(`Port:${PORT}`));

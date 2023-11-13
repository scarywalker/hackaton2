const express = require("express");
const app = express()
// const postsRoutes = require("./routes/...");
const PORT = 5000;


app.use(express.static("./public"))
app.use(express.json());

// app.use("/api/users", postsRoutes);

app.listen(PORT, () => console.log(`Port:${PORT}`));

const app = require("express")();
const postsRoutes = require("./routes/...");

const PORT = 5000;

app.use(express.json());

app.use("/api/users", postsRoutes);

app.listen(PORT, () => console.log(`Port:${PORT}`));

import express from "express";
import userRoutes from "./src/routes/user.route.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

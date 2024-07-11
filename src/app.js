import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser"; 

const app = express();

import projectRoutes from "./routes/projects.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(express.json());

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
import express, { application } from "express"; //jsmodules
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import cookieParser from "cookie-parser";

import { protectRoute } from "./middleware/protectRoute.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const cors = require("cors");

const corsOptions = {
  files: ["https://netflix-front-chi.vercel.app", "http://localhost:5173"], // Add Vercel and local dev URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,  // Allow cookies if required
};

app.use(cors(corsOptions)); // Apply CORS middleware






const PORT = ENV_VARS.PORT;
app.use(express.json()); //will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);


app.listen(8000, () => {
  console.log("Server started at https://localhost:" + 8000);
  connectDB();
});

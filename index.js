import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { connection } from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/auth", authRoutes);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(
      "Listening On Port " +
        process.env.PORT +
        "\n" +
        "Connected to Mongo Database"
    );
  } catch (error) {
    console.log("Error coming from server: ", error);
  }
});

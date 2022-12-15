import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.route.js";
import generalRoutes from "./routes/general.route.js";
import managementRoutes from "./routes/management.route.js";
import salesRoutes from "./routes/sales.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet);
app.use(
	helmet.crossOriginResourcePolicy({
		policy: "cross-origin",
	})
);
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//client routes used for customers,transactions,products etc
app.use("/client", clientRoutes);
//general routes used for user,dashboard
app.use("general", generalRoutes);
//management routes used for admin and performance
app.use("/management", managementRoutes);
//sales used for overview sales,daily and monthly sales
app.use("/sales", salesRoutes);

//MongoDB connection
const PORT = process.env.PORT || 9000;
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on port: http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});

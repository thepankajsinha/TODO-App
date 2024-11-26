import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/database.js";
import cors from "cors";

//import routes
import todoRoutes from "./routes/todoRoute.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// inbuilt middleware
app.use(express.json());
app.use(cors());


//use routes
app.use("/api", todoRoutes);


// Start the server and connect db
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

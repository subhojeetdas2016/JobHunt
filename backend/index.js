import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();

console.log('Secret Key from .env:', process.env.SECRET_KEY);

const app = express();

const _dirname = path.resolve();

// server status
app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "coming from backend",
        success: true
    })
})

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:5174'],  // Corrected the missing colon
    credentials: true  // Corrected `Credentials` to `credentials`
};


// const corsOptions = {
//     origin: 'http//localhost:5173',
//     Credentials: true,
// }

// app.use(cors(corsOptions));
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;


//api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);   
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});

// "http://localhost:3000/api/v1/user/register"
// "hhtp://localhost:3000/api/v1/user/login"
// "http://localhost:3000/api/v1/user/profile/update"

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is listening ${PORT}`);
});
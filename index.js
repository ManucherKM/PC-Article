import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validator/auth.js";
import checkAuth from "./utils/checkAuth.js"
import * as UserController from "./controlles/UserController.js"

mongoose
    .connect("mongodb+srv://admin:admin123@cluster0.ydbt4tc.mongodb.net/articles?retryWrites=true&w=majority")
    .then(() => console.log("DB starting"))
    .catch((err) => {
        console.log("DB error", err);
    })

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.get("/", (req, res) => {
    UserController.home(req, res)
});

app.get("/auth/me", checkAuth, (req, res) => {
    UserController.authMe(req, res)
});

app.post("/auth/login", loginValidation, (req, res) => {
    UserController.login(req, res)
})

app.post("/auth/register", registerValidation, (req, res) => {
    UserController.register(req, res)
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return
    };
    console.log(`Server start ${PORT}`);
});
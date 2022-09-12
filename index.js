import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation, postCreateValidation } from "./validator/auth.js";
import checkAuth from "./utils/checkAuth.js"
import * as UserController from "./controlles/UserController.js";
import * as PostController from "./controlles/PostController.js"


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
    res.status(200).json({
        message: "Hello user"
    })
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



//Посты

app.post("/posts", checkAuth, postCreateValidation, (req, res) => {
    PostController.createPost(req, res)
})

// app.delete("/posts", checkAuth, postCreateValidation, (req, res) => {
//     PostController.deletePost(req, res)
// })

// app.patch("/posts", checkAuth, postCreateValidation, (req, res) => {
//     PostController.updatePost(req, res)
// })

// app.get("/posts", (req, res) => {
//     PostController.getPost(req, res)
// })

// app.get("/posts/:id", (req, res) => {
//     PostController.getOnePost(req, res)
// })

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return
    };
    console.log(`Server start ${PORT}`);
});
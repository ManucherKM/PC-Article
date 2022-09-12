import express from "express";
import mongoose from "mongoose";
import multer from "multer";
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

const storage = multer.diskStorage({
    
})

const PORT = process.env.PORT || 5000;

app.use(express.json())

app.get("/", UserController.home);
app.get("/auth/me", checkAuth, UserController.authMe);
app.post("/auth/login", loginValidation, UserController.login)
app.post("/auth/register", registerValidation, UserController.register)

//Посты
app.post("/posts", checkAuth, postCreateValidation, PostController.createPost)
app.delete("/posts/:id", checkAuth, PostController.deletePost)
app.patch("/posts/:id", checkAuth, PostController.updatePost)
app.get("/posts", PostController.getAll)
app.get("/posts/:id", PostController.getOne)





app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return
    };
    console.log(`Server start ${PORT}`);
});
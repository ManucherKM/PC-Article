import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js"

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        };

        const body = req.body;

        const password = body.password;

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: body.email,
            passwordHash: hash,
            fullName: body.fullName,
            avatarUrl: body.avatarUrl
        })

        const user = await doc.save();

        const token = jwt.sign({ _id: user._id }, "secret123", { expiresIn: "2d" });

        const { passwordHash, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (err) {

        console.log(err);

        res.status(400).json({
            message: "Не удалось зарегестрироваться"
        })
    }
};

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        };

        const body = req.body;
        const user = await UserModel.findOne({ email: body.email });

        if (!user) {
            return res.status(404).json({
                message: "Невереный логин или пароль"
            })
        };

        const isValidPassword = await bcrypt.compare(body.password, user.passwordHash);

        if (!isValidPassword) {
            return res.status(404).json({
                message: "Невереный логин или пароль"
            })
        };

        const token = jwt.sign({ _id: user._id }, "secret123", { expiresIn: "2d" });

        const { passwordHash, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (err) {
        console.log(err);
    }
};

export const authMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден либо ссылка устарела"
            })
        };

        const { passwordHash, ...userData } = user._doc;

        res.json({ ...userData });
    } catch (err) {
        console.log(err);
        res.status(403).json({
            message: "Нет доступа"
        })
    }
};

export const home = (req, res) => {
    res.status(200).send("Hello World");
}
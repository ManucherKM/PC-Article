import { body } from "express-validator";

export const registerValidation = [
    body("email", "Неверная почта").isEmail(),
    body("password", "Неверный пароль").isLength({ min: 8, max: 40 }),
    body("fullName", "Неверно указано имя").isLength({ min: 3, max: 40 }),
    body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];
export const loginValidation = [
    body("email", "Неверная почта").isEmail(),
    body("password", "Неверный пароль").isLength({ min: 8, max: 40 }),
    body("fullName", "Неверно указано имя").isLength({ min: 3, max: 40 }),
];
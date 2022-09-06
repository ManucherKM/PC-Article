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
export const postCreateValidation = [
    body("title", "Некорректный заголовок").isLength({ min: 5 }).isString(),
    body("text", "Неверный пароль").isLength({ min: 10 }).isString(),
    body("tags", "Неверный формат тегов (укажите массив)").optional().isString(),
    body("photoUrl", "Неверная ссылка на изображение").optional().isString(),
];
import PostModel from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const body = req.body

        const doc = new PostModel({
            title: body.title,
            text: body.text,
            author: req.userId,
            imageUrl: body.imageUrl,
            viewsCount: body.viewsCount,
            tags: body.tags
        });

        const post = await doc.save();

        res.json(post)

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Не удалось создать пост"
        })
    };
};

export const updatePost = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Не удалось обновить пост"
        })
    };
};

export const deletePost = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Не удалось удалить пост"
        })
    };
};

export const getPost = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Не удалось обновить пост"
        })
    };
};

export const getOnePost = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Не удалось обновить пост"
        })
    };
};
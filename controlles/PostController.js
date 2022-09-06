import PostModel from "../models/Post.js";

export const create = async (req, res) => {
    try {
        const body = req.body

        const doc = new PostModel({
            title: body.title,
            text: body.text,
            author: body.userId,
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
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
        const postId = req.params.id;

        const body = req.body;

        await PostModel.updateOne(
            {
                _id: postId
            },
            {
                title: body.title,
                text: body.text,
                author: req.userId,
                imageUrl: body.imageUrl,
                tags: body.tags
            }
        )

        res.status(200).json({
            message: "Пост обновлен"
        })
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Не удалось обновить пост"
        })
    };
};

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findByIdAndDelete(
            {
                _id: postId
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: "Не удалось удалить пост"
                    })
                };

                if (!doc) {
                    res.status(400).json({
                        message: "Пост не найден"
                    })
                };

                res.json({
                    message: "Пост удален"
                })
            }
        )

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Не удалось удалить пост"
        })
    };
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("author").exec();
        res.json(posts)
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Не удалось получить посты"
        })
    };
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate(
            {
                _id: postId
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: "after"
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Не удалось получить статью"
                    })
                };

                if (!doc) {
                    return res.status(400).json({
                        message: "Статья не найдена"
                    })
                };

                res.json(doc)
            }
        )
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Не получить пост"
        })
    };
};
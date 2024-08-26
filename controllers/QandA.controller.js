import * as model from "../models/QandA.model.js";

export async function createPost(req, res) {
    try {
        const { file, body } = req;
        if (file) {
            body.image_file = file.filename;
        }
        await model.createPost(body);
        res.status(200).send({ status: 200, message: "success"}).end();
    } catch (e) {
        if (e instanceof Error) {
            const message = e.message;
            const stack = e.stack;
            res.status(500).send({ status: 500, message: "internal server error", error: { message, stack } }).end();
        } else {
            res.status(200).send(e).end();
        }
    }
}

export async function getPost(req, res) {
    try {
        const result = await model.getPost();
        res.status(200).send({ status: 200, message: "success", result }).end();
    } catch (e) {
        if (e instanceof Error) {
            const message = e.message;
            const stack = e.stack;
            res.status(500).send({ status: 500, message: "internal server error", error: { message, stack } }).end();
        } else {
            res.status(200).send(e).end();
        }
    }
}

export async function getPostById(req, res) {
    try {
        const resultPost = await model.getPostById(req.params.id);
        const resultComent = await model.getComentById(req.params.id);
        res.status(200).send({ status: 200, message: "success", resultPost, resultComent }).end();
    } catch (e) {
        if (e instanceof Error) {
            const message = e.message;
            const stack = e.stack;
            res.status(500).send({ status: 500, message: "internal server error", error: { message, stack } }).end();
        } else {
            res.status(200).send(e).end();
        }
    }
}

export async function createComent(req, res) {
    try {
        const result = await model.createComent(req.body);
        await model.updateNumAnswers(req.body.question_id);
        res.status(200).send({ status: 200, message: "success" }).end();
    } catch (e) {
        if (e instanceof Error) {
            const message = e.message;
            const stack = e.stack;
            res.status(500).send({ status: 500, message: "internal server error", error: { message, stack } }).end();
        } else {
            res.status(200).send(e).end();
        }
    }
}
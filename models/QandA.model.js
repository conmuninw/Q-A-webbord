import * as collection from './schemas/all.schema.js';

export async function createPost(data) {
    try {
        const queryData = {
            question: data.question,
            detail: data.detail,
            questioner: data.questioner,
            image_file: data.image_file,
            created_at: new Date(),
            updated_at: new Date()
        }
        const result = await collection.question.create(queryData);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function getPost() {
    try {
        const result = await collection.question.find().sort({ create_at: -1 });
        return result;
    } catch (e) {
        throw e;
    }
}

export async function getPostById(id) {
    try {
        const queryData = {
            _id: id
        }
        const result = await collection.question.findOne(queryData);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function createComent(data) {
    try {
        const queryData = {
            question_id: data.question_id,
            answer: data.answer,
            answerer: data.answerer,
            created_at: new Date(),
            updated_at: new Date()
        }
        const result = await collection.answer.create(queryData);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function getComentById(id) {
    try {
        const queryData = {
            question_id: id
        }
        const result = await collection.answer.find(queryData);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function updateNumAnswers(id) {
    try {
        const queryData = {
            _id: id
        }
        const updateData = {
            $inc: { num_answers: 1 }
        }
        const result = await collection.question.findOneAndUpdate(queryData, updateData);
        return result;
    } catch (e) {
        throw e;
    }
}
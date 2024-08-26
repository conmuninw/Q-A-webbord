import { default as mongoose, Schema } from 'mongoose';

const structure = new Schema(
    {
        question_id: { type: mongoose.Types.ObjectId, required: true },
        answer: { type: String, required: true },
        answerer: { type: String, required: true },
        create_at: { type: Date, default: Date.now },
        update_at: { type: Date, default: Date.now }
    },
    { collection: 'answer' }
);

export default mongoose.model('answer', structure);
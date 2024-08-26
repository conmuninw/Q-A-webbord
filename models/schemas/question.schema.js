import { default as mongoose, Schema } from 'mongoose';

const structure = new Schema(
    {
        question: { type: String, required: true },
        detail: { type: String, required: true },
        questioner: { type: String, required: true },
        num_answers: { type: Number, default: 0 },
        image_file: { type: String },
        create_at: { type: Date, default: Date.now },
        update_at: { type: Date, default: Date.now }
    },
    { collection: 'question' }
);
export default mongoose.model('question', structure);
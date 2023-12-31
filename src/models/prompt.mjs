import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        require: [true, 'Prompt is required'],
    },
    tag: {
        type: String,
        require: [true, 'Tag is required'],
    },
})

PromptSchema.index({ prompt: 'text', tag: 'text' });

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tenant: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Notes = mongoose.model("Notes", noteSchema);
export default Notes;

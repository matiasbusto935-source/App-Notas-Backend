import mongoose from "mongoose";

const noteSchemas = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })//timestamps: true hace que nos diga la hora en la cual fue creada la nota y la hora en la cual fue actualizada

const Note = mongoose.model("Note", noteSchemas)

export default Note;
import express from "express";
import  Note  from "../models/noteModels.js";
const router = express.Router();

//Obtenemos todas las notas
router.get("/", async (request, response) => {
    try{
        //Traemos todas las notas de la base de datos
        const notes = await Note.find();
        response.status(200).json(notes)
    }catch (error){
        console.error("Error al obtener las notas:", error);
        response.status(500).json({ error: " Internal server error"})
    }
});

//Obtener todas las notas por ID
router.get("/:id", async (request, response) => {
    try {
        //Traemos la nota por ID de la base de datos
        const id = request.params.id;
        const note = await Note.findById(id);

    if (!note) return response.status(404).json({ error: "Nota no encontrada" });

    response.status(200).json(note);
    }catch (error) {
        console.error("Error al obtener una nota por ID:", error);
        response.status(500).json({ error: " Internal server error"})
    }
});

//Crear nueva nota
router.post("/", async(request,response)=> {
    try {
        //Creando una nueva nota
        const {title, description} = request.body;
        const note = new Note({title, description})
        //Guardando la nota en la base de datos
        const savedNote = await note.save();
        if (savedNote){
            response.status(201).json({ message: "Nota creada correctamente", note: savedNote})
        }
    }catch (error) {
        console.error("Error al crear la nota:", error);
        response.status(500).json({ error: " Internal server error"})
    }
})

//Eliminar una nota
router.delete("/:id", async(request, response) => {
    try {
        //Eliminando una nota por ID
        const id = request.params.id;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) return response.status(404).json({ error: "Nota no eliminada" });
        response.status(200).json({ message: "Nota eliminada correctamente" });
    }catch (error) {
        console.error("Error al eliminar una nota:", error);
        response.status(500).json({ error: " Internal server error"})
    }

});

//Editar una nota
router.put("/:id", async (request, response) => {
    try {
        //Editando una nota por ID
    const id =request.params.id;
    const {title,description} = request.body
    const updatedNote = await Note.findByIdAndUpdate(id, {title, description}, { new: true })
    // el new: true hace que nos devuelva la nota actualizada y no la anterior
    if (!updatedNote) return response.status(404).json({ error: "Nota no actualizada correctamente" });
    response.status(200).json({ message: "Nota actualizada correctamente", note: updatedNote });
    }catch (error) {
        console.error("Error al eliminar una nota:", error);
        response.status(500).json({ error: " Internal server error"})
    }
    
})
export default router;
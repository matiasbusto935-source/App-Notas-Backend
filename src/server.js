import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();

// Permite peticiones desde el frontend
app.use(cors({
    origin: [
        'http://localhost:5173',
        "https://venerable-otter-84e478.netlify.app"
    ],
}));

app.use(express.json());

app.use("/api/notas", notesRoutes)

const PORT = process.env.PORT || 3001;

connectDB()

.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor levantado en el puerto http://localhost:${PORT}`);
    })
});





import dotenv from "dotenv"
dotenv.config();

import express from "express";
import { connectDB } from "./config/db.js";
import admin from "./routes/admin.routes.js";
import productos from "./routes/productos.routes.js";
import cors from "cors"

const app = express();

connectDB();

app.use(cors())
app.use(express.json())

app.use('/api', admin)
app.use('/api/productos', productos);

app.use((err, req, res, next) => {
    console.error('Middleware error handler:', err);
    res.status(500).json({ error: err.message || 'Error desconocido en el servidor' });
});


app.listen(4000, () =>{
    console.log('servicio corriendo en el puerto 4000');
    
})
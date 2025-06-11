import mongoose from "mongoose";

const ProductosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    imagen: {
        type: String, 
        required: true
    },
    public_id: { 
        type: String
    },
    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String, 
        required: true
    }
},{versionKey: false})

const Producto = mongoose.model('Producto', ProductosSchema)
export default Producto
import mongoose from "mongoose";

const ProductosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    imagen: {
        type: String
    },
    tipo: {
        type: String,
        require: true
    },
    descripcion: {
        type: String, 
        require: true
    }
},{versionKey: false})

const Producto = mongoose.model('Producto', ProductosSchema)
export default Producto
import Productos from '../models/productos.model.js';

export async function crearProducto(req, res) {
    try {
        const { nombre, descripcion, tipo } = req.body;
        const imagen = req.file ? req.file.filename : '';

        const nuevo = new Productos({
            nombre,
            descripcion,
            tipo,
            imagen
    });
    await nuevo.save();
    res.send('Producto creado correctamente');
} catch (error) {
    console.log(error.message);
    res.status(500).send('Error al crear producto');
}
}

export async function obtenerProductos(req, res) {
    try {
        const productos = await Productos.find();
        const productosUrl = productos.map(producto => ({
            ...producto._doc,
            imagen: `http://localhost:4000/uploads/${producto.imagen.replace(/^uploads\//, '')}`
        }))
        res.json(productosUrl);
} catch (error) {
    res.status(500).send('Error al obtener productos');
}
}

export async function actualizar (req, res) {
    try {
        const data = req.body;
        const { id } = req.params
        
        const buscarProducto = await Productos.findById({_id:id})
        if (!buscarProducto) return res.send('El producto no existe')
        
        const actualizar = await Productos.findByIdAndUpdate(id, data);
        res.status(201).json({ok:true, actualizar})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error:'Error al actualizar el producto, comuniquese con el admin'})
    }
}

export async function borrarProducto(req, res) {
    const { id } = req.params
    try {
        const buscarProducto = await Productos.findById({_id:id})
        if (!buscarProducto) return res.send('Producto no encontrado');

        const borrarProducto = await Productos.findByIdAndDelete({_id: id})
        res.status(201).json({ok:true, borrarProducto})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Error al borrar el producto, comunicate con el Admin"})
    }
}

export async function obtenerporTipo (req, res) {
    try {
        const { tipo } = req.params; 

        const validarTipo = ["cuadernos", "retratos", "accesorios", "extra"];
        if (!validarTipo.includes(tipo)) {
            return res.status(400).json({ message: "Tipo de producto no válido" });
        }
        const productos = await Productos.find({ tipo }); // Filtra por tipo
        res.json(productos);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error al obtener productos", error });
    }
}

export async function obtenerImagenes(req, res) {
    try {
        const productos = await Productos.find({}, 'imagen');
        const imagenes = productos.map(p => `${req.protocol}://${req.get('host')}/uploads/${p.imagen}`);
        
        res.status(200).json({imagenes})
    } catch (error) {
        console.log('Error al obtener las imagenes');
        res.status(500).json({mensaje: 'Error en el servidor' })
        
    }
    
}
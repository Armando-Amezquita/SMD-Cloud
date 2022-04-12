const product = require('../models/Product');

const createProduct = async(req, res) => {
    try {
        const {name, category, price, img} = req.body;
        const newProduct = new product({name, category, price, img});
        const productSave = await newProduct.save();
        res.status(201).json(productSave);
    } catch (error) {
        console.error(`Ocurrio un error`, error);
    }
}
const getProducts = async(req, res) => {
    try {
        const products = await product.find();
        products.length > 0 ? res.json(products) : res.json(`No hay productos que mostrar.`);  
    } catch (error) {
        console.error(`Ocurrio un error ${error}`);
    }
}
const getProductById = async(req, res) => {
    try {
        const { productId } = req.params;
        const productid = await product.findById( productId );
        // const productid = await product.findById(req.params.productId);
        productid ? res.json(productid) : res.json('No se encontro un producto con ese ID');
    } catch (error) {
        console.error(`Ocurrion un error ${error}`);
    }
}
const updateProductById = async(req, res) => {
    try {
        const { productId } = req.params;
        const productUpdate = await product.findByIdAndUpdate(productId, req.body, { new: true });
        productUpdate ? res.json(productUpdate) : res.json('No se encontro un producto con ese ID');
    } catch (error) {
        console.error(`Ocurrion un error ${error}`);
    }
}
const deleteProductById = async(req, res) => {
    try {
        const { productId } = req.params;
        const productDelete = await product.findByIdAndDelete(productId);
        productDelete ? res.json(productDelete) : res.json('No se encontro un producto con ese ID');
    } catch (error) {
        console.error(`Ocurrion un error ${error}`);
    }
}

module.exports = {
    createProduct, 
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
}
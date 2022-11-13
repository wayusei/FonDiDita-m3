const sequelize = require('../config/db');

/**
 * Obtiene una lista de productos
 * @param {*} req 
 * @param {*} res 
 */
async function getProducts(req, res) {
    return await sequelize.models.products.findAndCountAll()
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Error', data: err}))
}

/**
 * Obtiene un producto mediante un id
 * @param {*} req 
 * @param {*} res 
 */
async function getProduct(req, res) {
    const id = req.params.id;
    const product = await sequelize.models.products.findOne({where: {id}});
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json({ data: product });
}

/**
 * Se crea un producto y lo guarda en la bd
 * @param {*} req 
 * @param {*} res 
 */
async function createProduct(req, res) {
    const { body } = req;
    const category = await sequelize.models.categories.findOne({
        where: {id: body.category}
    });
    const seller_id = await sequelize.models.sellers.findOne({
        where: {id: body.seller_id}
    })
    if (!category) {
        return res.status(404).json({ message: 'No se encontro el ID de category'});
    }
    if (!seller_id) {
        return res.status(404).json({ message: 'No se encontro el ID de seller_id'});
    }
    if (body.name=="" || body.price=="" || body.description=="" || body.image=="" || body.thumbnail=="" || body.category=="" || body.seller_id=="") {
        return res.json({message: 'Por favor llene todos los campos'});
    }
    const product = await sequelize.models.products.create({
        name: body.name,
        price: body.price,
        description: body.description,
        image: body.image,
        thumbnail: body.thumbnail,
        category: body.category,
        seller_id: body.seller_id
    });
    await product.save();
    return res.status(201).json({ data: product })
}

/**
 * Función que nos permite actualizar la información de un producto
 * @param {*} req 
 * @param {*} res 
 */
async function updateProduct(req, res) {
    const { body, params: {id} } = req;
    const product = await sequelize.models.products.findOne({where: {id}});
    const category = await sequelize.models.categories.findOne({where: {id: body.category}});
    const seller_id = await sequelize.models.sellers.findOne({where: {id: body.seller_id}})
    if (!product) {
        return res.status(404).json({ code:404, message: 'Producto no encontrado' });
    }
    if (!category) {
        return res.status(404).json({ message: 'No se encontro el ID de category'});
    }
    if (!seller_id) {
        return res.status(404).json({ message: 'No se encontro el ID de seller_id'});
    }
    const updateProduct = await product.update({
        name: body.name,
        price: body.price,
        description: body.description,
        image: body.image,
        thumbnail: body.thumbnail,
        category: body.category,
        seller_id: body.seller_id
    });
    return res.status(200).json({ data: updateProduct });
}

/**
 * Función que nos permite eliminar un producto por id
 * @param {*} req 
 * @param {*} res 
 */
async function deleteProduct(req, res) {
    const { params:{id} } = req;
    const deleted = await sequelize.models.products.findOne({where: {id} });
    if(!deleted) {
        return res.status(404).json({ code:404, message: 'Producto no encontrado' });
    }
    await deleted.destroy();
    return res.status(200).json();
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
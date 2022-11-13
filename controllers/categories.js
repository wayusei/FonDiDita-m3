const sequelize = require('../config/db')

/**
 * Obtiene una lista de categorias
 * @param {*} req 
 * @param {*} res 
 */
async function getCategories(req, res) {
    return await sequelize.models.categories.findAndCountAll()
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Error', data: err}))
}

/**
 * Obtiene una categoria mediante un id
 * @param {*} req 
 * @param {*} res 
 */
async function getCategory(req, res) {
    const id = req.params.id;
    const category = await sequelize.models.categories.findOne({where: {id}})
    if (!category) {
        return res.status(404).json({ message: "Categoria no encontrada" })
    }
    return res.status(201).json({ data: category })
}

/**
 * Se crea una categoria y la guarda en la bd
 * @param {*} req 
 * @param {*} res 
 */
async function createCategory(req, res) {
    const { body } = req;
    const category = await sequelize.models.categories.create({
        name: body.name,
        description: body.description
    });
    await category.save();
    return res.status(201).json({ data: category })
}

/**
 * Función que nos permite actualizar la información de una categoria
 * @param {*} req 
 * @param {*} res 
 */
async function updateCategory(req, res) {
    const { body, params: { id } } = req;
    const category = await sequelize.models.categories.findByPk(id)
    if (!category) {
        return res.status(404).json({ code:404, message: 'Category not found' })
    }
    const updateCategory = await category.update({
        name: body.name,
        description: body.description
    });
    return res.json({ data: updateCategory })
}

/**
 * Función que nos permite eliminar una categoria por id
 * @param {*} req 
 * @param {*} res 
 */
async function deleteCategory(req, res) {
    const { params: {id} } = req
    const category = await sequelize.models.categories.findByPk(id)
    if (!category) {
        return res.status(404).json({ code:404, message: 'Category not found' })
    }
    await category.destroy()
    return res.json()
}

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory }
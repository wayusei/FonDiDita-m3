const sequelize = require('../config/db');

/**
 * Obtiene una lista de los estatus de orden
 * @param {*} req 
 * @param {*} res 
 */
async function getOrderStatus(req, res) {
    return await sequelize.models.order_status.findAndCountAll()
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Error', data: err}));
}

/**
 * Obtiene un estatus de orden mediante un id
 * @param {*} req 
 * @param {*} res 
 */
async function getOrderStatusById(req, res) {
    const id = req.params.id;
    const orderStatus = await sequelize.models.order_status.findOne({where: {id}});
    if (!orderStatus) {
        return res.status(404).json({ message: "Estatus de orden no encontrado" });
    }
    return res.status(200).json(orderStatus);
}

/**
 * Se crea estatus de orden y la guarda en la bd
 * @param {*} req 
 * @param {*} res 
 */
async function createOrderStatus(req, res) {
    const body = req.body;
    if (body.status==null || body.description=="") {
        return res.json({ message: 'Por favor llene todos los campos' });
    }
    const order_status = await sequelize.models.order_status.create({
        status: body.status,
        description: body.description
    });
    await order_status.save();
    return res.status(201).json({ data: order_status })
}

/**
 * Función que nos permite actualizar la información de un estatus de orden creado anteriormente
 * @param {*} req 
 * @param {*} res 
 */
async function updateOrderStatus(req, res) {
    const { body, params: { id } } = req;
    const order_status = await sequelize.models.order_status.findOne({ where: {id} });
    if (!order_status) {
        return res.status(404).json({ code:404, message: 'Estado de orden no encotrada' });
    }
    const updateStatus = await order_status.update({
        status: body.status,
        description: body.description
    });
    return res.json({ data: updateStatus });
}

/**
 * Función que nos permite eliminar un stado de order por id
 * @param {*} req 
 * @param {*} res 
 */
async function deleteOrderStatus(req, res) {
    const id = req.params.id;
    const deletedOrderStatus = await sequelize.models.order_status.destroy(
        {where: {id} }
    );
    return res.status(200).json(deletedOrderStatus);
}

module.exports = { getOrderStatus, getOrderStatusById, createOrderStatus, updateOrderStatus, deleteOrderStatus };
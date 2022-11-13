const sequelize = require('../config/db')

/**
 * Obtiene la lista de detalles de ordenes
 * @param {*} req 
 * @param {*} res 
 */
async function getOrdersDetails(req, res) {
    return await sequelize.models.Orders_Details.findAll()
        .then(data => res.json(data))
        .catch(err => res.json({message: 'Error', data: err}))
}

/**
 * Obtiene los detalles de ordenes de un producto determinado
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getOrdersDetailByProduct(req, res) {
    const id = req.params.id;
    const ordersDetailsByProduct = await sequelize.models.Orders_Details.findAll({where: {product_id: id}});
    if(!ordersDetailsByProduct){
        return res.status(404).json({message: "Producto no tiene ordenes"});
    }
    res.status(200).json(orders);    
}

/**
 * Obtiene los detalles de ordenes de una orden determinada
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 async function getOrdersDetailByOrderId(req, res) {
    const id = req.params.id;
    const ordersDetailsByOrderId = await sequelize.models.Orders_Details.findAll({where: {order_id: id}});
    if(!ordersDetailsByOrderId){
        return res.status(404).json({message: "Detalle de orden no encontrada"});
    }
    res.status(200).json(ordersDetailsByOrderId);    
}
/**
 * Obtiene detalles de una orden mediante el id de una orden
 * @param {*} req 
 * @param {*} res 
 */
async function getOrdersDetailsById(req, res) {
    const id = req.params.id;
    const orderDetail = await sequelize.models.Orders_Details.findByPk(id);
    if(!orderDetail){
        return res.status(404).json({message: "Detalle de orden no encontrada"});
    }
    res.status(200).json(orderDetail);
}

/**
 * Crea detalle de orden y la guarda en la BBDD
 * @param {*} req 
 * @param {*} res 
 */
async function createOrderDetail(req, res) {
    const { body } = req.body;
    const order_id = await sequelize.models.orders.findOne({
        where: {id: body.order_id}
    })
    const product_id = await sequelize.models.products.findOne({
        where: {id: body.product_id}
    })
    if(!order_id) { return res.status(404).json({ message: 'No se encontró el ID de orden'})}
    if(!product_id) { return res.status(404).json({ message: 'No se encontró el ID de producto'})}
    
    const orderdetail = await sequelize.models.Orders_Details.create({
        order_id: body.order_id,
        product_id: body.product_id,
        price: body.price,
        quantity: body.quantity
    })
    await orderdetail.save()
    return res.status(201).json({ data: orderdetail })
}

/**
 * Actualiza información de detalle de una orden
 * @param {*} req 
 * @param {*} res 
 */
async function updateOrderDetails(req, res) {
    const { body, params: {id} } = req
    const order_id = await sequelize.models.orders.findOne({where: {id: body.order_id}})
    const product_id = await sequelize.models.products.findOne({where: {id: body.product_id}})
    if(!order_id) { return res.status(404).json({ message: 'No se encontró el ID de orden'})}
    if(!product_id) { return res.status(404).json({ message: 'No se encontró el ID de producto'})}
    
    const orderdetailupdate = await sequelize.models.Orders_Details.update({
        order_id: body.order_id,
        product_id: body.product_id,
        price: body.price,
        quantity: body.quantity
    })
    return res.status(200).json({ data: orderdetailupdate })
}

/**
 * Elimina el detalle de una orden de la BBDD mediante una ID
 * @param {*} req 
 * @param {*} res 
 */
async function deleteOrderDetail(req, res) {
    const { params: {id} } = req
    const deletedDetail = await sequelize.models.Orders_Details.findOne({where: {id} })
    if (!deletedDetail){
        return res.status(404).json({ code: 404, message: 'Detalle de orden no encontrado' })
    }
    await deletedDetail.destroy()
    return res.status(200).json(deletedDetail)
}

module.exports = { getOrdersDetails, getOrdersDetailByProduct, getOrdersDetailByOrderId, getOrdersDetailsById, createOrderDetail, updateOrderDetails, deleteOrderDetail };
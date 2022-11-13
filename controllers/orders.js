const sequelize = require('../config/db');
const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

/**
 * Obtiene la lista de ordenes
 * @param {*} req 
 * @param {*} res 
 */
async function getOrders(req, res) {
     try{
        return await sequelize.models.orders.findAll()
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Error', data: err}))

    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Internal server error',error});
    }
}

/**
 * Obtiene las ordenes de un cliente determinado
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getOrdersByCustomer(req, res) {

     const id = req.params.id;   
    try{
        return await sequelize.models.orders.findAll({where: {customer_id: id}})
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Cliente no encontrado', data: err}))

    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Internal server error',error});
    }
}


/**
 * Obtiene una orden mediante un id
 * @param {*} req 
 * @param {*} res 
 */
async function getOrder(req, res) {
    const id = req.params.id;
    try{
        return await sequelize.models.orders.findByPk(id)
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Orden no encontrado', data: err}))

    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Internal server error',error});
    }
    
}

/**
 * Crea una orden y la guarda en la BBDD
 * @param {*} req 
 * @param {*} res 
 */
async function createOrder(req, res) {
    const body = req.body;
    let cust;
    try{
         await sequelize.models.customers.findByPk(body.customer_id)
        .then(data => cust=data)
        .catch(err => res.json({ message: 'No encontro el cliente', data: err}))
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Internal server error',error});
    }

    if (body.ammount<0|| isNaN(body.ammount))
        res.status(400).json({ message: 'El importe esta incorrecto'});
    else if (body.shipping_address.length<1)
        res.status(400).json({ message: 'Falta la dirección de envío'});
    else if (body.order_address.length<1)
        res.status(400).json({ message: 'Falta la dirección de la orden'});
    else if (body.order_email.length<1 || !validEmail.test(body.order_email))
        res.status(400).json({ message: 'El Correo electrónico está incorrecto'});
    else if (body.order_date.length!=10)
        res.status(400).json({ message: 'Fecha incorrecta'});
    else if (isNaN(body.order_status))
        res.status(400).json({ message: 'Estatus incorrecto'});
    else if(cust!=null){
        try{
            return await sequelize.models.orders.create(body)
            .then(data => res.json(data))
            .catch(err => res.json({ message: 'No se pudo crear la orden', data: err}))

        } catch(error){
            console.log(error);
            res.status(500).json({ message: 'Internal server error',error});
        }
    }
    else   
     res.status(404).json({ message: 'El cliente no existe'});   
}

/**
 * Actualiza información de una orden
 * @param {*} req 
 * @param {*} res 
 */
async function updateOrder(req, res) {
    const id = req.params.id;
    //const order = req.body;
    const body = req.body;

    let cust;
    try{
         await sequelize.models.customers.findByPk(body.customer_id)
        .then(data => cust=data)
        .catch(err => res.json({ message: 'No encontro el cliente', data: err}))
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Internal server error',error});
    }

    if (body.ammount<0|| isNaN(body.ammount))
        res.status(400).json({ message: 'El importe esta incorrecto'});
    else if (body.shipping_address.length<1)
        res.status(400).json({ message: 'Falta la dirección de envío'});
    else if (body.order_address.length<1)
        res.status(400).json({ message: 'Falta la dirección de la orden'});
    else if (body.order_email.length<1 || !validEmail.test(body.order_email))
        res.status(400).json({ message: 'El Correo electrónico está incorrecto'});
    else if (body.order_date.length!=10)
        res.status(400).json({ message: 'Fecha incorrecta'});
    else if (isNaN(body.order_status))
        res.status(400).json({ message: 'Estatus incorrecto'});
    else if(cust!=null){
        try{
            return await sequelize.models.orders.update(body,{where: {id}} )
            .then(data => res.json(data))
            .catch(err => res.json({ message: 'No se pudo crear la orden', data: err}))
    
        } catch(error){
            console.log(error);
            res.status(500).json({ message: 'Internal server error',error});
        }
    }
    else   
     res.status(404).json({ message: 'El cliente no existe'});     
}

/**
 * Elimina una orden de la BBDD mediante una ID
 * @param {*} req 
 * @param {*} res 
 */
async function deleteOrder(req, res) {
    const id = req.params.id;
    const deleted =  sequelize.models.orders.destroy(
        {where: {id} }
    );
    res.status(200).json(deleted);
}


module.exports = { getOrders, getOrder, getOrdersByCustomer, createOrder, updateOrder, deleteOrder };


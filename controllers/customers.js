const sequelize = require('../config/db');
const jwt = require('jsonwebtoken')

/**
 * Obtiene la lista de clientes
 * @param {*} req 
 * @param {*} res 
 */
async function getCustomers(req, res) {
    return await sequelize.models.customers.findAll()
        .then(data => res.json(data))
        .catch(err => res.json({message: 'Error', data: err}))
}

/**
 * Obtiene un cliente por su ID
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getCustomerbyId(req, res) {
    const id = req.params.id;
    const cus = await sequelize.models.customers.findByPk(id);   
    if(!cus){
        return res.status(404).json({message: "Cliente no encontrado"});
    }else{
        res.status(200).json(cus);
    }
}

/**
 * Crea un nuevo cliente y lo inserta a la BBDD
 * @param {*} req 
 * @param {*} res 
 */
async function insertCustomer(req, res) {
    const { body } = req.body
    const newCustomer = await sequelize.models.customers.create({
        username: body.username,
        email: body.email,
        password: body.password,
        full_name: body.full_name,
        billing_address: body.billing_address,
        default_shipping_address: body.default_shipping_address,
        phone: body.phone,
    })
    await newCustomer.save()
    return res.status(201).json({ data: newCustomer })
}

/**
 * Permite registrar a un cliente
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function signUp(req, res) {
    const { body } = req
    try{
        const cus = await sequelize.models.customers.findOne({ where: {email: body.email}})
        if(cus){
            return res.status(400).json({ message: 'Email ya registrado'})
        } else {
            if(body.username=="" || body.email=="" || body.password=="" || body.full_name=="" || body.account==""){
                return res.status(400).json({ message: 'Por favor completa los campos vacíos'})
            }
            cus = await sequelize.models.customers.create({
                username: body.username,
                email: body.email,
                password: body.password,
                full_name: body.full_name,
                account: body.account
            })
            await cus.save()
            return res.status(400).json({ data: cus, message: "Se ha creado exitosamente la cuenta de cliente"})
        }
    } catch (err) {
        if(["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name)){
            return res.status(400).json({ error: err.errors.map(e=> e.message) })
        } else { 
            throw err 
        }
    }
}
/**
 * Función que permite iniciar sesión a un cliente
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function logIn(req, res) {
    const { body } = req
    const cus =  await sequelize.models.customers.findOne({ where: {email: body['email']}})
    if(!cus){
        return res.status(404).json({error: "Cliente no encontrado"})
    }
    if(!cus.validPassword(body['password'])){
        return res.status(401).json({ message: 'Password incorrecto!'})
    }
    const token = jwt.sign({ customerId: cus.id }, 'secretKey', { expiresIn: 3600})
    
    return res.status(200).json({ message: "Ha ingresado correctamente!", token })
}

/**
 * Función que elimina un cliente
 */
async function deleteCustomer(req, res) {
    const id = req.params.id;
    const deleted = await sequelize.models.customers.destroy(
        {where: {id} }
    )
    if(!deleted) {
        return res.status(404).json({ error: "Cliente no encontrado" })
    }
    return res.status(200).json({"message":"Cliente eliminado exitosamente", deleted})
}

module.exports = {
    getCustomers,
    getCustomerbyId,
    insertCustomer,
    signUp,
    logIn,
    deleteCustomer,
}
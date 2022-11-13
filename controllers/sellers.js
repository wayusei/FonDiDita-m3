const sequelize = require('../config/db')
const jwt = require('jsonwebtoken')

/**
 * Obtiene la lista de sellers registrados en la BBDD, solo muestra algunos datos.
 * @param {*} req 
 * @param {*} res 
 */
async function getSellers(req, res) {
    try {
        const sellers = await sequelize.models.sellers.findAll()
        const array = []
        sellers.map(seller => {
            array.push({
                id: seller.id,
                username: seller.username,
                email: seller.email,
                full_name: seller.full_name
            })
        })
        return res.status(200).json(array)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', error })
    }
}

/**
 * Obtiene un seller mediante un ID.
 * @param {*} req 
 * @param {*} res 
 */
async function getSeller(req, res) {
    const id = req.params.id
    const seller = await sequelize.models.sellers.findOne({where: {id}})
    if (!seller) {
        return res.status(404).json({ message: "Seller no encontrado" })
    }
    const dataSeller = {
        id: seller.id,
        username: seller.username,
        email: seller.email,
        full_name: seller.full_name
    }
    return res.status(200).json({ data:dataSeller })
}

/**
 * Crea un seller y lo guarda en la BBDD
 * @param {*} req 
 * @param {*} res 
 */
async function createSeller(req, res) {
    const { body } = req
    const seller = await sequelize.models.sellers.create({
        username: body.username,
        email: body.email,
        password: body.password,
        full_name: body.full_name,
        account: body.account
    })
    await seller.save()
    return res.status(201).json({ data: seller, message: 'seller creado exitosamene.' })
}

/**
 * Permite registrar a un seller
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function signUpSeller(req, res) {
    const { body } = req
    try { 
        let seller = await sequelize.models.sellers.findOne({where:{email: body.email}})
        if(seller){
            return res.status(400).json({ message: 'Email ya registrado'})
        } else {
            if (body.username=="" || body.email=="" || body.password=="" || body.full_name=="" || body.account=="") {
                return res.status(400).json({ message: 'Por favor completa los campos vacios'})
            }
            seller = await sequelize.models.sellers.create({
                username: body.username,
                email: body.email,
                password: body.password,
                full_name: body.full_name,
                account: body.account
            })
            await seller.save()
            return res.status(400).json({ data: seller, message:"Se ha creado la cuenta de seller exitosamente." })
        }
    } catch (err) {
        if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name) ) {
            return res.status(400).json({
                error: err.errors.map(e => e.message)
            })
        }
        else {
            throw err
        }
    }
}

/**
 * Función que permite iniciar sesión a un seller.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function logInSeller(req, res) {
    const body = req.body
    const seller = await sequelize.models.sellers.findOne({where: {email: body['email']}})
    if (!seller) {
        return res.status(404).json({error: "User not found"})
    }
    if (!seller.validPassword(body['password'])) {
        return res.status(401).json({ message: 'Datos incorrectos!'})
    }
    const token = jwt.sign({ sellerId: seller.id }, 'secretKey', {
        expiresIn: 3600
    })
    return res.status(200).json({mensaje: "Ha ingresado correctamente!", token})
}

/**
 * Función que elimina un seller
 */
async function deleteSeller(req, res) {
    const id = req.params.id
    const seller = await sequelize.models.sellers.destroy({ where: {id} })
    if (!seller) {
        return res.status(404).json({error: "Seller no encontrado para eliminar"})
    }
    return res.status(200).json(seller)
}

module.exports = { getSellers, getSeller, createSeller, signUpSeller, logInSeller, deleteSeller }
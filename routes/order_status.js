const router = require('express').Router()
const { getOrderStatus, getOrderStatusById } = require('../controllers/order_status')

/**
 * @openapi
 * '/order_status':
 *  get:
 *     tags:
 *     - Order Status
 *     summary: Obtiene la lista de estatus de órdenes.
 *     description: Obtiene la lista de estatus de órdenes existentes en la BBDD.
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Se obtuvo la lista de estatus de órdenes exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                      id:
 *                          type: number
 *                      status:
 *                          type: number
 *                      description:
 *                          type: string
 * 
 *      500:
 *        description: Internal server error.
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 *                 error:
 *                  type: string
 */
router.get('/', getOrderStatus)

/**
 * @openapi
 * '/order_status/{id}':
 *  get:
 *     tags:
 *     - Order Status
 *     summary: Obtiene el estatus de una orden mediante su ID.
 *     description: Obtiene el estatus de orden existente en la BBDD mediante su ID.
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Se obtuvo el estatus de orden exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                      id:
 *                          type: number
 *                      status:
 *                          type: number
 *                      description:
 *                          type: string
 *                  
 *      500:
 *        description: Internal server error.
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 *                 error:
 *                  type: string
 */
 router.get('/:id', getOrderStatusById)

module.exports = router
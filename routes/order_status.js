const router = require('express').Router();
const { getOrderStatus, getOrderStatusById, updateOrderStatus,deleteOrderStatus } = require('../controllers/order_status')

/**
 * @openapi
 * '/order_status':
 *  get:
 *     tags:
 *     - Order Status
 *     summary: Obtiene la lista de estatus de ordenes.
 *     description: Obtiene la lista de estatus de ordenes existentes en la BD.
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Se obtuvo la lista de estatus de ordenes exitosamente
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
 *        description: Internal server error
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 *                 error:
 *                  type: string
 */
router.get('/', getOrderStatus);

/**
 * @openapi
 * '/order_status/{id}':
 *  get:
 *     tags:
 *     - Order Status
 *     summary: Obtiene el estatus de una orden mediante su id.
 *     description: Obtiene el estatus de orden existente en la BD mediante su id.
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Se obtuvo el estatus de orden exitosamente
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
 *        description: Internal server error
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 *                 error:
 *                  type: string
 */
 router.get('/:id', getOrderStatusById);

module.exports = router;
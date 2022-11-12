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

/**
 * @openapi
 * '/order_status/{id}':
 *  patch:
 *     tags:
 *     - Order Status
 *     summary: Actualiza un estatus de orden existente.
 *     description: Actualiza los detalles de un estatus de orden en la BBDD. 
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Parametro en el path para actualizar la información de un estatus de orden en la BBDD.
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      -id
 *                      -status
 *                      -description
 *              properties:
 *                      id:
 *                          type: number
 *                      status:
 *                          type: number
 *                      description:
 *                          type: string    
 *     responses:
 *      200:
 *        description: Se actualizó el estatus de orden exitosamente.
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
router.patch('/:id', updateOrderStatus);

module.exports = router;
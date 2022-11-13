const router = require('express').Router()
const { getSellers, signUpSeller, logInSeller } = require('../controllers/sellers')

/**
 * @openapi
 * '/sellers':
 *  get:
 *     tags:
 *     - Sellers
 *     summary: Obtiene la lista de vendedores.
 *     description: Obtiene la lista de vendedores existentes en la BBDD.
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Se obtuvo la lista de los vendedores exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id:
 *                    type: number
 *                    example: 1
 *                  username:
 *                    type: string
 *                    example: gonzalo
 *                  email:
 *                    type: string
 *                    example: gonzalo@gmail.com
 *                  full_name:
 *                    type: string
 *                    example: Gonzalo Perez
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
 *                   type: string
 */
router.get('/', getSellers)

/**
 * @openapi
 * '/sellers/signUpSeller':
 *  post:
 *     tags:
 *     - Sellers
 *     summary: Registra un vendedor.
 *     description: Registra un vendedor en la BBDD.
 *     requestBody:
 *      required: true
 *      content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - id
 *                      - username
 *                      - email
 *                      - password
 *                      - full_name
 *                      - account
 *                  properties:
 *                      id:
 *                          type: integer
 *                          example: 8
 *                      username:
 *                          type: string
 *                          example: armando
 *                      email:
 *                          type: string
 *                          example: armando@gmail.com
 *                      password:
 *                          type: string
 *                          example: password8
 *                      full_name:
 *                          type: string
 *                          example: Armando Sanchez
 *                      account:
 *                          type: string
 *                          example: account8
 *     responses:
 *      200:
 *        description: Se registró al vendedor exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                      id:
 *                          type: integer
 *                          example: 8
 *                      username:
 *                          type: string
 *                          example: armando
 *                      email:
 *                          type: string
 *                          example: armando@gmail.com
 *                      full_name:
 *                          type: string
 *                          example: Armando Sanchez
 *                      password:
 *                          type: string
 *                          example: 484849x48a4449c4c9z949x4sxsxs94
 *                      account:
 *                          type: string
 *                          example: account8
 * 
 *      400:
 *        description: Bad Request.
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 *                   example: ID en existencia, use otro
 */
router.post('/signUpSeller', signUpSeller)

/**
 * @openapi
 * '/sellers/logInSeller':
 *  post:
 *     tags:
 *     - Sellers
 *     summary: Login del vendedor.
 *     description: Inicio de sesión de un vendedor.
 *     requestBody:
 *      required: true
 *      content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - email
 *                      - password
 *                  properties:
 *                      email:
 *                          type: string
 *                          example: armando@correo.com
 *                      password:
 *                          type: string
 *                          example: password8
 *     responses:
 *      200:
 *        description: Inicio de sesión exitoso.
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                      user:
 *                          type: string
 *                          example: armando
 *                      email:
 *                          type: string
 *                          example: armando@gmail.com
 *                      token:
 *                          type: string
 *                          example: 5a4sa5s4a4s.as5as4a4s.dsds5454
 * 
 *      400:
 *        description: Bad request.
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 *                   example: Password Incorrecto
 * 
 *      404:
 *        description: User not Found.
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 */
router.post('/logInSeller', logInSeller)

module.exports = router
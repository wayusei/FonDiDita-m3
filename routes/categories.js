const router = require('express').Router()
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categories')
const {authenticateSeller} = require('../middlewares/authentication')

/**
 * @openapi
 * '/categories':
 *  get:
 *     tags:
 *     - Categories
 *     summary: Obtiene una lista de categorias.
 *     description: Obtiene una lista de categorias existentes en la BBDD.
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Se obtuvo la lista de categorias exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id:
 *                    type: number
 *                    example: 1
 *                  name:
 *                    type: string
 *                    example: entradas
 *                  description:
 *                    type: string
 *                    example: pueden ser sopas, ensaladas
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
router.get('/', getCategories)

/**
 * @openapi
 * '/categories/{id}':
 *  get:
 *     tags:
 *     - Categories
 *     summary: Obtiene una categoria por id.
 *     description: Obtiene una categoria por id de la BBDD.
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID en el path para obtener una categoria.
 *     responses:
 *      200:
 *        description: Se obtuvo la categoria exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  id:
 *                    type: number
 *                    example: 1
 *                  name:
 *                    type: string
 *                    example: entradas
 *                  description:
 *                    type: string
 *                    example: pueden ser sopas, ensaladas
 * 
 *      404:
 *        description: Categoria no encontrada
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 *                   example: Categoria no encontrada
 */
router.get('/:id', getCategory)

/**
 * @openapi
 * '/categories':
 *  post:
 *     tags:
 *     - Categories
 *     summary: Crea una categoria.
 *     description: Crea una nueva categoria y la agrega a la BBDD.
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                          example: 18
 *                      name:
 *                          type: string
 *                          example: Aceitunas
 *                      description:
 *                          type: string
 *                          example: Aceitunas de la mejor calidad
 * 
 *     responses:
 *      201:
 *        description: Se creó la categoria exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *                  properties:
 *                      id:
 *                          type: integer
 *                          example: 18
 *                      name:
 *                          type: string
 *                          example: Aceitunas
 *                      description:
 *                          type: string
 *                          example: Aceitunas de la mejor calidad
 * 
 *      500:
 *        description: Error al crear la categoria.
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 */
router.post('/', authenticateSeller, createCategory)

/**
 * @openapi
 * '/categories/{id}':
 *  patch:
 *     tags:
 *     - Categories
 *     summary: Actualiza una categoria.
 *     description: Actualiza la información de una categoria en la BBDD.
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Id en el path para actualizar una categoria.
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                          example: 18
 *                      name:
 *                          type: string
 *                          example: Aceitunas
 *                      description:
 *                          type: string
 *                          example: Aceitunas de la mejor calidad
 * 
 *     responses:
 *      200:
 *        description: Se actualizó la categoria exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *                  properties:
 *                      id:
 *                          type: integer
 *                          example: 18
 *                      name:
 *                          type: string
 *                          example: Aceitunas
 *                      description:
 *                          type: string
 *                          example: Aceitunas de la mejor calidad
 * 
 *      500:
 *        description: Error al actualizar la categoria.
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 */
router.patch('/:id', authenticateSeller, updateCategory)

/**
 * @openapi
 * '/categories/{id}':
 *  delete:
 *     tags:
 *     - Categories
 *     summary: Elimina una categoria por id.
 *     description: Elimina una categoria de la BBDD.
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Parametro en el path para eliminar una categoria.
 *     requestBody:
 *        required: false
 *     responses:
 *      200:
 *        description: Se eliminó el producto exitosamente.
 *        content:
 *          application/json:
 *            schema:
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Se elimino la categoria
 * 
 *      500:
 *        description: Error al eliminar la categoria.
 *        content:
 *          application/json:
 *           schema:
 *              properties:
 *                 message:
 *                   type: string
 */
router.delete('/:id', authenticateSeller, deleteCategory)

module.exports = router
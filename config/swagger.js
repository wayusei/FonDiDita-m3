const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Fondidita-m3 API",
            version: "1.0.0",
            description:
                "Esta es una CRUD API para la Fase 3 del curso de Desarrollo Web Fullstack Santander - Bedu. \n\n Este ejercicio simula la esctructura de una aplicación de venta de comida. Se definieron las estructuras: **Customers, Products, Sellers, Orders** y las funciones que permiten agregar y borrar datos. \n\n Integrantes \n\n * [Sergio Monterrubio](https://github.com/sergiomm84) \n\n * [Angel Pimentel](https://github.com/angel-pm) \n\n * [Rodrigo Rosas](https://github.com/wayusei/) \n\n  * [Julio Alberto Hernández](https://github.com/albertohgj/) \n\nEnlaces: \n\n * [Repositorio GitHub](https://github.com/wayusei/FonDiDita-m3) \n\n * [Servidor en Railway](https://fondidita-m3-production.up.railway.app/)",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security: [
            {
              bearerAuth: []
            },
          ],
    },
    server: "https://fondidita-m3-production.up.railway.app:3000/",
    apis: ["./routes/*.js"]
}
module.exports = options
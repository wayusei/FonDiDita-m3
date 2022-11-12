require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sequelize = require('./config/db');
const routes = require('./routes/index');

const swaggerOptions = require('./config/swagger');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI =require('swagger-ui-express');

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (request, response) => {
    response.send('<h1>API Equipo 13</h1>')
})

app.use('/', routes);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

try {
    sequelize.authenticate();
    sequelize.sync();
    console.log('Connected to DB');
} catch (error) {
    console.log('Unable to connect to DB', error);
}

app.listen(process.env.PORT || 3000, () => {
    console.log("Server listing on PORT", process.env.PORT);
});
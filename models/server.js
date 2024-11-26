import express, { json } from 'express';
import dbConnection from '../database/config.js';
import cors from 'cors'; // Importa cors

import categoriaRouter from '../routes/categoriaRoute.js';
import comprobanteRouter from '../routes/comprobanteRoute.js';
import inicioSesionRouter from '../routes/inicioSesionRoute.js';
import insumoRouter from '../routes/insumoRoute.js';
import movimientoRouter from '../routes/movimientoRouter.js';
import registroRouter from '../routes/registroRoute.js';
import unidadMedidaRouter from '../routes/unidadMedidaRouter.js';

class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.dbConnection();

        // Paths base
        this.pathInsumos = "/api/insumos";

        // Middlewares
        this.middlewares();

        // Rutas
        this.route();
    }

    middlewares() {
        // Middleware para JSON
        this.app.use(json());

        // Middleware para habilitar CORS
        this.app.use(cors()); // Aquí habilitas CORS
    }

    route() {
        this.app.use(this.pathInsumos, categoriaRouter);
        this.app.use(this.pathInsumos, comprobanteRouter);
        this.app.use(this.pathInsumos, inicioSesionRouter);
        this.app.use(this.pathInsumos, registroRouter);
        this.app.use(this.pathInsumos, insumoRouter);
        this.app.use(this.pathInsumos, movimientoRouter);
        this.app.use(this.pathInsumos, unidadMedidaRouter);
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }

    async dbConnection() {
        await dbConnection();
    }
}

export default Server;

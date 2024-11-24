import express, { json } from 'express'
import dbConnection from '../database/config.js'
import { getCategorias, getCategoriaById, postCategoria, deleteCategoria, putCategoria} from '../controllers/categoriaController.js'
import { getComprobantes, getComprobanteById, postComprobante, deleteComprobante, putComprobante } from '../controllers/comprobanteController.js'
import { getInsumos, getInsumoById, postInsumo, deleteInsumo, putInsumo } from '../controllers/insumoController.js'
import { getMovimientos, getMovimientoById, postMovimiento, deleteMovimiento, putMovimiento } from '../controllers/movimientoController.js'
import { getUnidadesMedida, getUnidadMedidaById, postUnidadMedida, deleteUnidadMedida, putUnidadMedida } from '../controllers/unidadMedidaController.js'
import { iniciarSesion } from '../controllers/inicioSesionController.js'
import { postUsuario, getUsuarios, getUsuarioById, deleteUsuario, putUsuario } from '../controllers/registroController.js'

import categoriaRouter from '../routes/categoriaRoute.js'
import comprobanteRouter from '../routes/comprobanteRoute.js'
import inicioSesionRouter from '../routes/inicioSesionRoute.js'
import insumoRouter from '../routes/insumoRoute.js'
import movimientoRouter from '../routes/movimientoRouter.js'
import registroRouter from '../routes/registroRoute.js'
import unidadMedidaRouter from '../routes/unidadMedidaRouter.js'




class Server{
    constructor(){
    this.app = express()
    this.listen()
    this.dbConnection()

    this.pathCategoria = "/api/categorias"
    this.pathComprobante = "/api/comprobantes"
    this.pathMovimiento = "/api/movimientos"
    this.pathUnidadMedida = "/api/unidadesMedida"
    this.pathInsumos = "/api/insumos"



    this.route()
    
    }

    route (){
        this.app.use(json())
        this.app.use(this.pathCategoria, categoriaRouter)
        this.app.use(this.pathComprobante, comprobanteRouter)
        this.app.use(this.pathInsumos, inicioSesionRouter)
        this.app.use(this.pathInsumos, registroRouter)
        this.app.use(this.pathInsumos, insumoRouter)
        this.app.use(this.pathMovimiento, movimientoRouter)
        this.app.use(this.pathUnidadMedida, unidadMedidaRouter)

    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running`)
        })
    }

    async dbConnection(){ // call connet to database
        await dbConnection()
    }
}

export default Server
import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new UsuarioController();
let auth = new AuthMiddleware();

router.get("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Usuários']
    // #swagger.summary = "Lista todos os usuários (para seleção de responsável)"
    ctrl.listar(req, res);
})

export default router;

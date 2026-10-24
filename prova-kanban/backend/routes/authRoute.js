import express from 'express';
import AuthController from '../controllers/authController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new AuthController();
let auth = new AuthMiddleware();

router.get("/cookie", auth.validar, (req, res) => {

    // #swagger.tags = ['Autenticação']
    // #swagger.summary = "Obtém o usuário logado a partir do cookie de autenticação"
    ctrl.usuario(req, res);
})

router.post("/login", (req, res) => {

    // #swagger.tags = ['Autenticação']
    // #swagger.summary = "Geração de token de autenticação"
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/login" }
            }
        }
    } */
    ctrl.token(req, res);
})

export default router;

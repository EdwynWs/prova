import express from 'express';
import TarefaController from '../controllers/tarefaController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new TarefaController();
let auth = new AuthMiddleware();

router.get("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Tarefas']
    // #swagger.summary = "Lista todas as tarefas. Pode filtrar por status via query param ?status=a_fazer|em_andamento|em_revisao|concluido"
    ctrl.listar(req, res);
})

router.get("/resumo", auth.validar, (req, res) => {

    // #swagger.tags = ['Tarefas']
    // #swagger.summary = "Retorna a contagem de tarefas agrupadas por status (para o Dashboard)"
    ctrl.resumo(req, res);
})

router.get("/:id", auth.validar, (req, res) => {

    // #swagger.tags = ['Tarefas']
    // #swagger.summary = "Obtém uma tarefa pelo ID"
    ctrl.obter(req, res);
})

router.post("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Tarefas']
    // #swagger.summary = "Cadastra uma nova tarefa"
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/tarefa" }
            }
        }
    } */
    ctrl.cadastrar(req, res);
})

router.put("/:id", auth.validar, (req, res) => {

    // #swagger.tags = ['Tarefas']
    // #swagger.summary = "Atualiza todos os dados de uma tarefa"
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/tarefa" }
            }
        }
    } */
    ctrl.atualizar(req, res);
})

router.patch("/:id/status", auth.validar, (req, res) => {

    // #swagger.tags = ['Tarefas']
    // #swagger.summary = "Move uma tarefa para outro status (coluna do Kanban)"
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/moverStatus" }
            }
        }
    } */
    ctrl.moverStatus(req, res);
})

router.delete("/:id", auth.validar, (req, res) => {

    // #swagger.tags = ['Tarefas']
    // #swagger.summary = "Exclui (soft delete) uma tarefa"
    ctrl.excluir(req, res);
})

export default router;

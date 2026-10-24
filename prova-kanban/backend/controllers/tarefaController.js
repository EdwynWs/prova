import Tarefa from "../entities/tarefa.js";
import Usuario from "../entities/usuario.js";
import TarefaRepository from "../repositories/tarefaRepository.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

const STATUS_VALIDOS = ['a_fazer', 'em_andamento', 'em_revisao', 'concluido'];

export default class TarefaController {

    #tarefaRepository;
    #usuarioRepository;

    constructor() {
        this.#tarefaRepository = new TarefaRepository();
        this.#usuarioRepository = new UsuarioRepository();
    }

    async listar(req, res) {
        try{
            let { status } = req.query;

            let tarefas;
            if(status) {
                if(!STATUS_VALIDOS.includes(status)) {
                    return res.status(400).json({msg: "Status inválido. Use: a_fazer, em_andamento, em_revisao ou concluido"});
                }
                tarefas = await this.#tarefaRepository.listarPorStatus(status);
            } else {
                tarefas = await this.#tarefaRepository.listar();
            }

            return res.status(200).json(tarefas);
        }
        catch(err) {
            return res.status(500).json({msg: err.message});
        }
    }

    async obter(req, res) {
        try{
            let { id } = req.params;

            if(!id) {
                return res.status(400).json({msg: "ID da tarefa é obrigatório"});
            }

            let tarefa = await this.#tarefaRepository.obter(id);

            if(!tarefa) {
                return res.status(404).json({msg: "Tarefa não encontrada"});
            }

            return res.status(200).json(tarefa);
        }
        catch(err) {
            return res.status(500).json({msg: err.message});
        }
    }

    async resumo(req, res) {
        try{
            let contagem = await this.#tarefaRepository.contarPorStatus();

            // Inicializar todos os status com zero
            let resumo = {
                a_fazer: 0,
                em_andamento: 0,
                em_revisao: 0,
                concluido: 0
            };

            for(let item of contagem) {
                resumo[item["tar_status"]] = item["total"];
            }

            return res.status(200).json(resumo);
        }
        catch(err) {
            return res.status(500).json({msg: err.message});
        }
    }

    async cadastrar(req, res) {
        try{
            let { titulo, descricao, status, dataLimite, responsavel } = req.body;

            if(!titulo || !descricao || !status || !dataLimite) {
                return res.status(400).json({msg: "Título, descrição, status e data limite são obrigatórios"});
            }

            if(!STATUS_VALIDOS.includes(status)) {
                return res.status(400).json({msg: "Status inválido. Use: a_fazer, em_andamento, em_revisao ou concluido"});
            }

            let tarefa = new Tarefa();
            tarefa.titulo = titulo;
            tarefa.descricao = descricao;
            tarefa.status = status;
            tarefa.dataLimite = dataLimite;

            if(responsavel && responsavel.id) {
                let usuario = await this.#usuarioRepository.obter(responsavel.id);
                if(!usuario) {
                    return res.status(404).json({msg: "Responsável não encontrado"});
                }
                tarefa.responsavel = usuario;
            }

            if(await this.#tarefaRepository.cadastrar(tarefa)) {
                return res.status(201).json({msg: "Tarefa cadastrada com sucesso", tarefa: tarefa});
            }

            throw new Error("Erro ao cadastrar tarefa");
        }
        catch(err) {
            return res.status(500).json({msg: err.message});
        }
    }

    async atualizar(req, res) {
        try{
            let { id } = req.params;
            let { titulo, descricao, status, dataLimite, responsavel } = req.body;

            if(!id) {
                return res.status(400).json({msg: "ID da tarefa é obrigatório"});
            }

            let tarefa = await this.#tarefaRepository.obter(id);
            if(!tarefa) {
                return res.status(404).json({msg: "Tarefa não encontrada"});
            }

            if(!titulo || !descricao || !status || !dataLimite) {
                return res.status(400).json({msg: "Título, descrição, status e data limite são obrigatórios"});
            }

            if(!STATUS_VALIDOS.includes(status)) {
                return res.status(400).json({msg: "Status inválido. Use: a_fazer, em_andamento, em_revisao ou concluido"});
            }

            tarefa.titulo = titulo;
            tarefa.descricao = descricao;
            tarefa.status = status;
            tarefa.dataLimite = dataLimite;

            if(responsavel && responsavel.id) {
                let usuario = await this.#usuarioRepository.obter(responsavel.id);
                if(!usuario) {
                    return res.status(404).json({msg: "Responsável não encontrado"});
                }
                tarefa.responsavel = usuario;
            } else {
                tarefa.responsavel = null;
            }

            if(await this.#tarefaRepository.atualizar(tarefa)) {
                return res.status(200).json({msg: "Tarefa atualizada com sucesso", tarefa: tarefa});
            }

            return res.status(404).json({msg: "Tarefa não encontrada"});
        }
        catch(err) {
            return res.status(500).json({msg: err.message});
        }
    }

    async moverStatus(req, res) {
        try{
            let { id } = req.params;
            let { status } = req.body;

            if(!id) {
                return res.status(400).json({msg: "ID da tarefa é obrigatório"});
            }

            if(!status) {
                return res.status(400).json({msg: "O novo status é obrigatório"});
            }

            if(!STATUS_VALIDOS.includes(status)) {
                return res.status(400).json({msg: "Status inválido. Use: a_fazer, em_andamento, em_revisao ou concluido"});
            }

            let tarefa = await this.#tarefaRepository.obter(id);
            if(!tarefa) {
                return res.status(404).json({msg: "Tarefa não encontrada"});
            }

            if(await this.#tarefaRepository.atualizarStatus(id, status)) {
                return res.status(200).json({msg: "Status da tarefa atualizado com sucesso"});
            }

            return res.status(404).json({msg: "Tarefa não encontrada"});
        }
        catch(err) {
            return res.status(500).json({msg: err.message});
        }
    }

    async excluir(req, res) {
        try{
            let { id } = req.params;

            if(!id) {
                return res.status(400).json({msg: "ID da tarefa é obrigatório"});
            }

            let result = await this.#tarefaRepository.excluir(id);

            if(result) {
                return res.status(200).json({msg: "Tarefa excluída com sucesso"});
            }

            return res.status(404).json({msg: "Tarefa não encontrada"});
        }
        catch(err) {
            return res.status(500).json({msg: err.message});
        }
    }
}

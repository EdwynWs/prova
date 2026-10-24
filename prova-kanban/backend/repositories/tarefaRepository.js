import Database from "../db/database.js";
import Tarefa from "../entities/tarefa.js";
import Usuario from "../entities/usuario.js";


export default class TarefaRepository {

    #banco;

    constructor() {
        this.#banco = new Database();
    }

    async listar() {
        const sql = `
            select t.*, u.usu_nome, u.usu_email
            from tb_tarefa t
            left join tb_usuario u on u.usu_id = t.usu_id
            where t.tar_ativo = 'S'
            order by t.tar_id
        `;
        const rows = await this.#banco.ExecutaComando(sql, []);

        let tarefas = [];
        for(let row of rows) {
            let tarefa = this.#mapearTarefa(row);
            tarefas.push(tarefa);
        }
        return tarefas;
    }

    async listarPorStatus(status) {
        const sql = `
            select t.*, u.usu_nome, u.usu_email
            from tb_tarefa t
            left join tb_usuario u on u.usu_id = t.usu_id
            where t.tar_ativo = 'S' and t.tar_status = ?
            order by t.tar_id
        `;
        const rows = await this.#banco.ExecutaComando(sql, [status]);

        let tarefas = [];
        for(let row of rows) {
            let tarefa = this.#mapearTarefa(row);
            tarefas.push(tarefa);
        }
        return tarefas;
    }

    async obter(id) {
        const sql = `
            select t.*, u.usu_nome, u.usu_email
            from tb_tarefa t
            left join tb_usuario u on u.usu_id = t.usu_id
            where t.tar_id = ? and t.tar_ativo = 'S'
        `;
        const valores = [id];
        const rows = await this.#banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            return this.#mapearTarefa(rows[0]);
        }
        return null;
    }

    async contarPorStatus() {
        const sql = `
            select tar_status, count(*) as total
            from tb_tarefa
            where tar_ativo = 'S'
            group by tar_status
        `;
        const rows = await this.#banco.ExecutaComando(sql, []);
        return rows;
    }

    async cadastrar(tarefa) {
        const sql = "insert into tb_tarefa (tar_titulo, tar_descricao, tar_status, tar_data_limite, usu_id, tar_ativo) values (?, ?, ?, ?, ?, 'S')";
        const valores = [tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.dataLimite, tarefa.responsavel ? tarefa.responsavel.id : null];
        const result = await this.#banco.ExecutaComandoLastInserted(sql, valores);
        if(result > 0) {
            tarefa.id = result;
            return true;
        }
        return false;
    }

    async atualizar(tarefa) {
        const sql = "update tb_tarefa set tar_titulo = ?, tar_descricao = ?, tar_status = ?, tar_data_limite = ?, usu_id = ? where tar_id = ? and tar_ativo = 'S'";
        const valores = [tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.dataLimite, tarefa.responsavel ? tarefa.responsavel.id : null, tarefa.id];
        return await this.#banco.ExecutaComandoNonQuery(sql, valores);
    }

    async atualizarStatus(id, status) {
        const sql = "update tb_tarefa set tar_status = ? where tar_id = ? and tar_ativo = 'S'";
        const valores = [status, id];
        return await this.#banco.ExecutaComandoNonQuery(sql, valores);
    }

    async excluir(id) {
        const sql = "update tb_tarefa set tar_ativo = 'N' where tar_id = ?";
        const valores = [id];
        return await this.#banco.ExecutaComandoNonQuery(sql, valores);
    }

    #mapearTarefa(row) {
        let tarefa = new Tarefa();
        tarefa.id = row["tar_id"];
        tarefa.titulo = row["tar_titulo"];
        tarefa.descricao = row["tar_descricao"];
        tarefa.status = row["tar_status"];
        tarefa.dataLimite = row["tar_data_limite"];

        if(row["usu_id"]) {
            let responsavel = new Usuario();
            responsavel.id = row["usu_id"];
            responsavel.nome = row["usu_nome"];
            responsavel.email = row["usu_email"];
            tarefa.responsavel = responsavel;
        }

        return tarefa;
    }
}

import Database from "../db/database.js";
import Usuario from "../entities/usuario.js";


export default class UsuarioRepository {

    #banco

    constructor() {
        this.#banco = new Database();
    }

    async validarUsuario(email, senha) {
        const sql = "select * from tb_usuario where usu_email = ? and usu_senha = ? and usu_ativo = 'S'";
        const valores = [email, senha];
        let rows = await this.#banco.ExecutaComando(sql, valores);

        let usuario = null;
        if(rows.length > 0) {
            usuario = new Usuario();
            usuario.id = rows[0]["usu_id"];
            usuario.nome = rows[0]["usu_nome"];
            usuario.email = rows[0]["usu_email"];
        }
        return usuario;
    }

    async obter(id) {
        const sql = "select * from tb_usuario where usu_id = ? and usu_ativo = 'S'";
        const valores = [id];
        let rows = await this.#banco.ExecutaComando(sql, valores);

        let usuario = null;
        if(rows.length > 0) {
            usuario = new Usuario();
            usuario.id = rows[0]["usu_id"];
            usuario.nome = rows[0]["usu_nome"];
            usuario.email = rows[0]["usu_email"];
        }
        return usuario;
    }

    async listar() {
        const sql = "select * from tb_usuario where usu_ativo = 'S'";
        let rows = await this.#banco.ExecutaComando(sql, []);

        let usuarios = [];
        for(let row of rows) {
            let usuario = new Usuario();
            usuario.id = row["usu_id"];
            usuario.nome = row["usu_nome"];
            usuario.email = row["usu_email"];
            usuarios.push(usuario);
        }
        return usuarios;
    }
}

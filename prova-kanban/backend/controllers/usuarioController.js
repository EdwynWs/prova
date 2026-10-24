import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class UsuarioController {

    #usuarioRepository;

    constructor() {
        this.#usuarioRepository = new UsuarioRepository();
    }

    async listar(req, res) {
        try{
            let usuarios = await this.#usuarioRepository.listar();
            return res.status(200).json(usuarios);
        }
        catch(err) {
            return res.status(500).json({msg: err.message});
        }
    }
}

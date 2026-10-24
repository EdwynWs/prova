import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/usuarioRepository.js';

var SEGREDO = "KANBAN@PFS@2@BACKEND@JWT";

export default class AuthMiddleware {

    gerarToken(id, nome, email) {
        return jwt.sign({
            id: id,
            nome: nome,
            email: email,
        }, SEGREDO, { expiresIn: '1h' } );
    }

    async validar(req, res, next) {
        let {token} = req.cookies;
        if(token){
            try {
                let usuarioRepo = new UsuarioRepository();
                let objUsuario = jwt.verify(token, SEGREDO);
                let usuario = await usuarioRepo.obter(objUsuario.id);
                if(!usuario){
                    return res.status(401).json({msg: "Não autorizado!"});
                }
                req.usuario = usuario;
                next();
            }
            catch(ex) {
                res.status(401).json({msg: "Não autorizado!"});
            }
        }
        else{
            res.status(401).json({msg: "Não autorizado!"});
        }
    }

}

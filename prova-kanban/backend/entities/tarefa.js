export default class Tarefa {
    #id;
    #titulo;
    #descricao;
    #status;
    #dataLimite;
    #responsavel;

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get titulo() {
        return this.#titulo;
    }

    set titulo(value) {
        this.#titulo = value;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(value) {
        this.#descricao = value;
    }

    get status() {
        return this.#status;
    }

    set status(value) {
        this.#status = value;
    }

    get dataLimite() {
        return this.#dataLimite;
    }

    set dataLimite(value) {
        this.#dataLimite = value;
    }

    get responsavel() {
        return this.#responsavel;
    }

    set responsavel(value) {
        this.#responsavel = value;
    }

    toJSON() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            descricao: this.#descricao,
            status: this.#status,
            dataLimite: this.#dataLimite,
            responsavel: this.#responsavel
        };
    }
}

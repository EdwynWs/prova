export default class Usuario {
    #id;
    #nome;
    #email;

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#nome = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email
        };
    }
}

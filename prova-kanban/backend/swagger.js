import swaggerAutogen from "swagger-autogen";
const doc = {
    info: {
        title: "Kanban - API",
        description: "API do sistema de gerenciamento de tarefas em formato Kanban",
    },
    host: 'localhost:5000',
    components: {
        schemas: {
            
            erro: {
                msg: 'Mensagem de erro'
            },
            login: {
                email: "usuario@email.com",
                senha: "senha123"
            },
            tarefa: {
                titulo: "Implementar tela de login",
                descricao: "Criar a interface de login com validação de campos",
                status: "a_fazer",
                dataLimite: "2026-06-30",
                responsavel: {
                    id: 1
                }
            },
            moverStatus: {
                status: "em_andamento"
            }
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
}

const outputJson = "./swagger-output.json";
const routes = ['./server.js']

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js');
})

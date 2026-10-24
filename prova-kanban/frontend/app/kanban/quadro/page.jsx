'use client'
import ApiClient from "@/utils/apiClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeQuadro() {

    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(true);

    async function carregarQuadros() {
        let listaQuadro = await ApiClient.get("tarefas");
        if(listaQuadro) {   
            setLista(listaQuadro);
        }
        setLoading(false);

    }

    useEffect(() => {
        carregarQuadros();
    }, [])

    return (
        <div>
            
            <h1>Quadro Kanban</h1>
            <div>
                <Link className="btn btn-primary" href="/kanban/quadro/cadastrar"><i className="fas fa-plus"></i>Criar Tarefa</Link>
            </div>
            <br></br>
            <div>               
                {
        
                     <div className="table-responsive">
                        <table className="table table-striped">
                                    <th>Backlog</th>
                                    <th>Em Desenvolvimento</th>
                                    <th>Em Revisão</th>
                                    <th>Concluído</th>
                                <tbody>
                                {
                                    lista.map((value, index) => {
                                        return <tr key={index}>
                                                    <td>{value.status}</td>
                                                    <td>{value.status}</td>
                                                    <td>{value.status}</td>
                                                    <td>{value.status}</td>
                                    <td>
                                        <Link href={"/kanban/quadro/alterar"} className="btn btn-primary"><i className="fas fa-pen"></i></Link>
                                    </td>
                                </tr>
                                    })
                                }
                            </tbody></table></div>
                }
            </div>
        </div>
        
    )
}
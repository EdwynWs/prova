
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
            <h5>Dashboard Kanban Nova Tarefa</h5><hr />
            <br/>
            <h1>Dashboard</h1>
    
            <br></br>
                     
        <div className="card o-hidden border-0 shadow-lg my-5">
            <h5 style={{ padding: "80px", borderRadius: "10px"}}>Backlog</h5>
        </div>

        <div className="card o-hidden border-0 shadow-lg my-5">
            <h5 style={{padding: "80px", borderRadius: "10px"}}>Em Desenvolvimento</h5>
        </div>

        <div className="card o-hidden border-0 shadow-lg my-5">
            <h5 style={{padding: "80px", borderRadius: "10px"}}>Em Revisão</h5>
        </div>

        <div className="card o-hidden border-0 shadow-lg my-5">
            <h5 style={{padding: "80px", borderRadius: "10px"}}>Concluído</h5>
        </div>

    </div>
        
    )
}
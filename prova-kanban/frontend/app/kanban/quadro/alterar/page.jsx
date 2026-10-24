'use client'
import ApiClient from "@/utils/apiClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


export default function FormTarefa({tarefa}) {

    const [alteracao, setAlteracao] = useState(false);
    const [lista, setLista] = useState([]);
    const router = useRouter();

    async function listar() {
        let response = await ApiClient.get("usuarios");
        if(response) {
            setLista(response);
        }
    }

    const descricao = useRef("");
    const responsavel = useRef("");
    const titulo = useRef("");
    const data = useRef("");

    async function gravar() {
        //valida os campos
        if(descricao.current.value != "" &&
            responsavel.current.value != "" &&
            titulo.current.value != "" &&
            data.current.value != "") {

            //cria o form data para enviar ao backend
            let formData = new FormData();
            formData.append("descricao", descricao.current.value);
            formData.append("responsavel", responsavel.current.value);
            formData.append("titulo", titulo.current.value);
            formData.append("data", data.current.value);
            


            //fazer o fetch
            let resposta = await ApiClient.postFormData("tarefa", formData);
            if(resposta) {
                toast.success(resposta.msg);
                //navega para a listagem
                router.back();
            }     
    }else {
            toast.error("Preencha corretamente os campos do formulário");
        }
    }


    async function alterar() {
        //valida os campos
        if(descricao.current.value != "" &&
            responsavel.current.value != "" &&
            titulo.current.value != "" &&
            data.current.value != "") {

            //cria o form data para enviar ao backend
            let formData = new FormData();
            formData.append("descricao", descricao.current.value);
            formData.append("responsavel", responsavel.current.value);
            formData.append("titulo", titulo.current.value);
            formData.append("data", data.current.value);

            //fazer o fetch
            let response = await ApiClient.putFormData("tarefa", formData);
            if(response) {
                toast.success(response.msg)
                //navega para a listagem
                router.back();
            }
        }
        else {
            toast.error("Preencha corretamente os campos do formulário");
        }
    }

    useEffect(() => {
        //se diferente de null, estamos em alteração
        if(tarefa) {
            //troca o estado e preenche os ref's
            descricao.current.value = tarefa.descricao;
            responsavel.current.value = tarefa.responsavel;
            titulo.current.value = tarefa.titulo;
            data.current.value = tarefa.data;
            setAlteracao(true);
            listar();
        }
    }, [])

    return (
        <div>
            <div className="form-group">
                <label>Descrição</label>
                <input ref={descricao} type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Responsavel</label>
                <select ref={responsavel} className="form-control"></select>
                
            </div>    
            <div className="form-group">
                <label>Titulo</label>
                <input ref={titulo} type="text" className="form-control"></input>
            </div>

            <div className="form-group">
                <label>Data</label>
                <input ref={data} type="date" className="form-control"></input>
            </div>

            <div>
                <button onClick={alteracao ? alterar : gravar} className="btn btn-primary"><i className="fas fa-check"></i> Confirmar</button>    
                <Link href="/kanban/quadro" className="btn btn-default"><i className="fas fa-arrow-left"></i> Voltar</Link>
            </div> 
        </div>
    )
}
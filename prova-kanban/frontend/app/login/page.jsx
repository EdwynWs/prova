'use client'

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ApiClient from "@/utils/apiClient";
import { useRef } from "react";

export default function Login() {

    const email = useRef();
    const senha = useRef();
    const router = useRouter();

    async function autenticar() {

        if(email.current.value != "" && senha.current.value != "") {

            let obj = {
                email: email.current.value,
                senha: senha.current.value
            }

            let response = await ApiClient.post("auth/login", obj);
            if(response) {
                router.replace("/kanban/dashboard");
            }
        }
        else {
            toast.error("Preencha corretamente os campos do formulário");
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Faça o login abaixo</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input ref={email} type="email" className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Insira o e-mail..." />
                                                </div>
                                                <div className="form-group">
                                                    <input ref={senha} type="password" className="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Senha" />
                                                </div>
                                                <button onClick={autenticar} type="button" className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>

    )
}
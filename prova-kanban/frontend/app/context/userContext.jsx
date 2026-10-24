'use client'

import ApiClient from "@/utils/apiClient";
import Loading from "../components/loading";

const { createContext, useState, useEffect } = require("react")

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    async function carregarUsuario() {
        let response = await ApiClient.get("login/usuario");
        if(response) {
            setUsuario(response);
        }

        setLoading(false);
    }

    useEffect(() => {
        carregarUsuario();
    }, [])

    return (
        <UserContext.Provider value={{usuario, setUsuario}}>
            {
                loading ?
                <html>
                    <body>
                        <Loading></Loading>
                    </body>
                </html>
                :
                children
            }
        </UserContext.Provider>
    )
}

export default UserContext;


import {useStateContext} from "../../contexts/ContextProvider";
import {Navigate} from "react-router-dom";
import React from "react";

export default function Logout() {
    const {setToken} = useStateContext();
    setToken('');

    return <Navigate to="/auth" replace={true} />
}
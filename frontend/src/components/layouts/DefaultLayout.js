import {Outlet, Navigate} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider";
import TopMenu from "../TopMenu/TopMenu";
import React from "react";
import AxiosClient from "../../axios-client";
import {Spinner} from "react-bootstrap";

export default function DefaultLayout() {
    const {token, user, setUser, setToken, setPermissions, setRoles, checkAccessRole, works, setWorks} = useStateContext()

    const getInfo = () => {
        AxiosClient.get('v1/users/info', {})
            .then(({data}) => {
                setUser(data.user);
                setPermissions(data.permissions);
                setRoles(data.roles);
            })
            .catch(({error}) => {
                setToken('');
            })

        AxiosClient.get('v1/works', null)
            .then(({data}) => {
                if (!(data.error || data.errors)) {
                    setWorks(data);
                } else {
                    //setErrorMessage(data.message);
                }
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    console.log(response.data.errors)
                }
            })

    }

    if (!token) {
        return <Navigate to="/auth" replace={true} />
    }

    if (!user) {
        getInfo();
        return (
            <div>
                <TopMenu />
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
    }

    if (!checkAccessRole(['director', 'manager'])) {
        return (
            <div>
                <TopMenu />
                <div>
                    У вашей роли нет доступа к этому контенту
                </div>
            </div>
        )
    }

    return (
        <div>
            <TopMenu />
            <Outlet />
        </div>
    )
}
import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    user: null,
    token: null,
    permissions: {},
    roles: {},
    setUser: () => {},
    setToken: () => {},
    setPermissions: () => {},
    setRoles: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('user_token'));
    const [permissions, setPermissions] = useState({});
    const [roles, setRoles] = useState({});
    const [works, setWorks] = useState([]);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('user_token', token);
        } else {
            localStorage.removeItem('user_token');
        }
    }

    const checkAccessPermission = (checkPermissions) => {
        if (checkPermissions.typeof === 'string') {
            return Object.values(permissions).includes(checkPermissions);
        } else {
            let accessPermission = true;
            checkPermissions.forEach((checkPermission) => {
                if (!Object.values(permissions).includes(checkPermission)) {
                    accessPermission = false;
                    return false;
                }
            })
            return accessPermission;
        }
    }

    const checkAccessRole = (checkRoles) => {
        if (checkRoles.typeof === 'string') {
            return Object.values(roles).includes(checkRoles);
        } else {
            let accessRole = false;
            console.log(Object.values(roles));
            checkRoles.forEach((checkRole) => {
                console.log(checkRole);
                if (Object.values(roles).includes(checkRole)) {
                    accessRole = true;
                    return true;
                }
            })
            return accessRole;
        }

    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            permissions,
            roles,
            works,
            setUser,
            setToken,
            setPermissions,
            setRoles,
            setWorks,
            checkAccessPermission,
            checkAccessRole
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
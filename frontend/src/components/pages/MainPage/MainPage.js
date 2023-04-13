import {useStateContext} from "../../../contexts/ContextProvider";

export default function MainPage() {
    const {user} = useStateContext();

    return (
        <div>
            Добро пожаловать <span>{user.name}</span>
        </div>
    )
}
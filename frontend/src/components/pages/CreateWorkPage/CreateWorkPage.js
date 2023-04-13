import React, {useRef, useState} from "react"
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AxiosClient from "../../../axios-client";
import {useStateContext} from "../../../contexts/ContextProvider";

export default function CreateWorksPage() {
    const {works, setWorks} = useStateContext()
    const dateFromRef = useRef();
    const dateToRef = useRef();
    const userIdRef = useRef();
    const nameRef = useRef();
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [users, setUsers] = useState([]);
    const [isLoading, setInsLoading] = useState(false);
    const statuses = ['Новая', 'В работе', 'Выполнена', 'Закрыта'];

    const {checkAccessPermission, user} = useStateContext();
    const sectionPermission = checkAccessPermission(['frontend-section-id-1/view', 'frontend-section-id-1/change']);

    if (!sectionPermission) {
        return (
            <div>
                У вас нет доступа к этой вкладке
            </div>
        )
    }

    if (!isLoading) {
        AxiosClient.get('v1/users?role=4', null)
            .then(({data}) => {
                setInsLoading(true);
                setUsers(data);
            })
    }

    function sendForm(event) {
        event.preventDefault()

        setErrorMessage('');
        setSuccessMessage('');

        const payload = {
            name: nameRef.current.value,
            date_from: dateFromRef.current.value,
            date_to: dateToRef.current.value,
            user_id: userIdRef.current.value,
            manager_user_id: user.id,
            status: statuses[Math.floor(Math.random() * statuses.length)]
        };

        console.log(payload);
        let formError = false;
        Object.values(payload).forEach((element) => {
            if (element.length === 0) {
                formError = true;
            }
        })

        if (formError) {
            setErrorMessage('Все поля должны быть заполнены');
        } else {
            AxiosClient.post('v1/works', payload)
                .then(({data}) => {
                    if (data.error) {
                        setErrorMessage(data.message);
                    } else if (data.name) {
                        setWorks([...works, data]);
                        console.log(works);

                        dateFromRef.current.value = null;
                        dateToRef.current.value = null;
                        userIdRef.current.value = null;
                        nameRef.current.value = null;

                        setSuccessMessage('Задача успешно добавлена')
                    } else {
                        setErrorMessage('Неизвестная ошибка')
                    }
                })
                .catch(err => {
                    const response = err.response
                    if (response && response.status === 422) {
                        console.log(response.data.errors)
                    }
                })
        }
    }

    return (
        <div className="col-md-5">
            { (errorMessage)?
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div> : null
            }
            { (successMessage)?
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div> : null
            }
            <Form onSubmit={sendForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Дата от</Form.Label>
                    <Form.Control ref={dateFromRef} type="date" placeholder="Дата" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Дата до</Form.Label>
                    <Form.Control ref={dateToRef} type="date" placeholder="Дата" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Назначить</Form.Label>
                    <Form.Select aria-label="Default select example" ref={userIdRef}>
                        <option value="">Выберите ответсвенного</option>
                        {users.map(user => {
                            return <option key={user.id} value={user.id}>{user.name}</option>
                        }) }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Наименование</Form.Label>
                    <Form.Control ref={nameRef} type="text" placeholder="Наименование задачи" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Создать
                </Button>
            </Form>
        </div>
    )
}
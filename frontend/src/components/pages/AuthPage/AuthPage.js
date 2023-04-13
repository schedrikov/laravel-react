import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container} from "react-bootstrap";
import css from "./AuthPage.module.css";
import {useStateContext} from "../../../contexts/ContextProvider";
import AxiosClient from "../../../axios-client";

export default function AuthPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {setToken, setUser, setRoles, setPermissions} = useStateContext();
    const [errorMessage, setErrorMessage] = useState(null);

    function sendForm(event) {
        event.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        if (emailRef.current.value.length === 0 || passwordRef.current.value.length === 0) {
            setErrorMessage('Email и Пароль обязательны для ввода')
        } else {
            setErrorMessage('')
            AxiosClient.post('auth', payload)
                .then(({data}) => {
                    if (data.error) {
                        setErrorMessage(data.message);
                    } else if (data.token && data.user.name) {
                        setToken(data.token);
                        setUser(data.user);
                        setRoles(data.roles);
                        setPermissions(data.permissions);
                    } else {
                        setErrorMessage('Неизвестная ошибка')
                    }
                })
                .catch(err => {
                    const response = err.response
                    if (response && response.status === 422) {
                        setErrorMessage(response.data.message);
                    }
                })
        }
    }

    return (
        <Container className="mt-5">
            <Form className={css.form} onSubmit={sendForm}>
                <div className="bg-light p-3">
                    <h2 className="text-center mb-5">Авторизация</h2>
                    { (errorMessage)?
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div> : null
                    }
                    <Form.Group className="mb-1" controlId="formBasicEmail">
                        <Form.Label className="fs-5">Email</Form.Label>
                        <Form.Control ref={emailRef} type="email" placeholder="Введите email" />
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="formBasicPassword">
                        <Form.Label className="fs-5">Пароль</Form.Label>
                        <Form.Control ref={passwordRef} type="password" placeholder="Пароль" />
                    </Form.Group>
                    <Button className="mt-5" variant="primary" type="submit">
                        Войти
                    </Button>
                </div>
            </Form>
        </Container>
    )
}
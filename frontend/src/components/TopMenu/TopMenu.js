import React from "react";
import {NavLink} from 'react-router-dom';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

export default function TopMenu() {
    return (
        <Navbar bg="light" expand="lg" className="mb-3">
            <Container>
                <Navbar.Brand href="/works?page=2&work=18">Тестовое</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink exact="true" to="/" className="nav-link ps-3 pe-3">Главная</NavLink>
                        <NavLink exact="true" to="/create-work" className="nav-link ps-3 pe-3">Создать задачу</NavLink>
                        <NavLink exact="true" to="/works" className="nav-link ps-3 pe-3">Список задач</NavLink>
                        <NavLink exact="true" to="/logout" className="nav-link ps-3 pe-3">Выйти</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

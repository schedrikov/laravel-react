import React, {useState} from "react";
import Table from "../../Table/Table";
import AxiosClient from "../../../axios-client";
import {Form} from "react-bootstrap";
import {useStateContext} from "../../../contexts/ContextProvider";

export default function WorksPage() {
    const {works, setWorks} = useStateContext()
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [sort, setSort] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const statuses = ['Новая', 'В работе', 'Выполнена', 'Закрыта'];

    const columns = [
        {
            Header: 'Номер',
            accessor: 'id',
        },
        {
            Header: 'Дата от',
            accessor: 'date_from',
        },
        {
            Header: 'Дата до',
            accessor: 'date_to',
        },
        {
            Header: 'Наименование',
            accessor: 'name',
        },
        {
            Header: 'Ответственный',
            accessor: 'user.name',
        },
        {
            Header: 'Назначил',
            accessor: 'manager_user.name',
        },
        {
            Header: 'Статус',
            accessor: 'status',
        },
    ];

    const sorts = [
        {
            name: '↓ Номер',
            column: 'id:asc',
        },
        {
            name: '↑ Номер',
            column: 'id:desc',
        },
        {
            name: '↓ Наименование',
            column: 'name:asc',
        },
        {
            name: '↑ Наименование',
            column: 'name:desc',
        },
        {
            name: '↓ Ответственный',
            column: 'user.name:asc',
        },
        {
            name: '↑ Ответственный',
            column: 'user.name:desc',
        },
        {
            name: '↓ Статус',
            column: 'status:asc',
        },
        {
            name: '↑ Статус',
            column: 'status:desc',
        },
        {
            name: '↓ Дата от',
            column: 'date_from:asc',
        },
        {
            name: '↑ Дата от',
            column: 'date_from:desc',
        },
        {
            name: '↓ Дата до',
            column: 'date_to:asc',
        },
        {
            name: '↑ Дата до',
            column: 'date_to:desc',
        },
    ];

    return (
        <div>
            <Form className="pb-5 row row-cols-1 row-cols-lg-3">
                <Form.Group className="col-md-5 col mb-3">
                    <Form.Label>Поиск</Form.Label>
                    <Form.Control type="text" placeholder="Введите слово для поиска" onChange={event => setSearch(event.target.value)} />
                </Form.Group>
                <Form.Group className="col-md-5 col mb-3">
                    <Form.Label>Сортировка</Form.Label>
                    <Form.Select className="col-md-5 col" onChange={event => setSort(event.target.value.split(':'))}>
                        <option value="">По умолчанию</option>
                        {sorts.map(sortElement => {
                            return <option key={sortElement.column} value={sortElement.column}>{sortElement.name}</option>
                        }) }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="col-md-5 col mb-3">
                    <Form.Label>Статус</Form.Label>
                    <Form.Select className="col-md-5 col" onChange={event => setStatus(event.target.value)}>
                        <option value="">Все</option>
                        {statuses.map(status => {
                            return <option key={status} value={status}>{status}</option>
                        }) }
                    </Form.Select>
                </Form.Group>
            </Form>

            <Table perPage={5} columns={columns} data={
                works
                    //search
                    .filter(work => {
                        if (search === '') {
                            return true;
                        } else {
                            let isIncludes = false;

                            columns.forEach(column => {
                                let splitColumnAccessor = column.accessor.split('.');
                                if (splitColumnAccessor.length === 1 && work[column.accessor] && String(work[column.accessor]).toLowerCase().includes(search.toLowerCase())) {
                                    isIncludes = true;
                                } else if (splitColumnAccessor.length === 2 && work[splitColumnAccessor[0]][splitColumnAccessor[1]]
                                    && String(work[splitColumnAccessor[0]][splitColumnAccessor[1]]).toLowerCase().includes(search.toLowerCase())) {
                                    isIncludes = true;
                                }
                            })

                            return isIncludes;
                        }
                    })
                    //status
                    .filter(work => {
                        return !!(status === '' || work.status.includes(status));
                    })
                    //sort
                    .sort((a, b) => {
                        let compareResult = 0;

                        if (sort !== '') {
                            let sortSplit = sort[0].split('.');

                            if (sortSplit.length === 1) {
                                if (a[sort[0]] > b[sort[0]]) {
                                    compareResult = 1;
                                } else {
                                    compareResult = -1;
                                }
                            } else {
                                if (a[sortSplit[0]][sortSplit[1]] > b[sortSplit[0]][sortSplit[1]]) {
                                    compareResult = 1;
                                } else {
                                    compareResult = -1;
                                }
                            }

                            if (sort[1] === 'desc') compareResult = -compareResult;
                        }

                        return compareResult;
                    })

            } />
        </div>
    )
}

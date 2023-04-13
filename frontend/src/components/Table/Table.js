import { useTable, usePagination } from 'react-table'
import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Pagination} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import css from './Table.module.css';

export default function Table ({perPage, columns, data}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [workSelect, setWorkSelect] = useState(Number(searchParams.get('work')));

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable({
        columns,
        data,
        initialState: { pageSize: 10, pageIndex: (searchParams.get('page')) ? searchParams.get('page') - 1 : 0 }
    }, usePagination)


    if (pageCount && (pageIndex >= pageCount || pageIndex < 0)) {
        gotoPage(0);
    }

    const elementScroll = document.getElementById('work' + workSelect);
    if (elementScroll) {
        elementScroll.scrollIntoView({block: "center", inline: "center"});
    }

    return (
        <div>
            <table {...getTableProps()} className={css.table}>
                <thead className={css.theadTable}>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className={css.theadThTable}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()} className={css.trbodyTable}>
                {page.map((row, i) => {
                    prepareRow(row)
                    //debugger
                    return (
                        <tr {...row.getRowProps()} className={(row.values.id === workSelect) ? css.trTableSuccess : css.trTable} id={'work' + row.values.id}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()} className={css.tdTable}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {(pageCount > 1) ?
                <div className="pb-5 row row-cols-1 row-cols-lg-3">
                    <Pagination className="ps-3">
                        <Pagination.Item onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </Pagination.Item>
                        <Pagination.Item onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </Pagination.Item>
                        <Pagination.Item onClick={() => nextPage()} disabled={!canNextPage}>
                            {'>'}
                        </Pagination.Item>
                        <Pagination.Item onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {'>>'}
                        </Pagination.Item>
                    </Pagination>
                    <div className="mb-3">
                        Страница: {pageIndex + 1}
                    </div>
                    <div>
                        <Form.Select
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Показать по {pageSize}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </div>
            : null }
        </div>
    )
}

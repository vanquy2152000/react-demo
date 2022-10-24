import Table from 'react-bootstrap/Table';
import ReactPaginate from "react-paginate";
import { useTranslation } from 'react-i18next';

const TableUserPaginate = (props) => {
    const { listUsers, pageCount } = props;
    const { t, i18n } = useTranslation();

    const handlePageClick = (event) => {
        props.fetchListUsersWithPaginate(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1)
    };
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{t('manage.user.no')}</th>
                        <th>{t('manage.user.username')}</th>
                        <th>{t('manage.user.email')}</th>
                        <th>{t('manage.user.role')}</th>
                        <th>{t('manage.user.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                props.handleClickBtnView(item);
                                            }}
                                        >{t('manage.user.view')}</button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => {
                                                props.handleClickBtnUpdate(item);
                                            }}
                                        >{t('manage.user.update')}</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                props.handleClickBtnDelete(item);
                                            }}
                                        >{t('manage.user.delete')}</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'5'}>{t('manage.user.notfound')}</td>
                        </tr>
                    }
                </tbody>
            </Table>
            <div className="user-pagination">
                <ReactPaginate
                    nextLabel={i18n.language === "vi" ? "Tiếp Theo >" : "Next >"}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={i18n.language === "vi" ? "< Trước" : "< Prev"}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    )
}

export default TableUserPaginate;
import React, { useState } from 'react'

const DataTable = (props) => {
    const { name, data, columns, currentPage, numOfPage, onPageChange, onChangeItemsPerPage, onChangeSearch } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const renderHeaders = () => {
        return columns.map((col, index) => <th key={index}>{col.name}</th>)
    }

    const renderDatas = () => {
        return (
            data.map((item, index) => (
                <tr key={index}>
                    {
                        columns.map((col, ind) => <td key={ind}>{col.element(item)}</td>)
                    }
                </tr>
            ))
        )
    }

    const renderPagination = () => {
        const pagination = [];
        const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
        const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;
        pagination.push(
            <li key='prev' className={prevPage ? 'page-item' : 'page-item disabled'}>
                <button className='page-link' onClick={() => onPageChange(prevPage)}>&laquo;</button>
            </li>
        )
        for (let i = 1; i <= numOfPage; i++) {
            pagination.push(
                <li key={i} className={currentPage === i ? 'page-item active' : 'page-item'}>
                    <button className='page-link' onClick={() => onPageChange(i)}>{i}</button></li>
            )
        }
        pagination.push(
            <li key='next' className={nextPage ? 'page-item' : 'page-item disabled'}>
                <button className='page-link' onClick={() => onPageChange(nextPage)}>&raquo;</button>
            </li>
        )
        return pagination;
    }
    const onChangeOption = (event) => {
        const target = event.target;
        onChangeItemsPerPage(target.value);
    }
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSearchClick = () => {
        onChangeSearch(searchTerm);
    };
    return (
        <div className="card mb-4">
            <div className="card-header">
                <i className="fas fa-table me-1"></i>
                {name}
            </div>
            <div className="card-body">
                <div className="row mb-3">
                    <div className="col-sm-12 col-md-6">
                        <label className='d-inline-flex'>Show
                            <select name="example_length" className="form-select form-select-sm ms-1 me-1" onChange={onChangeOption}>
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="1">1</option>
                                <option value="5">5</option>
                            </select>
                        </label>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <label className='d-inline-flex float-end'>Search:
                            <input type="search" className="form-control form-control-sm ms-1" placeholder="Email or Name"
                                value={searchTerm}
                                onChange={handleInputChange} />
                            <button className="btn btn-primary" id="btnNavbarSearch" type="button"
                                onClick={handleSearchClick}
                            ><i className="fas fa-search"></i></button>
                        </label>
                    </div>
                </div>
                <table className="table table-striped table-bordered" cellSpacing="0" width="100%">
                    <thead>
                        <tr>
                            {renderHeaders()}
                        </tr>

                    </thead>
                    <tbody>
                        {renderDatas()}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-sm-12 col-md-7'>
                        <ul className='pagination justify-content-end'>
                            {renderPagination()}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataTable
import React from 'react'

const DataTable = () => {
    return (
        <div className="card mb-4">
            <div className="card-header">
                <i className="fas fa-table me-1"></i>
            </div>
            <div className="card-body">
                <div className="row mb-3">
                    <div className="col-sm-12 col-md-6">
                        <label className='d-inline-flex'>Show
                            <select name="example_length" className="form-select form-select-sm ms-1 me-1">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select> entries
                        </label>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <label className='d-inline-flex float-end'>Search:
                        </label>
                    </div>
                </div>
                <table className="table table-striped table-bordered" cellSpacing="0" width="100%">
                    <thead>
                        <tr>
                            <td><input type="checkbox" className="form-check-input" /></td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default DataTable
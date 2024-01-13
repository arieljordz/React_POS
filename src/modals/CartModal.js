import React from 'react'

function CartModal() {
  return (
    <div
    className={`modal fade ${showModal ? "show" : ""}`}
    id="modal-default"
    style={{ display: showModal ? "block" : "none" }}
    aria-hidden={!showModal}
    role="dialog"
    data-backdrop="static"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header bg-dark">
            <h5 className="modal-title">
              <i className="fa fa-shopping-bag pr-2"></i>
              {mode} Product
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              type="hidden"
              id="Id"
              value={formData.Id}
              onChange={handleChange}
            />
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <div htmlFor="Description">Description</div>
                  <input
                    type="text"
                    name="Description"
                    className="form-control"
                    id="Description"
                    autoComplete="off"
                    required="required"
                    value={formData.Description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4"><div className="form-group"> <div htmlFor="Quantity">Quantity</div><input type="number" name="Details.Quantity" className="form-control" id="Quantity" />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <div htmlFor="Price">Price</div>
                  <input
                    type="text"
                    name="Details.Price"
                    className="form-control"
                    id="Price"
                    required="required"
                    value={formData.Details.Price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group">
                  <div htmlFor="ExpirationDate">Expiration Date</div>
                  <input
                    type="date"
                    name="Details.ExpirationDate"
                    className="form-control"
                    id="ExpirationDate"
                    required="required"
                    value={
                      formData.Details.ExpirationDate
                        ? formData.Details.ExpirationDate.substring(
                            0,
                            10
                          )
                        : ""
                    }
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-end">
            <button type="submit" className="btn btn-secondary float-right"> Save </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default CartModal

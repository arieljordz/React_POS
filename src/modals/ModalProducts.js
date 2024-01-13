import React from 'react'

function ModalProducts() {
  return (
    
    <div>
        <div className="modal fade" id="modal-default" style={{display: 'none'}} aria-hidden="true">
          <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Default Modal</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>One fine body…</p>
            </div>
            <div className="modal-footer justify-content-between">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
          </div>
        </div>

      <div id="toast-container" className="toast-top-right">
        <div className="toast toast-success" aria-live="polite" style={{}}>
            <div className="toast-message">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</div>
        </div>
      </div>


    </div>

  )
}

export default ModalProducts

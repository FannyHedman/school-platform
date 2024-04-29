import React from 'react'

const ConfirmationModalReq = ({handleClose}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <p>Schedule saved successfully!</p>
      </div>
    </div>
  )
}

export default ConfirmationModalReq

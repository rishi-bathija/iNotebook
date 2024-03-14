import React from 'react'

const ModalAlert = (props) => {
  return (
    <div>
       <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert">
      {props.message}
    </div>
    </div>
  )
}

export default ModalAlert

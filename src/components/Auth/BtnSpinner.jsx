import React from 'react'
import './Login.css'

export default function BtnSpinner() {
  return (
    <>
    <div className='spinnerCircle d-inline me-2'>
    <   div className="spinner-border spinner-light spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    </>
  )
}

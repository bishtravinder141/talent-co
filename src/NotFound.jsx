import React from 'react'
import Warning from "../src/assets/images/warning-icon.svg"

import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div className='notFound'>
        <img src={Warning} className="mb-4"/>
        <h4>Oops! Page not Found</h4>
        <p className='text-center notdesc mb-0'>We are Sorry, But the page you requested was not found</p>
        <Link  to ="/" className="btn-design">Back to Home</Link>
    </div>
    </>
  )
}

export default NotFound
import React from 'react'
import {Link} from 'react-router-dom'
import './logo.css'
const Logo = () => {
    return (
        <div className='logo-fr f fc'>
            <Link to='/' className='logo'>
            Victoria
        </Link>
        <span>Beauty Salon</span>
        </div>
    )
}

export default Logo

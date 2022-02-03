import React from 'react'
import './logout.css'
import { useNavigate } from 'react-router-dom'
const Logout = ({setLog}) => {
    const h = useNavigate()
    const remove=()=>{
        localStorage.removeItem('Victoria_')
        setLog(false)
        h('/')
    }

    return (
        <div onClick={remove} className='lo-fr'>
            <div className='lo-b'></div>
            <div className='lo-ar'>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Logout

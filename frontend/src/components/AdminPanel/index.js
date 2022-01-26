import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
const AdminPanel = ({children}) => {
    const h = useNavigate()
    const data = JSON.parse(localStorage.getItem('Victoria_'))
    useEffect(()=> {
        if(!data || data?.isAdmin === false){
        h('/')
    }
    }, [data])
    return (
        <div style={{padding:'6px'}} className='f fcenter'>
            {children}
        </div>
    )
}

export default AdminPanel

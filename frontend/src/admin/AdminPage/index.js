import React from 'react'
import {Link} from 'react-router-dom'
import Box from '../../components/Box'
import AdminPanel from '../../components/AdminPanel'
import '../admin.css'
const AdminPage = () => {
    
    return (
        <Box admin={true}>
            <AdminPanel>
            <Link className='adm-link f fcenter' to='/admin-panel/about'>ABOUT</Link>
            <Link className='adm-link f fcenter' to='/admin-panel/slider'>SLIDER</Link>
            <Link className='adm-link f fcenter' to='/admin-panel/services'>SERVICES</Link>
            <Link className='adm-link f fcenter' to='/admin-panel/stylists'>SPECIALISTS</Link>
            <Link className='adm-link f fcenter' to='/admin-panel/contacts'>CONTACTS</Link>
            <Link className='adm-link f fcenter' to='/admin-panel/phone'> <span style={{marginRight:'8px'}} ><i className="fas fa-phone-alt"></i></span>PHONES </Link>
            <Link className='adm-link f fcenter' to='/admin-panel/clients'>CLIENTS LIST</Link>
            <Link className='adm-link f fcenter' to='/profile'><span style={{marginRight:'8px'}} ><i className="fas fa-user-tie fa-lg"></i></span> ADMIN PROFILE</Link>
            </AdminPanel>
        </Box>
    )
}

export default AdminPage

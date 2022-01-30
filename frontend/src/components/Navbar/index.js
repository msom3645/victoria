import React,{useState} from 'react'
import './nav.css'
import Logo from '../Logo'
import Logout from '../Logout'
import Menu from '../Menu'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
    const [sts, setSts] = useState(false)
    const [log, setLog] = useState(JSON.parse(localStorage.getItem('Victoria_')))  
    
    return (
        <div className='nav f'>
            <span onClick={()=>setSts(false)} className='nav-logo'><Logo/></span>
            <div className='nav-links f'>
            
            <NavLink to="/about" className={(navData) => (navData.isActive ? "nav-link x-active" : 'nav-link')}>ABOUTs</NavLink>
            <NavLink to="/services" className={(navData) => (navData.isActive ? "nav-link x-active" : 'nav-link')}>SERVICES</NavLink>
            <NavLink to="/stylists" className={(navData) => (navData.isActive ? "nav-link x-active" : 'nav-link')}>SPECIALISTS</NavLink>
            <NavLink to="/booknow" className={(navData) => (navData.isActive ? "nav-link x-active" : 'nav-link')}>BOOK NOW</NavLink>
            <NavLink to="/contacts" className={(navData) => (navData.isActive ? "nav-link x-active" : 'nav-link')}>CONTACTS</NavLink>            
            </div>
            <div className='nav-log f'>
                {log?.user?
                log.isAdmin?<><NavLink to='/admin-panel' style={{color:'tomato'}} className='nav-signin f fcenter'>ADMIN PANEL</NavLink>
                <span className='nav-logout'><Logout setLog={setLog}/></span></>:
                <>
            <NavLink to='/profile' className='nav-signin f fcenter'>Hello, {log.user}</NavLink>
            <span className='nav-logout'><Logout setLog={setLog}/></span></>:
                <NavLink className='nav-login' to='/login'>SIGN IN</NavLink>
            }
            </div>
            <div className='nav-menu'><Menu setSts={setSts} sts={sts} /></div>
            
            <div onClick={()=>setSts(false)} className={sts?'nav-side active':'nav-side'}>
            <div onClick={e=>e.stopPropagation()} className='nav-block f fc'>
            <div className='navside-links f fc'>
            <NavLink onClick={()=>setSts(false)} className='navside-link' to='/about' >ABOUT</NavLink>
            <NavLink onClick={()=>setSts(false)} className='navside-link' to='/services'>SERVICES</NavLink>
            <NavLink onClick={()=>setSts(false)} className='navside-link' to='/stylists'>SPECIALISTS</NavLink>
            <NavLink onClick={()=>setSts(false)} className='navside-link' to='booknow' >BOOK NOW</NavLink>
            <NavLink onClick={()=>setSts(false)} className='navside-link' to='/contacts' >CONTACTS</NavLink>
            </div>
            {log?.user?
                <>
<NavLink to='/admin-panel' style={{color:'tomato'}} className='navside-signin f fcenter'>ADMIN PANEL</NavLink>
            <span className='navside-logout'><Logout setLog={setLog}/></span></>:
                <NavLink className='nav-login d' to='/login'>SIGN IN</NavLink>
            }
            </div>
                </div>
        </div>
    )
}

export default Navbar

import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {Err, Msg} from '../Alerts'
import {Loading} from '../Loading'
import Logout from '../../components/Logout'
import './box.css'

const Box = ({children, load, err, msg, setErr, setMsg, admin}) => {   
  
  const [log, setLog] = useState(JSON.parse(localStorage.getItem('Victoria_')))  

  const timer = (x, secs)=>{
            let t
           window.clearTimeout(t)
          t = window.setTimeout(
          () => {
          x('')
           }, secs)
                 }

  err && timer(setErr, 4000)
  msg && timer(setMsg, 2000)
    
    return (
        <div className='box'>
            {load && <Loading/>}
        {err && <Err err={err}/>}
        {msg && <Msg msg={msg}/>}
            {admin &&
                <div className='adm-pan f'>
                    <Link className='adm-pan-view' to='/'>VIEW SITE</Link>
                    <Link style={{color:'var(--cream)'}} to='/admin-panel'>Admin Panel</Link>
                <Logout setLog={setLog}/>
                </div>
            }
            {children}
            
        </div>
    )
}

export default Box

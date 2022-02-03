import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Logo from '../components/Logo'
import Box from '../components/Box'
import {Loading} from '../components/Loading'
import {emailValid} from '../utils'
import axios from 'axios'
import './reg.css'
import { useNavigate } from 'react-router'
const RegPage = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState(false)
    const h = useNavigate()
    
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const invalid = emailValid(email)

    const data = localStorage.getItem('Victoria_')
    useEffect(()=> {
        if(data){
        h('/')
    }
    }, [data])
    
    const disabled = () => {
        if(email && !invalid && pass){
            return false
        }
        return true
    } 
    
    const send = async(e) => {
        e.preventDefault()
        setLoad(true)
        try{
            const {data} = await axios.post('/api/auth/login', {email, pass})
            localStorage.setItem('Victoria_', JSON.stringify(data))
            setLoad(false)
            h('/')
        }catch(e){
            e.response && e.response.data.message? setErr(e.response.data.message):
            setErr('Server Error! Try later!')
            setLoad(false)
        }
        }   
    
    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg}>
            {load && <Loading/>}
            <form onSubmit={send} className='reg-fr f fc'>
            <Logo/>
            <p className='p1'>Sign In</p>
            <div className='reg-inp'>
            {invalid && <div>{invalid}</div>}
            <input onChange={e=>setEmail(e.target.value)} placeholder='Email'/>
            </div>
            
            <input className='reg-inp' autoComplete='on' onChange={e=>setPass(e.target.value)} type='password' placeholder='Password'/>
            
            <button disabled={disabled(  )} className='send-btn'>Sign In</button>
            <div style={{gap:'14px'}} className='f fc'>
            <div>
            <p className='p2'>New to Victoria?</p>
            <Link style={{color:'var(--cream)', fontSize:'13px'}} className='sign' to='/reg'>Sign Up</Link>
            </div>
            <div>
            <p className='p2'>Forgot Your Password?</p>
            <Link style={{color:'var(--cream)', fontSize:'13px'}} className='sign' to='/reset-pass'>Click here</Link>
            </div>
            </div>
            </form>
        </Box>
    )
}

export default RegPage

  
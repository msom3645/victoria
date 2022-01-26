import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Logo from '../components/Logo'
import Box from '../components/Box'
import {Loading} from '../components/Loading'
import CodeBox from '../components/CodeBox'
import {emailValid} from '../utils'
import {timer} from '../utils'
import axios from 'axios'
import { useNavigate } from 'react-router'
import './reg.css'
const RegPage = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState()
    const [ok, setOk] = useState(false)
    const [rand, setRand] = useState()
    
    const [user, setUser] = useState()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const [repass, setRepass] = useState()   
    const h = useNavigate()
    const invalid = emailValid(email)

    const data = localStorage.getItem('Victoria_')
    useEffect(()=> {
        if(data){
        h('/')
    }
    }, [data])

    const disabled = () => {
        if(pass?.length>5 && repass?.length>5 && email && !invalid && user){
            return false
        }
        return true
    }


    const login = async()=> {
        try{
            const {data} = await axios.post('http://localhost:5000/api/auth/login', {email, pass})
            localStorage.setItem('Victoria_', JSON.stringify(data))
            setOk(true)
            setLoad(false)
            timer(()=> {h('/')}, 2000)
        }catch(e){
            e.response && e.response.data.message? setErr(e.response.data.message):
            setErr('Server Error! Try later!')
            setLoad(false)
        }
    }

    const writeDb = async() => {
        try{
            const {data} = await axios.post('http://localhost:5000/api/auth/reg-model', {user, email, pass})
            setOk(true)
            login()
            timer(()=> {h('/')}, 2000)
        }catch(e){
            e.response && e.response.data.message? setErr(e.response.data.message):
            setErr('Server Error, Try later!')
        }
    }

    const mail = async() => {
        setLoad(true)
        try{
            const {data} = await axios.post('http://localhost:5000/api/auth/reg', {user, email, text:'To authenticate, please use the following One Time Password (OTP):', subj:'Email Verification'})
            setRand(data.rand)
            setLoad(false) 
        }catch(e){
            e.response && e.response.data.message? setErr(e.response.data.message):
            setErr('Server Error, Try later!')
            setLoad(false)
        }
    }
    
    const send = async(e) => {
        e.preventDefault()
        if(pass !== repass){
            setErr('Passwords must match!')
        }else{
            mail()
        }   
    }
    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={false}>
            {load && <Loading/>}
            {rand? <CodeBox rand={rand} email={email} text={"To verify your email, we've sent a One Time Password (OTP) to:"} setErr={setErr} f={mail} f2={writeDb} ok={ok}/>:
            <form onSubmit={send} className='reg-fr f fc'>
            <Logo/>
            <p className="p1">Sign Up</p>
            <input autoFocus onChange={e=>setUser(e.target.value)} placeholder="Name" />
            <div className="reg-inp">
            {invalid && <div>{invalid}</div>}
            <input onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
            </div>
            <div className="reg-inp">
                {pass?.length < 6 && <div>minimum 6 symbols</div>}
            <input autoComplete="on" onChange={e=>setPass(e.target.value)} type="password" placeholder="Password (at least 6 characters)"/>
            </div>
            <div className="reg-inp">
                {repass?.length < 6 && <div>minimum 6 symbols</div>}
            <input autoComplete="off" onChange={e=>setRepass(e.target.value)} type="password" placeholder="Re-enter Password" />
            </div>
            <button disabled={disabled(  )} className="send-btn">Sign Up</button>
            <div>
            <p className="p2">Already have an account?</p>
            <Link style={{color:'var(--cream)', fontSize:'13px'}} className='sign' to='/login'>Sign In</Link>
            </div>
            </form>
            }
            
        </Box>
    )
}

export default RegPage

  
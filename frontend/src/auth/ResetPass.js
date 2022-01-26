import React,{useState} from 'react'
import Logo from '../components/Logo'
import Box from '../components/Box'
import {Loading} from '../components/Loading'
import CodeBox from '../components/CodeBox'
import {emailValid, timer} from '../utils'
import axios from 'axios'
import { useNavigate } from 'react-router'
import './reg.css'
const ResetPass = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState('')
    const [ok, setOk] = useState(false)
    const [rand, setRand] = useState()
    
    const [upd, setUpd] = useState(false)   
    const [user, setUser] = useState('')
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const [repass, setRepass] = useState()
    const h = useNavigate()
    const invalid = emailValid(email)

    const disabled = () => {
        if(email && !invalid){
            return false
        }
        return true
    }

    const passDisabled = () => {
        if(!pass || pass.length <6 || !repass || repass.length <6 ){
            return true
        }
        return false
    }

    const login = async()=> {
        try{
            const {data} = await axios.post('http://localhost:5000/api/auth/login', {email, pass})
            localStorage.setItem('Victoria_', JSON.stringify(data))
            setUpd(false)
            setOk(true)
            setLoad(false)
            timer(()=> {h('/')}, 2000)
        }catch(e){
            e.response && e.response.data.message? setErr(e.response.data.message):
            setErr('Server Error! Try later!')
            setLoad(false)
        }
    }

    const writeDb = async(e) => {
        e.preventDefault()
        if(pass === repass){
            try{
                setLoad(true)
            const {data} = await axios.put('http://localhost:5000/api/auth/user', {email, pass})
            login()
        }catch(e){
            e.response && e.response.data.message? setErr(e.response.data.message):
            setErr('Server Error, Try later!')
            setLoad(false)
        }
        }else{
            setErr('Passwords must match!')
        }
    }

    const newPass = () => {
        setUpd(true)
        setRand('')
    }

    
    const mail = async() => {
        setLoad(true)
        try{
            const {data} = await axios.post('http://localhost:5000/api/auth/reset-pass', {email, text:'To reset password, please use the following One Time Password (OTP):', subj:'ResetPassword'})
            setRand(data.rand)
            setLoad(false) 
        }catch(e){
            e.response && e.response.data.message? setErr(e.response.data.message):
            setErr('Server Error, Try later!')
            setLoad(false)
        }
    }
    
    
    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={false}>
            {load && <Loading/>}
            {rand || ok? <CodeBox rand={rand} email={email} text={"To reset Your password, we've sent a One Time Password (OTP) to:"} setErr={setErr} f={mail} f2={newPass} ok={ok}/>:
            upd?<form className='reg-fr f fc'>
                            <Logo/>
                            <p className='p1'>Enter new password</p>
                <div className='reg-inp'>
                {pass?.length < 6 && <div>minimum 6 symbols</div>}
            <input autoComplete='on' autoFocus onChange={e=>setPass(e.target.value)} type="password" placeholder="New Password (at least 6 characters)"/>
            </div>
            <div className="reg-inp">
                {repass?.length < 6 && <div>minimum 6 symbols</div>}
            <input autoComplete="off" onChange={e=>setRepass(e.target.value)} type="password" placeholder="Re-enter Password" />
            </div>
      
            <button onClick={writeDb} disabled={passDisabled()} className='send-btn'>Send</button>
            </form>:
            <div className='reg-fr f fc'>
            <Logo/>
            <p style={{color:'var(--cream)', fontSize:'12px'}}>Enter the email address associated with your account</p>
            
            <div className='reg-inp'>
            {invalid && <div>{invalid}</div>}
            <input autoFocus='on' onChange={e=>setEmail(e.target.value)} placeholder='Email'/>
            </div>

            <button onClick={mail} disabled={disabled()} className='send-btn'>Send</button>
            </div>
            }
            
        </Box>
    )
}

export default ResetPass

  
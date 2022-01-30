import React,{useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {compressImg} from '../../utils'
import axios from 'axios'
import {Loading} from '../../components/Loading'
import {Err, Msg} from '../../components/Alerts'
import {emailValid} from '../../utils'
import './profile.css'
const Profile = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState()
    const [profile, setProfile] = useState({})
    const [confirm, setConfirm] = useState(false)
    const [changeImg, setChangeImg] = useState(false)
    const [changePass, setChangePass] = useState(false)
    const [changeEmail, setChangeEmail] = useState(false)
    const [pic, setPic] = useState()
    const [preview, setPreview] = useState('')
    const [newEmail, setEmail] = useState()
    const invalid = emailValid(newEmail)
    const [pass1, setPass1] = useState()
    const [pass2, setPass2] = useState()
    const [oldPass, setOldPass] = useState()

    const user = JSON.parse(localStorage.getItem('Victoria_')) 
    useEffect(()=>{
        pic ? setPreview(URL.createObjectURL(pic)):
        setPreview()
    },[pic])    

    useEffect(()=>{
        const fetch = async() => {
            try{
                const {data} = await axios.post(user.isAdmin? '/user/admin-profile': '/user/user-profile', {id:user._id}, {headers: {Authorization: `Bearer ${user.token}`}})
                   setProfile(data)
            }catch(e){
                console.log(e.response)
            }
        }
        fetch()
    },[msg])

    if(!user?.token ){
        return <Navigate to='/'/>
    }

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

const imgBoard = () => {
    setChangeImg(e=>!e)
    setConfirm(false)
    setPic()
}

const emailBoard = () => {
    setChangeEmail(e=>!e)
    setEmail()
}

    const saveImg = async() => {      
            setLoad(true)
        const f = async(compressed) => {
            const formData = new FormData()
            const items = {id: user._id,
                 oldImgPath: `C:/Users/mso30/OneDrive/Рабочий стол/victoria/frontend/public/uploads/profiles/${user._id}/${profile.img}`,
                 imgPath: `C:/Users/mso30/OneDrive/Рабочий стол/victoria/frontend/public/uploads/profiles/${user._id}/${pic.name}`}
            formData.append('items', JSON.stringify(items))
            formData.append('file', compressed, pic.name) 
            try{
                const {data} = await axios.post(user.isAdmin? '/user/admin-profile-img':'/user/user-profile-img', formData, {headers: {Authorization: `Bearer ${user.token}`}})
                setMsg(data.message)
                setPic()
                setLoad(false)
            }catch(e){
                e.response && e.response.data.message?setErr(e.response.data.message):setErr(e.message)
                console.log(e.response.data.message)
                setLoad(false)
            }
        }
        compressImg(pic, setErr, setLoad, 300,  f) 
         
    }
    
const removeImg = async() => {
    try{
        const {data} = await axios.put(user.isAdmin? '/user/admin-profile-img':'/user/user-profile-img', {imgPath: profile.imgPath, img: profile.img, id: user._id},{headers: {Authorization: `Bearer ${user.token}`}})
        setMsg(data)
        setConfirm(false)
    }catch(e){
        console.log(e)
    }
}

const emailHandler = async(e) => {
    e.preventDefault()
    try{
        const {data} = await axios.put(user.isAdmin?'/user/admin-profile-email':'/user/user-profile-email', {id:user._id, newEmail}, {headers: {Authorization: `Bearer ${user.token}`}})
        setEmail('')
        setMsg(data)
    }catch(e){
            console.log(e)
        }
    }

const passHandler = async(e) => {
    e.preventDefault()
    try{
        const {data} = await axios.put(user.isAdmin? '/user/admin-profile-pass':'/user/user-profile-pass', {id:user._id, pass:pass1, oldPass}, {headers: {Authorization: `Bearer ${user.token}`}})
        setMsg(data)
    }catch(e){
        setErr(e.response.data.message)
        console.log(e)
    }
}

    return (
        <div className='pr-fr f fc'>
                 {load && <Loading/>}
                {err && <Err err={err}/>}
                {msg && <Msg msg={msg}/>}
                <h2 className='pr-cap'>Hello, {profile.user}!</h2>
                <div className='pr-pic-cont f fcenter'>
                {preview?
                <img src={preview} alt=''/>:
                profile.imgPath? 
                <img src={`./uploads/profiles/${profile._id}/${profile.img}`} alt=''/>:
                <i className="far fa-user fa-6x"></i>}
                </div>
                <h2 className='pr-cap' >{profile.email}</h2>
                <div className='pr-btn' style={{background:changeImg &&'var(--cream)'}} onClick={imgBoard}>CHANGE IMAGE {changeImg? <i className="fas fa-chevron-down"></i>: <i className="fas fa-chevron-right "></i>}</div>
                {changeImg &&
                <div className='pr-pic-btns f fc fcenter'>
                    <div style={{gap: '10px'}} className='f fcenter'>
                    <label className='pr-set-btn pr-edit f fcenter' htmlFor='pr-set-pic'><i className="fas fa-edit"></i></label>
                    <input onChange={e=>setPic(e.target.files[0])} id='pr-set-pic'  accept='image/*' style={{display:'none'}} type='file'/>
                    {pic && <button onClick={()=>setPic()} className='pr-set-btn pr-remove f fcenter'><i className="fas fa-window-close"></i></button>}
                    {pic && <button onClick={saveImg} className='pr-set-btn pr-save f fcenter' >SAVE</button>}
                    </div>
                    {!pic && !confirm && profile.img && <button onClick={()=>setConfirm(true)} className='pr-set-btn pr-remove f fcenter'><i className="fas fa-trash"></i></button>}
                    {confirm && <div style={{gap: '10px'}} className='f fc'>  
                    <h5 style={{color:'orangered'}} >Are You Sure?</h5>
                    <div style={{gap: '20px'}} className='f fcentet'>
                    <button onClick={removeImg}  className='cl-yes-btn f fcenter' >YES</button>
                    <button onClick={()=>setConfirm(false)} className='cl-no-btn f fcenter' >NO</button>
                    </div>
                    </div>}
                </div>
            }
                <div className='pr-btn' style={{background:changeEmail &&'var(--cream)'}} onClick={emailBoard}>CHANGE EMAIL {changeEmail? <i className="fas fa-chevron-down"></i>: <i className="fas fa-chevron-right "></i>}</div>
                {changeEmail &&
                <form onSubmit={emailHandler} style={{gap:'14px',position:'relative'}} className='pr-pic-btns f fc'>
                    {invalid && newEmail &&  <div className='pr-email-val'>!! Enter correct email address</div>}
                    {profile?.email ===  newEmail &&  <div className='pr-email-val'>Enter New Email Address !!</div>}
                    <input onChange={e=>setEmail(e.target.value)} autoFocus className='pr-email' placeholder='New Email'/>
                    {newEmail && !invalid && profile?.email !==  newEmail && <button className='send-btn'>SAVE</button>}
                </form>
            }
                <div className='pr-btn' style={{background:changePass &&'var(--cream)'}} onClick={()=>setChangePass(e=>!e)}>CHANGE PASSWORD {changePass? <i className="fas fa-chevron-down"></i>: <i className="fas fa-chevron-right "></i>}</div>
                {changePass &&
                <form onSubmit={passHandler} style={{gap:'20px'}} className='f fc'>
                    <input autoFocus onChange={e=>setOldPass(e.target.value)} type='password' placeholder='Old Password'/>
                    <div style={{position:'relative'}} >
                    {pass1?.length>0 && pass1?.length<6 &&  <div className='pr-pass-val'>6 characters minimum</div>}                        
                    <input onChange={e=>setPass1(e.target.value)} type='password' placeholder='New Password'/>
                    </div>
                    <div style={{position:'relative'}} >
                    {pass2?.length>0 && pass2?.length<6 &&  <div className='pr-pass-val'>6 characters minimum</div>}                        
                    {pass1?.length>5 && pass2?.length>5 && pass1 !== pass2 && <div className='pr-pass-val'>Passwords don`t match !</div>}                        
                    <input onChange={e=>setPass2(e.target.value)} type='password' placeholder='Confirm New Password'/>
                    </div>
                    {pass2?.length>5 && pass2?.length>5 && pass1 === pass2 && <button className='send-btn'>SAVE</button>}
                </form>
            }
            </div>
        
    )
}

export default Profile

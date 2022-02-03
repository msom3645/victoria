import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {compressImg} from '../../utils'
import {Back} from '../../components/Arrows'
import Box from '../../components/Box'
import { useLocation } from 'react-router-dom'
import AdminPanel from '../../components/AdminPanel'
import '../admin.css'
const AddContact = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState()
    const [location, setLocation] = useState('')
    const [tel, setTel] = useState('')
    const [period, setPeriod] = useState('')
    const [img, setImg] = useState('')
    const [preview, setPreview] = useState('')
    const user = JSON.parse(localStorage.getItem('Victoria_')) 
    useEffect(()=>{
        img && setPreview(URL.createObjectURL(img))
    },[img])

    useEffect(()=>{
        if(msg){
            setTel('')
            setLocation('')
            setPeriod('')
            setPreview('')
        }
    },[msg])
    
        const send = async(e) => {
            e.preventDefault() 
            setLoad(true)
            const writeToDB = async(pic) => {
                const items = {items: {location, tel, period, pic} ,model:'ContactsModel'}
                try{
                    const {data} = await axios.post('/api/admin/main', items, {headers:{ Authorization: `Bearer ${user.token}` }})
                    setMsg(data.message)
                    setLoad(false)
                }catch(e){
                    e.response && e.response.data.message?setErr(e.response.data.message):setErr(e.message)
                    setLoad(false)
                }
                }
    
                const f = (compressed) =>{
                    const reader = new FileReader()
                    reader.readAsDataURL(compressed)
                    reader.onloadend = () =>{
                        writeToDB(reader.result)
                    }
                }
                compressImg(img, setErr, setLoad, 200, f)     
        }
    
    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={true}>
            <AdminPanel>
            <Back/>
        <form className='adm-form f fc' onSubmit={send}>
                <p>Add Contact</p>
              <div className='imgprew-box f feven'>
              <label className='add-img f fcenter' htmlFor='img'><i className="fas fa-camera"></i></label>             
              <input id='img' accept='image/*' onChange={e=>setImg(e.target.files[0])} style={{display:'none'}} type='file' required/>
              <img src={preview? preview: '/uploads/noimg.jpg'} alt='...'/>
              </div>
              <input value={location} style={{borderColor:'var(--spray)'}} maxLength='100' onChange={e=>setLocation(e.target.value)} placeholder='Location'/>
              <input value={tel} style={{borderColor:'var(--spray)'}} maxLength='140' onChange={e=>setTel(e.target.value)} placeholder='tel:'/>
              <input value={period} style={{borderColor:'var(--spray)'}} maxLength='140' onChange={e=>setPeriod(e.target.value)} placeholder='Opens at'/>
              <button type='submit' disabled={!img || !location || !tel || !period} className='send-btn' >Send</button>  
        </form>
            </AdminPanel>
        </Box>
    )
}

export default AddContact

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {compressImg} from '../../utils'
import {Back} from '../../components/Arrows'
import Box from '../../components/Box'
import AdminPanel from '../../components/AdminPanel'
import {useLocation} from 'react-router-dom'
const AddService = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [service, setService] = useState('')
    const [price, setPrice] = useState('')
    const [duration, setDuration] = useState('')
    const [img, setImg] = useState('')
    const [preview, setPreview] = useState('')
    const h = useLocation()
    const adr = h.pathname.split('/').at(-2)
    const user = JSON.parse(localStorage.getItem('Victoria_')) 
    useEffect(()=>{
        img && setPreview(URL.createObjectURL(img))
    },[img])

    useEffect(()=>{
        if(msg){
            setTitle('')
            setDesc('')
            setService('')
            setDuration('')
            setPrice('')
            setPreview('')
        }
    },[msg])
    const send = async(e) => {
        e.preventDefault()
        setLoad(true)
        const f = async(compressed) => {
            const formData = new FormData()
            const items = {title, desc, service, price, duration, img: img.name, imgPath: `C:/Users/mso30/OneDrive/Рабочий стол/victoria/frontend/public/uploads/${adr}/${img.name}`}
            formData.append('file', compressed, img.name)           
            formData.append('items', JSON.stringify(items))
            formData.append('model', 'ServicesModel')
            try{
                const {data} = await axios.post('/api/admin/main', formData, {headers:{ Authorization: `Bearer ${user.token}` }})
                setMsg(data.message)
                setLoad(false)
            }catch(e){
                e.response && e.response.data.message?setErr(e.response.data.message):setErr(e.message)
                setLoad(false)
            }
        }
        
    compressImg(img, setLoad, setErr, 400, f)            
        }

    
    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={true}>
        <AdminPanel>
        <form className='adm-form f fc' onSubmit={send}>
            <Back/>
                <p>Add New Service</p>
              <div className='imgprew-box f feven'>
              <label className='add-img f fcenter' htmlFor='img'><i className="fas fa-camera"></i></label>             
              <input id='img' accept='image/*' onChange={e=>setImg(e.target.files[0])} style={{display:'none'}} type='file' required/>
              <img src={preview? preview: '/uploads/noimg.jpg'} alt='...'/>
              </div>
              <input value={service} style={{borderColor:service?'limegreen':'orangered'}} onChange={e=>setService(e.target.value)} placeholder='Service' required/>
              <input value={title} style={{borderColor:title?'limegreen':'orangered'}} onChange={e=>setTitle(e.target.value)} placeholder='Title' required/>
              <input value={price} type='number' style={{borderColor:price?'limegreen':'orangered'}} onChange={e=>setPrice(e.target.value)} placeholder='Price' required/>
              <input value={duration} style={{borderColor:duration?'limegreen':'orangered'}} onChange={e=>setDuration(e.target.value)} placeholder='Duration' required/>
              <textarea value={desc} style={{borderColor:desc?'limegreen':'orangered'}} maxLength='10000' rows='8' onChange={e=>setDesc(e.target.value)} placeholder='Description' required/>
              <button type='submit' disabled={!img || !service || !title || !desc || !price || !duration} className='send-btn' >Send</button>  
        </form>
        </AdminPanel>
        </Box>
    )
}

export default AddService

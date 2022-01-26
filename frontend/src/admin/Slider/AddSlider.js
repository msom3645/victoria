import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {compressImg} from '../../utils'
import {Back} from '../../components/Arrows'
import Box from '../../components/Box'
import { useLocation } from 'react-router-dom'
import AdminPanel from '../../components/AdminPanel'
import '../admin.css'
const AddSlider = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState()
    const [utext, setUtext] = useState('')
    const [btext, setBtext] = useState('')
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
            setUtext('')
            setBtext('')
            setPreview('')
        }
    },[msg])
    
        const send = async(e) => {
            e.preventDefault() 
            setLoad(true)
            const f = async(compressed) => {
            const formData = new FormData()
            const items = {uptext:utext, bmtext:btext, img: img.name, imgPath: `C:/Users/mso30/OneDrive/Рабочий стол/victoria/frontend/public/uploads/${adr}/${img.name}`}
            formData.append('file', compressed, img.name)
            formData.append('items', JSON.stringify(items))
            formData.append('model', 'SliderModel')
            
            try{
                const {data} = await axios.post('http://localhost:5000/api/admin/main', formData, {headers:{ Authorization: `Bearer ${user.token}` }})
                setMsg(data.message)
                setLoad(false)
            }catch(e){
                e.response && e.response.data.message?setErr(e.response.data.message):setErr(e.message)
                setLoad(false)
            }
        }
        
    compressImg(img, setErr, setLoad, 900, f)
                
        }
    
    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={true}>
            <AdminPanel>
        <form className='adm-form f fc' onSubmit={send}>
            <Back/>
                <p>Add Image</p>
              <div className='imgprew-box f feven'>
              <label className='add-img f fcenter' htmlFor='img'><i className="fas fa-camera"></i></label>             
              <input id='img' accept='image/*' onChange={e=>setImg(e.target.files[0])} style={{display:'none'}} type='file' required/>
              <img src={preview? preview: '/uploads/noimg.jpg'} alt='...'/>
              </div>
              <input value={utext} style={{borderColor:'var(--spray)'}} maxLength='100' onChange={e=>setUtext(e.target.value)} placeholder='Upper text (100 symbols max)'/>
              <input value={btext} style={{borderColor:'var(--spray)'}} maxLength='140' onChange={e=>setBtext(e.target.value)} placeholder='Bottom Text (140 symbols max)'/>
              <button type='submit' disabled={!img} className='send-btn' >Send</button>  
        </form>
            </AdminPanel>
        </Box>
    )
}

export default AddSlider

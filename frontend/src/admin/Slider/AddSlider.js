import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {compressImg} from '../../utils'
import {Back} from '../../components/Arrows'
import Box from '../../components/Box'
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
    
        const send = (e) => {
            e.preventDefault() 
            setLoad(true)
        const writeToDB = async(pic) => {
            const items = {items: {uptext:utext, bmtext:btext, pic} ,model:'SliderModel'}
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
            compressImg(img, setErr, setLoad, 900, f)        
        }
    
    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={true}>
            <AdminPanel>
            <Back/>
        <form className='adm-form f fc' onSubmit={send}>
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

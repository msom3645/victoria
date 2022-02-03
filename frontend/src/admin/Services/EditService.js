import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {compressImg} from '../../utils'
import {Back} from '../../components/Arrows'
import Box from '../../components/Box'
import AdminPanel from '../../components/AdminPanel'
import {useLocation} from 'react-router-dom'
import '../admin.css'

const EditService = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState()
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [duration, setDuration] = useState('')
    const [service, setService] = useState('')
    const [title, setTitle] = useState('')
    const [list, setList] = useState('')
    const [img, setImg] = useState('')
    const [disable, setDisable] = useState(false)
    const [preview, setPreview] = useState('')
    const h = useLocation()
    const id = h.pathname.split('/').at(-1)
    const adr = h.pathname.split('/').at(-2)
    const user = JSON.parse(localStorage.getItem('Victoria_')) 
    const imgInp = (e) =>{
        setImg(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(()=>{
        const fetch = async()=>{
            setLoad(true)
              try{
                  const {data} = await axios.post(`/api/admin/models-utils/${id}`, {model:'ServicesModel'}, {headers:{ Authorization: `Bearer ${user.token}` }})
                setTitle(data.title)
                setDesc(data.desc)
                setDuration(data.duration)
                setPrice(data.price)
                setService(data.service)
                setImg(data.pic)
                setList(data)
                  setLoad(false)
              }catch(e){
                  e.response && e.response.data.message?
                  setErr(e.response.data.message):
                  setErr(e.message)
                  setLoad(false)
              }
          }
          fetch()
      },[])
      
      const send = async(e) => {
        e.preventDefault() 
                setLoad(true)
                const writeToDB = async(pic) => {
                    const items = {items: {title, desc, service, price, duration, pic} ,model:'ServicesModel', id}
                    try{
                        const {data} = await axios.put('/api/admin/main', items, {headers:{ Authorization: `Bearer ${user.token}` }})
                        setMsg(data.message)
                        setDisable(true)
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
                typeof(img) === 'object'? compressImg(img, setErr, setLoad, 400, f) : writeToDB(img)                
        }

        useEffect(()=>{
            list?.title !== title || list?.desc !== desc || list?.price !==price || list?.duration  !== duration || list?.service!=service || preview ? setDisable(false): setDisable(true)     
        },[title, desc, service, preview,list,price, duration])

        
    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={true}>
            <AdminPanel>
            <Back/>
        <form className='adm-form f fc' onSubmit={send}>
                <p> Edit  </p>
              <div className='imgprew-box f feven'>
              <label className='add-img f fcenter' htmlFor='img'><i className="fas fa-camera"></i></label>          
              <input id='img' accept='image/*' onChange={e=>imgInp(e)} style={{display:'none'}} type='file'/>
              <img src={preview? preview: list?.pic} alt='...'/>
              </div>
              <input value={service} style={{borderColor:'var(--spray)'}} onChange={e=>setService(e.target.value)} placeholder='Service'/>
              <input value={title} style={{borderColor:'var(--spray)'}} onChange={e=>setTitle(e.target.value)} placeholder='Title' />
              <input value={price} type='number' style={{borderColor:price?'limegreen':'orangered'}} onChange={e=>setPrice(e.target.value)} placeholder='Price' required/>
              <input value={duration} style={{borderColor:duration?'limegreen':'orangered'}} onChange={e=>setDuration(e.target.value)} placeholder='Duration' required/>
              <textarea value={desc} style={{borderColor:'var(--spray)'}} rows='8' onChange={e=>setDesc(e.target.value)} placeholder='Description' />
              <button disabled={disable} type='submit' className='send-btn' >Save</button>  
        </form>
            </AdminPanel>
        </Box>
    )
}

export default EditService

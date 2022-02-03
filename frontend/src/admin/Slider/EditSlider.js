 import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {compressImg} from '../../utils'
import {Back} from '../../components/Arrows'
import Box from '../../components/Box'
import AdminPanel from '../../components/AdminPanel'
import { useLocation } from 'react-router-dom'
import '../admin.css'
const EditSlider = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState()
    const [utext, setUtext] = useState('')
    const [btext, setBtext] = useState('')
    const [list, setList] = useState('')
    const [disable, setDisable] = useState(false)
    const [img, setImg] = useState('')
    const [preview, setPreview] = useState('')
    const h = useLocation()
    const id = h.pathname.split('/').at(-1)
    const user = JSON.parse(localStorage.getItem('Victoria_')) 
    const imgInp = (e) =>{
        setImg(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(()=>{
        const fetch = async()=>{
            setLoad(true)
              try{
                  const {data} = await axios.post(`/api/admin/models-utils/${id}`, {model:'SliderModel'}, {headers:{ Authorization: `Bearer ${user.token}` }})
                setUtext(data.uptext)
                setBtext(data.bmtext)
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
                        const items = {items: {uptext:utext, bmtext:btext, pic} ,model:'SliderModel', id}
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
                    typeof(img) === 'object'? compressImg(img, setErr, setLoad, 900, f) : writeToDB(img)             
        }

        useEffect(()=>{
            list?.uptext !== utext || list?.bmtext !== btext || preview? setDisable(false): setDisable(true)            
        },[utext, btext, preview,list])
        
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
              <input value={utext} style={{borderColor:'var(--spray)'}} maxLength='100' onChange={e=>setUtext(e.target.value)} placeholder='Upper text (100 symbols max)'/>
              <input value={btext} style={{borderColor:'var(--spray)'}} maxLength='140' onChange={e=>setBtext(e.target.value)} placeholder='Bottom Text (140 symbols max)' />
              <button disabled={disable} type='submit' className='send-btn' >Save</button>  
        </form>
            </AdminPanel>
        </Box>
    )
}

export default EditSlider

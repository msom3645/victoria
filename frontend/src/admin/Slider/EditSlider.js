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
                  const {data} = await axios.post(`http://localhost:5000/api/admin/models-utils/${id}`, {model:'SliderModel'}, {headers:{ Authorization: `Bearer ${user.token}` }})
                setUtext(data.uptext)
                setBtext(data.bmtext)
                setImg(data.img)
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
                if(img){
                    setLoad(true)
            const f = async(compressed) => {
                const formData = new FormData()
                formData.append('id', id )
                formData.append('model', 'SliderModel')
                typeof(img) === 'object' && formData.append('file', compressed, img.name) 
                const items = {uptext:utext, bmtext:btext, img: typeof(img) === 'object'? img.name: img,
                 imgPath: `C:/Users/mso30/OneDrive/Рабочий стол/victoria/frontend/public/uploads/${adr}/${typeof(img) === 'object'? img.name: img}`}
                formData.append('items', JSON.stringify(items))
                try{
                    const {data} = await axios.put('http://localhost:5000/api/admin/main', formData, {headers:{ Authorization: `Bearer ${user.token}` }})
                    setMsg(data.message)
                    setDisable(true)
                    setLoad(false)
                }catch(e){
                    e.response && e.response.data.message?setErr(e.response.data.message):setErr(e.message)
                    setLoad(false)
                }
            }
            typeof(img) === 'object'? compressImg(img, setErr, setLoad, 900, f) : f()
                }
        }

        useEffect(()=>{
            list?.uptext !== utext || list?.bmtext !== btext || img !== list?.img ? setDisable(false): setDisable(true)            
        },[utext, btext, img,list])
        
    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={true}>
            <AdminPanel>
        <form className='adm-form f fc' onSubmit={send}>
            <Back/>
                <p> Edit  </p>
              <div className='imgprew-box f feven'>
              <label className='add-img f fcenter' htmlFor='img'><i className="fas fa-camera"></i></label>          
              <input id='img' accept='image/*' onChange={e=>imgInp(e)} style={{display:'none'}} type='file'/>
              <img src={preview? preview: `/uploads/${adr}/${list?.img}`} alt='...'/>
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

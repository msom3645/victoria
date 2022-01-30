import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {compressImg} from '../../utils'
import {Back} from '../../components/Arrows'
import Box from '../../components/Box'
import AdminPanel from '../../components/AdminPanel'
import {useLocation} from 'react-router-dom'
import '../admin.css'

const EditContact = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState()
    const [location, setLocation] = useState('')
    const [tel, setTel] = useState('')
    const [period, setPeriod] = useState('')
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
                  const {data} = await axios.post(`/api/admin/models-utils/${id}`, {model:'ContactsModel'}, {headers:{ Authorization: `Bearer ${user.token}` }})
                setTel(data.tel)
                setLocation(data.location)
                setPeriod(data.period)
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
                formData.append('model', 'ContactsModel')
                typeof(img) === 'object' && formData.append('file', compressed, img.name) 
                const items = {tel, location, period, img: typeof(img) === 'object'? img.name: img,
                 imgPath: `C:/Users/mso30/OneDrive/Рабочий стол/victoria/frontend/public/uploads/${adr}/${typeof(img) === 'object'? img.name: img}`}
                formData.append('items', JSON.stringify(items))
                try{
                    const {data} = await axios.put('/api/admin/main', formData, {headers:{ Authorization: `Bearer ${user.token}` }})
                    setMsg(data.message)
                    setDisable(true)
                    setLoad(false)
                }catch(e){
                    e.response && e.response.data.message?setErr(e.response.data.message):setErr(e.message)
                    console.log(e.response.data.message)
                    setLoad(false)
                }
            }
            typeof(img) === 'object'? compressImg(img, setErr, setLoad, 200,  f) : f()
            }               
        }

        useEffect(()=>{
            list?.period !== period || list?.tel !== tel || list?.location !== location || img !== list?.img ? setDisable(false): setDisable(true)     
        },[tel, location, img,list])

        
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
              <input value={tel} style={{borderColor:'var(--spray)'}} onChange={e=>setTel(e.target.value)} placeholder='tel:'/>
              <input value={location} style={{borderColor:'var(--spray)'}} onChange={e=>setLocation(e.target.value)} placeholder='Location' />
              <input value={period} style={{borderColor:'var(--spray)'}} onChange={e=>setPeriod(e.target.value)} placeholder='Opens at' />
              <button disabled={disable || !img || !location || !tel || !period} type='submit' className='send-btn' >Save</button>  
        </form>
            </AdminPanel>
        </Box>
    )
}

export default EditContact

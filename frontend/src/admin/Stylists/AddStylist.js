import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {compressImg} from '../../utils'
import {Back} from '../../components/Arrows'
import Box from '../../components/Box'
import AdminPanel from '../../components/AdminPanel'
import {useLocation} from 'react-router-dom'
import '../admin.css'
const AddStylist = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [preview, setPreview] = useState('')
    const [list, setList] = useState([])
    const [salon, setSalon] = useState('')
    const h = useLocation()
    const adr = h.pathname.split('/').at(-2)
    const user = JSON.parse(localStorage.getItem('Victoria_')) 
    useEffect(()=>{
        img && setPreview(URL.createObjectURL(img))
    },[img])
    
    useEffect(()=>{
        const fetch = async()=>{
              try{
                  const {data} = await axios.get('http://localhost:5000/api/admin/contacts', {headers:{ Authorization: `Bearer ${user.token}` }})
                  setList(data)
                }catch(e){
                    console.log(e)
                }
            }
            fetch()
        },[])
    useEffect(()=>{
        if(msg){
            setTitle('')
            setDesc('')
            setName('')
            setPreview('')
        }
    },[msg])
    const send = async(e) => {
        e.preventDefault()
        setLoad(true)
        const f = async(compressed) => {
            const formData = new FormData()
            const items = {salon,title, desc,name, img: img.name, imgPath: `C:/Users/mso30/OneDrive/Рабочий стол/victoria/frontend/public/uploads/${adr}/${img.name}`}
            formData.append('file', compressed, img.name)           
            formData.append('items', JSON.stringify(items))
            formData.append('model', 'StylistsModel')
            try{
                const {data} = await axios.post('http://localhost:5000/api/admin/main', formData, {headers:{ Authorization: `Bearer ${user.token}` }})
                setMsg(data.message)
                setLoad(false)
            }catch(e){
                e.response && e.response.data.message?setErr(e.response.data.message):setErr(e.message)
                setLoad(false)
            }
        }
        
    compressImg(img, setLoad, setErr,300, f)            
        }

    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={true}>
        <AdminPanel>
        <form className='adm-form f fc' onSubmit={send}>
            <Back/>
                <p>Add New Specialist</p>
              <div className='imgprew-box f feven'>
              <label className='add-img f fcenter' htmlFor='img'><i className="fas fa-camera"></i></label>             
              <input id='img' accept='image/*' onChange={e=>setImg(e.target.files[0])} style={{display:'none'}} type='file' required/>
              <img src={preview? preview: '/uploads/noimg.jpg'} alt='...'/>
              </div>
              <input value={name} style={{borderColor:name?'limegreen':'orangered'}} onChange={e=>setName(e.target.value)} placeholder='Name' required/>
              <input value={title} style={{borderColor:title?'limegreen':'orangered'}} onChange={e=>setTitle(e.target.value)} placeholder='Title' required/>
              <textarea value={desc} style={{borderColor:desc?'limegreen':'orangered'}} maxLength='10000' rows='8' onChange={e=>setDesc(e.target.value)} placeholder='Description' required/>
  
  <select style={{borderColor:salon?'limegreen':'orangered'}} className='salons-sel' onChange={e=>setSalon(e.target.value)} id="salons">
  <option hidden >CHOOSE A SALON</option>
    {list.map(e=>(
        <option key={e._id} >{e.location}</option>
    ))}
  </select>
              <button type='submit' disabled={!img || !name || !title || !desc || !salon} className='send-btn' >Send</button>  

        </form>
        </AdminPanel>
        </Box>
    )
}

export default AddStylist

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {compressImg} from '../../utils'
import {Back} from '../../components/Arrows'
import Box from '../../components/Box'
import AdminPanel from '../../components/AdminPanel'
import {useLocation} from 'react-router-dom'
import '../admin.css'

const EditStylist = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState()
    const [desc, setDesc] = useState('')
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [list, setList] = useState('')
    const [salons, setSalons] = useState([])
    const [salon, setSalon] = useState('')
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
              try{
                  const {data} = await axios.get('http://localhost:5000/api/admin/contacts', {headers:{ Authorization: `Bearer ${user.token}` }})
                  setSalons(data)
                }catch(e){
                    console.log(e)
                }
            }
            fetch()
        },[])

    useEffect(()=>{
        const fetch = async()=>{
            setLoad(true)
              try{
                  const {data} = await axios.post(`http://localhost:5000/api/admin/models-utils/${id}`, {model:'StylistsModel'}, {headers:{ Authorization: `Bearer ${user.token}` }})
                setTitle(data.title)
                setDesc(data.desc)
                setSalon(data.salon)
                setName(data.name)
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
                formData.append('model', 'StylistsModel')
                typeof(img) === 'object' && formData.append('file', compressed, img.name) 
                const items = {salon, title, desc, name, img: typeof(img) === 'object'? img.name: img,
                 imgPath: `C:/Users/mso30/OneDrive/?????????????? ????????/victoria/frontend/public/uploads/${adr}/${typeof(img) === 'object'? img.name: img}`}
                formData.append('items', JSON.stringify(items))
                try{
                    const {data} = await axios.put('http://localhost:5000/api/admin/main', formData, {headers:{ Authorization: `Bearer ${user.token}` }})
                    setMsg(data.message)
                    setDisable(true)
                    setLoad(false)
                }catch(e){
                    e.response && e.response.data.message?setErr(e.response.data.message):setErr(e.message)
                    console.log(e.response.data.message)
                    setLoad(false)
                }
            }
            typeof(img) === 'object'? compressImg(img, setErr, setLoad, 300, f) : f()
            }               
        }

        useEffect(()=>{
            list?.salon !== salon || list?.title !== title || list?.desc !== desc || list?.name !== name || img !== list?.img ? setDisable(false): setDisable(true)     
        },[title, desc, name, img,list, salon])

        
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
              <input value={name} style={{borderColor:'var(--spray)'}} onChange={e=>setName(e.target.value)} placeholder='Name'/>
              <input value={title} style={{borderColor:'var(--spray)'}} onChange={e=>setTitle(e.target.value)} placeholder='Title' />
              <textarea value={desc} style={{borderColor:'var(--spray)'}} rows='8' onChange={e=>setDesc(e.target.value)} placeholder='Description' />

              <select style={{borderColor:'var(--spray)'}} className='salons-sel' onChange={e=>setSalon(e.target.value)} id="salons">
  <option hidden >{list?.salon}</option>
    {salons.map(e=>(
        <option className='salons-opt' key={e._id} >{e.location}</option>
    ))}
  </select>
              <button disabled={disable || !img} type='submit' className='send-btn' >Save</button>  
        </form>
            </AdminPanel>
        </Box>
    )
}

export default EditStylist

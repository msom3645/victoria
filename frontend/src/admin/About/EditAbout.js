import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {compressImg} from '../../utils'
import {Back} from '../../components/Arrows'
import Box from '../../components/Box'
import AdminPanel from '../../components/AdminPanel'
import {useLocation} from 'react-router-dom'
import '../admin.css'

const EditAbout = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState()
    const [citation, setCitation] = useState('')
    const [citation2, setCitation2] = useState('')
    const [text, setText] = useState('')
    const [img, setImg] = useState('')
    const [list, setList] = useState()
    const [preview, setPreview] = useState('')
    const [id, setId] = useState('')
    const h = useLocation()
    const adr = h.pathname.split('/').at(-1)
    const user = JSON.parse(localStorage.getItem('Victoria_')) 
    const imgInp = (e) =>{
        setImg(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(()=>{
        const fetch = async()=>{
            setLoad(true)
              try{
                  const {data} = await axios.get('http://localhost:5000/api/admin/about',{headers:{ Authorization: `Bearer ${user.token}` }})
                setText(data[0].text)
                setCitation(data[0].citation)
                setCitation2(data[0].citation2)
                setId(data[0]._id)
                setImg(data[0].img)
                setList(data[0])
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
                formData.append('model', 'AboutModel')
                typeof(img) === 'object' && formData.append('file', compressed,img.name) 
                const items = {text: text, citation:citation, citation2: citation2, img: typeof(img) === 'object'? img.name: img,
                 imgPath: `C:/Users/mso30/OneDrive/Рабочий стол/victoria/frontend/public/uploads/${adr}/${typeof(img) === 'object'? img.name: img}`}
                formData.append('items', JSON.stringify(items))
                try{
                    const {data} = await axios.put('http://localhost:5000/api/admin/main', formData,{headers:{ Authorization: `Bearer ${user.token}` }})
                    setMsg(data.message)
                    setLoad(false)
                }catch(e){
                    e.response && e.response.data.message?setErr(e.response.data.message):setErr(e.message)
                    console.log(e.response.data.message)
                    setLoad(false)
                }
            }
            typeof(img) === 'object'? compressImg(img, setErr, setLoad, 500,  f) : f()
            }               
        }

    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={true}>
            <AdminPanel>
        <form className='adm-form f fc' onSubmit={send}>
            <Back/>
                <p> Edit  </p>
              <div className='imgprew-box f feven'>
              <label className='add-img f fcenter' htmlFor='img'><i className="fas fa-camera"></i></label>          
              <input id='img' accept='image/*' onChange={e=>imgInp(e)} style={{display:'none'}} type='file'/>
              <img src={preview? preview: `/uploads/${adr}/${img}`} alt='...'/>
              </div>
              <input defaultValue={citation} style={{borderColor:'var(--spray)'}} onKeyUp={e=>setCitation(e.target.value)} placeholder='Citation'/>
              <input defaultValue={citation2} style={{borderColor:'var(--spray)'}} onKeyUp={e=>setCitation2(e.target.value)} placeholder='Citation 2' />
              <textarea defaultValue={text} style={{borderColor: text?'limegreen':'orangered'}} rows='8' onKeyUp={e=>setText(e.target.value)} placeholder='About' />
              <button disabled={!text || !img} type='submit' className='send-btn' >Save</button>  
        </form>
            </AdminPanel>
        </Box>
    )
}

export default EditAbout

import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Box from '../../components/Box'
import {Back} from '../../components/Arrows'
import AdminPanel from '../../components/AdminPanel'
import Plus from '../../components/Plus'
import '../admin.css'
import { removeItem } from '../../utils'

const Slider = () => {
    const [list, setList] = useState([])
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState(false)
    const [confirm, setConfirm] = useState({sts:false, id:''})
    const user = JSON.parse(localStorage.getItem('Victoria_')) 
  useEffect(()=>{
      const fetch = async()=>{
            try{
                const {data} = await axios.get('/api/admin/slider', {headers:{ Authorization: `Bearer ${user.token}` }})
                setList(data)
            }catch(e){
                e.response && e.response.data.message?
                setErr(e.response.data.message):
                setErr(e.message)
            }
        }
        fetch()
    },[msg])

    const remove = (e) =>{
        setConfirm({sts:true, id:e._id})
    }

    return (               
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={true}>
        <AdminPanel>
        <Back/>
        <Link className='adm-add-link f fcenter' to='/admin-panel/slider/add'>Add New Image <span className='addpl'><Plus color={'var(--spray)'}/></span> </Link>
        
{list.map(e => (
        <div className='adm-img-r f fcenter' key={e._id}>
            <div className='adm-btns'>
            <Link to={`/admin-panel/slider/${e?._id}`}>
            <div className='adm-img-icon-lf f fcenter'><i className="fas fa-pencil-alt"></i></div>
            </Link>
            <div className='adm-img-icon-rt f fcenter' onClick={()=> remove(e)} >
            <i className="fas fa-trash-alt"></i>
            </div>
            </div>
            <img src={`/uploads/slider/${e.img}`} alt='no image'/>
            {confirm.sts && confirm.id === e?._id && <div className='adm-conf'>
                <h4 style={{color:'var(--cream)'}}>Are You Sure?</h4>
                <div>
                <button onClick={()=>removeItem('SliderModel',  `/api/admin/models-utils/${e._id}`, setLoad, setErr, setMsg, e.imgPath)}>Yes</button>
                <button onClick={()=>setConfirm({sts:false, id:''})}>No</button>
                </div>
                </div>}
             </div>
))}
        </AdminPanel>
</Box> 
    )
}

export default Slider

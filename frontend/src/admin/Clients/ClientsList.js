import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Box from '../../components/Box'
import {Back} from '../../components/Arrows'
import AdminPanel from '../../components/AdminPanel'
import { removeItem } from '../../utils'

import '.././admin.css'
const ClientsList = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState(false)
    const [salons, setSalons] = useState([])
    const [salon, setSalon] = useState('')
    const [names, setNames] = useState([])
    const [confirm, setConfirm] = useState({sts:false, id:''})
    const [sortDates, setSortDates] = useState(false)
    const [sortNames, setSortNames] = useState(false)
    const user = JSON.parse(localStorage.getItem('Victoria_')) 

    useEffect(()=>{
        const fetch = async() => {
            try{
                const {data} = await axios.post('/api/admin/book-clients', {salon}, {headers:{ Authorization: `Bearer ${user.token}` }})
                setNames(data)
            }catch(e){
                console.log(e.response)
            }
        }
        fetch()
    },[salon, msg])

    useEffect(()=>{
        const fetch = async()=>{
              try{
                  const {data} = await axios.get('/api/admin/contacts', {headers:{ Authorization: `Bearer ${user.token}` }})
                  setSalons(data)
                }catch(e){
                    console.log(e.response)
                }
            }
            fetch()
        },[])
    
    const sortDate = () => {       
        const x = names
        sortDates? x.sort((a,b) => new Date(a.date[0] + ' ' + a.date[1]).getTime() > new Date(b.date[0] + ' ' + b.date[1]).getTime()? 1 : -1 ) :
        x.sort((a,b) => new Date(a.date[0] + ' ' + a.date[1]).getTime() < new Date(b.date[0] + ' ' + b.date[1]).getTime()? 1 : -1 )
        setNames(x)
        setSortDates(e=>!e)
    }
    const sortName = () => {
        const x = names
        sortNames? x.sort((a,b)=> a.name.toLowerCase() > b.name.toLowerCase()? 1: -1) :
         x.sort((a,b) => a.name < b.name? 1: -1)
        setNames(x)
        setSortNames(e=>!e)
    }

    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={true}>
        <AdminPanel>
        <Back/>
        <div className='cl-fr f fc'>
        <h3 style={{color: 'var(--spray)'}}> LIST OF CLIENTS  </h3>
        <h5 style={{color: 'var(--text)'}}> CHOOSE A SALON  </h5> 
            <div className='f fcenter cl-salons' > 
            {salons.map(el=>(
                <div key={el._id} onClick={()=>setSalon(el.location)} className={salon === el.location? 'adm-link f fcenter cl-act':'adm-link f fcenter'}>{el.location}</div>
            ))}
            </div>
            {salon && <h2 style={{color:'var(--text)'}} >{salon}</h2>}
            { salon && <div className='f cl-sort'>
                <button onClick={sortDate} className='f fcenter'>DATE {sortDates? <i className="fas fa-sort-amount-down-alt fa-2x"></i>: <i className="fas fa-sort-amount-up fa-2x"></i>}</button>
                <button onClick={sortName} className='f fcenter' >NAME {sortNames? <i className="fas fa-sort-alpha-up fa-2x"></i>: <i className="fas fa-sort-alpha-down-alt fa-2x"></i>}</button>
            </div>}
            {names.map(el=> (
                <div key={el._id} className='cl-cards f fc'>
                    <h3 style={{color:'var(--spray)'}} >{el.name}</h3>
                    <div><h4>Phone:</h4>{el.phone}</div>
                    <div><h4>Service:</h4> {el.service}</div>
                    <div><h4>Specialist:</h4> {el.spec}</div>
                    <div><h4>Date:</h4> {el.date[0]}</div>
                    <div><h4>Time:</h4> {el.date[1]}</div>
                    {confirm.sts && el._id === confirm.id?
                    <div style={{gap: '14px'}} className='f fc'>
                        <h5 style={{color:'crimson'}}>Are You Sure?</h5>
                        <div style={{gap: '38px'}} className='f fcenter'>
                        <button onClick={()=>removeItem('BookModel',  `/api/admin/models-utils/${el._id}`, setLoad, setErr, setMsg)   } className='cl-yes-btn f fcenter'>YES</button>
                        <button className='cl-no-btn f fcenter' onClick={()=>setConfirm({sts:false, id:''})}>NO</button>
                        </div>
                    </div>:
                        <button onClick={()=>setConfirm({sts:true, id:el._id})} className='cl-btn f fcenter ' >Remove <i className="fas fa-trash"></i></button>
                        }
                     </div>
            ))}
        </div>
        
        </AdminPanel>
</Box> 
    )
}

export default ClientsList

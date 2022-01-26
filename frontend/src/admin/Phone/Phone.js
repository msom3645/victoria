import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Back} from '../../components/Arrows'
import Box from '../../components/Box'
import AdminPanel from '../../components/AdminPanel'

import '../admin.css'

const Phone = () => {
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState()
    const [list, setList] = useState()
    const [phone, setPhone] = useState('')
    const [phone2, setPhone2] = useState('')
    const [disable, setDisable] = useState(true)
    const user = JSON.parse(localStorage.getItem('Victoria_')) 
    useEffect(()=>{
        const fetch = async()=>{
            setLoad(true)
              try{
                  const {data} = await axios.get('http://localhost:5000/api/admin/phone', {headers:{ Authorization: `Bearer ${user.token}` }})
                    setList(data)
                    setPhone(data.phone)
                    setPhone2(data.phone2)
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
                try{
                    const {data} = await axios.put('http://localhost:5000/api/admin/phone', {phone, phone2}, {headers:{ Authorization: `Bearer ${user.token}` }})
                    setMsg(data.message)
                    setLoad(false)
                }catch(e){
                    e.response && e.response.data.message?setErr(e.response.data.message):setErr(e.message)
                    console.log(e.response.data.message)
                    setLoad(false)
                }
            }
    useEffect(()=>{
        {phone !== list?.phone || phone2 !== list?.phone2? setDisable(false): setDisable(true)}
    },[phone, phone2])
    return (
        <Box load={load} err={err} msg={msg} setErr={setErr} setMsg={setMsg} admin={true}>
            <AdminPanel>
        <form className='adm-form f fc' onSubmit={send}>
            <Back/>
                <p> Edit  </p>
              <input defaultValue={list?.phone} style={{borderColor:'var(--spray)'}} onChange={e=>setPhone(e.target.value)} placeholder='Phone'/>
              <input id='phone2' defaultValue={list?.phone2} style={{borderColor:'var(--spray)'}} onChange={e=>setPhone2(e.target.value)} placeholder='Phone 2 (if needed)' />
              <button disabled={disable} type='submit' className='send-btn' >Save</button>  
        </form>
            </AdminPanel>
        </Box>
    )
}

export default Phone

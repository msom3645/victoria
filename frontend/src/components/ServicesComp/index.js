import React,{useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import './services.css'
const ServicesComp = () => {
    const [list, setList] = useState([])
    useEffect(()=>{
        const fetch = async()=>{
              try{
                  const {data} = await axios.get('/api/admin/services')
                  setList(data)
              }catch(e){
                  console.log(e.response)
              }
          }
          fetch()
      },[])
      
    return (
        <div className='serv-fr f fc fcenter'>
                        <NavLink to="/services" className={(navData) => (navData.isActive ? "nav-link x-active" : 'caption')}>Services</NavLink>            

                <div className='services f fcenter'>
                {list?.map(e=>(
                    <NavLink to={`/services/${e._id}`} className={(navData)=>(navData.isActive? 'nav-link x-active': 'serv-item f feven fc')}  key={e._id}>
                        <img src={`/uploads/services/${e.img}`} alt='img'/>
                        <h4>{e.service}</h4>
                        <h5>{e.title}</h5>
                        <div className='serv-desc'>{e.desc.substring(0,60)} ... </div>
                     </NavLink>
                ))}
                </div>
        </div>
    )
}

export default ServicesComp

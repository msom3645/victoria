import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import './foot.css'
const Footer = () => {
    const [phones, setPhones] = useState('')
    const links = [...document.querySelectorAll('.nav-link')]    
    useEffect(()=>{
        const fetch = async()=>{
              try{
                  const {data} = await axios.get('/api/admin/phone')
                setPhones(data)         
              }catch(e){
                  console.log(e)
              }
          }
          fetch()
      },[])
      
    return (
        <div className='foot f fcenter'>
            <div className='about'>
                <h4>About</h4>
                <p>The Best Hair cut and Color Salon experiences in Manhattan New York City and the Poconos by renowned Hairstylist Jack Stone.</p>
            </div>
            <div className='phones'>
                <div className='phone'>
                <i className="phone-ic fas fa-phone-alt"></i> <a href={`tel: ${phones.phone}`} className='phone-num'>{phones.phone}</a>
                     </div>
                     {phones.phone2 &&  <div className='phone'>
                     <i className="phone-ic fas fa-phone-alt"></i>
 <a href={`tel: ${phones.phone2}`} className='phone-num'>{phones.phone2}</a>
                     </div>}

            </div>
            <div className='menu f fcenter'>
                {links?.map((e,i)=>(
                                <NavLink to={`/${e.innerHTML.toLowerCase().replaceAll(' ','')}`} key={i} className={(navData)=>(navData.isActive?'foot-link x-active': 'foot-link')} > {e.innerHTML}</NavLink>
                ))}
            </div>
            <div className='hours'>
                <h4>Salon Hours </h4>
                <div>
                <p>SUNDAY - FRIDAY</p>
                <p>10:00AM - 10:00PM</p>
                </div>
            </div>
            
        </div>
    )
}

export default Footer

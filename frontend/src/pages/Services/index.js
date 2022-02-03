import React,{useEffect, useState} from 'react'
import axios from 'axios'
import './services.css'
import {Link} from 'react-router-dom'
const Services = () => {
    const [list, setList] = useState([])
    useEffect(()=>{
        const fetch = async()=>{
              try{
                  const {data} = await axios.get('/api/admin/services')
                  setList(data)
                }catch(e){
                    console.log(e)
                }
            }
            fetch()
        },[])
    return (
        <div className='servs-fr f fcenter'>
            <h2 className='page-cap'>OUR SERVICES</h2>
            {list.map(e=>(
                <div className='servs-card f fc' key={e._id}>
                    <div className='f fc servs-up'>
                    <h2 className='servs-service'>{e.service}</h2>
                    <h3 className='servs-title'>{e.title}</h3>
                    <div className='servs-imgcont'>
                    <img className='servs-img' src={e.pic} alt={e.img}/>
                    </div>
                    </div>
                    <div className='servs-desc'>{e.desc}</div>
                    <div style={{marginTop:'auto'}}>
                    <div className='servs-bottom f fc'>
                    <h3 className='servs-price'>Price: ${e.price}</h3>
                    <h3 className='servs-dur'>Duration: {e.duration}</h3>
                    </div>                    
                    </div>
                    {/* <div style={{width:'100%', margin:'8px 0px'}} > 
                    <Link to={'/booknow'} className='servs-book-btn'>BOOK NOW</Link>
                    </div> */}
                </div>
            ))}
        </div>
    )
}

export default Services

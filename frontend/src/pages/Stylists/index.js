import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './stylists.css'
const Stylists = () => {
    const [list, setList] = useState([])
    useEffect(()=>{
        const fetch = async()=>{
              try{
                  const {data} = await axios.get('/api/admin/stylists')
                  setList(data)
                }catch(e){
                    console.log(e)
                }
            }
            fetch()
        },[])
    return (
        <div className='st-fr f fcenter'>
            <h2 className='page-cap'>MEET THE TEAM</h2>
            {list.map(e=>(
                <Link to={'/stylists/'+e._id} className='st-card f fc' key={e._id}>
                    <div className='st-imgcont'>
                    <img className='st-img' src={'/uploads/stylists/'+e.img} alt={e.img}/>
                    </div>
                    <h3 className='st-name'>{e.name}</h3>
                    <p className='st-title'>{e.title}</p>
                    
                </Link>
            ))}
        </div>
    )
}

export default Stylists

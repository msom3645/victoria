import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './services.css'
const Service = () => {
    const [list, setList] = useState({})
    const {id} = useParams()
    useEffect(()=>{
        const fetch = async()=>{
              try{
                  const {data} = await axios.post(`http://localhost:5000/api/admin/models-utils/${id}`, {model:'ServicesModel'})
                setList(data)
              }catch(e){
                  console.log(e)
              }
          }
          fetch()
      },[])
      console.log(list)
    return (
        <div className='serv-fr f fc'>
            <h1 className='serv-cap' >{list.service}</h1>
            <div className='serv-img-cont'>
                <img className='serv-img' src={`/uploads/services/${list.img}`} alt=''/>
            </div>
            <h3 className='serv-cap' >{list.title}</h3>
            <p className='serv-desc'>{list.desc}</p>
            <h3 className='serv-items'>Price: ${list.price}</h3>
            <h3 className='serv-items'>Duration: {list.duration}</h3>
        </div>
    )
}

export default Service

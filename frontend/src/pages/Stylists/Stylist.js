import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './stylists.css'
const Stylist = () => {
    const [list, setList] = useState({})
    const {id} = useParams()
    useEffect(()=>{
        const fetch = async()=>{
              try{
                  const {data} = await axios.post(`/api/admin/models-utils/${id}`, {model:'StylistsModel'})
                setList(data)
              }catch(e){
                  console.log(e)
              }
          }
          fetch()
      },[])


    return (
        <div className='f fc st-fr-about'>
            <div className='st-up f'>
            <div className='st-cont'>
                <img className='st-img-about' src={'/uploads/stylists/'+list.img} alt={list.name}/>
            </div>
                <div  style={{gap:'12px'}} className='f fc' >
                <h3 className='st-name' >{list.name}</h3>
                <p>{list.title}</p>
                </div>
            </div>
                <p className='st-about'>{list.desc}</p>
        </div>
    )
}

export default Stylist

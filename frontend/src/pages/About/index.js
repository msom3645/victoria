import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './about.css'
const About = () => {
    const [list, setList] = useState([])
    useEffect(()=>{
        const fetch = async()=>{
              try{
                  const {data} = await axios.get('http://localhost:5000/api/admin/about')
                  setList(...data)
                }catch(e){
                    console.log(e)
                }
            }
            fetch()
        },[])
    return (
        <div className='about-fr f fc fcenter'>
            <h2 className='page-cap'>VICTORIA STORY</h2>
            <div className='about-cols f fcenter'>
            <img className='about-img' src={`/uploads/about/${list.img}`} alt={list.img}/>
            <div className='f' >
            <i className="fas fa-quote-left about-q"></i>
            <h3 className='about-cit1'>{list.citation}</h3>
            </div>
            <p className='about-text'>{list.text}</p>
            <div className='f' >
            <i className="fas fa-quote-left about-q"></i>
            <h3 className='about-cit2'>{list.citation2}</h3>
            </div>
            </div>
            <h4 className='about-welc'>Come and experience Salon Victoria and get the exceptional service that you
deserve!</h4>
        </div>
    )
}

export default About

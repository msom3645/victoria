import axios from 'axios'
import React, {useEffect, useState, useRef} from 'react'
import {Left, Right} from '../Arrows'
import {NavLink} from 'react-router-dom'
import './stylists.css'

const StylistsComp = () => {
    const [list, setList] = useState([])
    const [sts, setSts] = useState(true)
    const [step, setStep] = useState(true)
    const [act, setAct] = useState(true)
    const [move, setMove] = useState(0)

const t = useRef(null)

const card = {
    transition: step && '0.2s',
    transform: `translateX(${move}px)`
}

useEffect(()=>{
    const fetch = async() =>{
        try{
            const {data} = await axios.get('/api/admin/stylists')
            setList(data)
        }catch(e){
            console.log(e)
        }
    }
    fetch()
},[])



const left = () => {
    setAct(false)
    setMove(-250)   
    setStep(true)
    let slider = document.querySelector('.styl-fr')
    let slide = document.querySelectorAll('.styl-card')
    slide[0].style.opacity = '.2'
    let t2 = setTimeout(()=>{
        slider.appendChild(slide[0])
        slide[0].style.opacity = '1'
        setStep(false)
        setMove(0)
        setAct(true)
        clearTimeout(t2) 
    },200)
}
const right = () => {
    setAct(false)
    setMove(+250)   
    setStep(true)
    let slider = document.querySelector('.styl-fr')
    let slide = document.querySelectorAll('.styl-card')
    // slide[3].style.opacity = '.2'
    let t3 = setTimeout(()=>{
        slider.insertBefore(slide[slide.length-1],slide[0])
        // slide[3].style.opacity = '1'
        setStep(false)
        setMove(0)
        setAct(true)
        clearTimeout(t3) 
    },200)
}

const reset = () => {
    if(t.current){
      clearTimeout(t.current)
    }
    
    
  }
  useEffect(()=>{ 
    if(sts){
      reset()
    t.current = setTimeout(() => {
      left()
    }, 4000)
    }
    return () => {
      reset()
    }
  }, [move, sts])




    return (
            <div className='f fc'>
                    <NavLink to="/services" className={(navData) => (navData.isActive ? "nav-link x-active" : 'styl-caption')}>Specialists</NavLink>            
                <div className='styl-fr' onMouseOver={()=>setSts(false)} onMouseOut={()=>setSts(true)}>                
           {list.map((e,i) =>(
               <NavLink to={`/stylists/${e._id}`.toLowerCase()} style={card} key={i} className={(navData)=>(navData.isActive? 'nav-link x-active': 'styl-card f fc feven')}>
                    <img className='styl-img' src={`/uploads/stylists/${e?.img}`} alt={e?.img} />
                   <h3>{e.name}</h3>
                   <p>{e.title}</p>
               </NavLink>
        ))}
                     <button style={{background:'none'}} className='styl-l' onMouseOver={()=>setSts(false)} onMouseOut={()=>setSts(true)} onClick={act? left: undefined}>
                         <Left/>
                     </button>
                     <button style={{background:'none'}} className='styl-r' onMouseOver={()=>setSts(false)} onMouseOut={()=>setSts(true)} onClick={act? right: undefined}>
                         <Right/>
                     </button>                
            </div>
            </div>
    )
}

export default StylistsComp

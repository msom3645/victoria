import React,{useState, useEffect, useRef} from 'react'
import './slider.css'
import axios from 'axios'
import {Left, Right} from '../Arrows'
const SliderComp = () => {
  const [num, setNum] = useState(0)
  const [sts, setSts] = useState(true)
  const [list, setList] = useState([])
  const t = useRef(null)
  const len = list?.length

  useEffect(()=>{
    const fetch = async()=>{
          try{
              const {data} = await axios.get('http://localhost:5000/api/admin/slider')
              setList(data)
          }catch(e){
              console.log(e.response)
          }
      }
      fetch()
  },[])

  const reset = () => {
    if(t.current){
      clearTimeout(t.current)
    }
  }
  
  useEffect(()=>{ 
    if(sts){
      reset()
    t.current = setTimeout(() => {
      setNum(prev => prev === len-1?0:prev+1)
    }, 5000)
    }
    return () => {
      reset()
    }
  }, [num, sts])
  
  const r = () => {
    setNum(prev => prev === len-1?0:prev+1)
  }
  const l = () => {
    setNum(prev => prev===0? len-1: prev-1)
  }
  return (
    <>
    <div className="slider">
      <img src={`/uploads/slider/${list[num]?.img}`} alt="" />
    <div onMouseOver={()=>setSts(false)} onMouseOut={()=>setSts(true)} className="slider-btns f fcenter">
       <button style={{background:'none'}} onClick={l}>
       <Left/>
       </button>
       <button style={{background:'none'}} onClick={r}>
       <Right/>
       </button>
    </div>
    <div className="s-dots f fcenter">
      {list?.map((e,i)=>(
      <button onClick={()=>setNum(i)} className={num === i? 's-dot-act':'s-dot'} key={i}> </button>
      ))}
    </div>    
    <div className='s-text'>
      <p>{list[num]?.uptext}</p>
      <p>{list[num]?.bmtext}</p>
    </div>
  </div>
  </>
  )
}

export default SliderComp

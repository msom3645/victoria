import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './arrows.css'

export const Back = () => {
    let h = useNavigate()
    
    return (
        <button className='l-fr fbtn f' onClick={()=> h(-1)}>
        <div className='left'> </div>
    </button>
    )}

    export const Up = () => {
        const [act, setAct] = useState(false)
        useEffect(()=>{
            window.addEventListener('scroll', e=>{
                if(window.scrollY>0){
                    setAct(true)
                }else{
                    setAct(false)
                }
            })
        })
        const goUp = ()=>{
            window.scroll({top:0, left:0, behavior:'smooth'})
    }
    return (
        <button style={{display: act?'block':'none'}} className='l-fr up-btn f' onClick={goUp} >
            <div className='up'> </div>
        </button>
    )
}

export const Left = ()=> {
    return (
        <div className='l-fr f'>
            <div className='left'> </div>
        </div>
    )
}
export const Right = () => {
    return (
        <div className='l-fr f'>
            <div className='right'> </div>
        </div>
    )
}












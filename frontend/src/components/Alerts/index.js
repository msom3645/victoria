import React from 'react'
import './alerts.css'
const warn = {
    fontWeight:'700',
    fontSize: '22px',
    padding: '0px 18px',
    fontStyle:'Italic',
    color:'#fc3a52'
}

const done={
    height: '12px',
    width: '20px',
    borderLeft: '3px solid #3baea0',
    borderBottom: '3px solid #3baea0',
    transform: 'rotate(-40deg)',
    transformOrigin: '0% 100%',
    margin: '4px 8px 0px 4px',

        }

export const Err = ({err}) => {
    return (
        <div className='screen'>
            <div className='msg-alert err f fcenter' style={{background:'#f4aeba'}} >
           <span style={warn}>!</span>{err}
        </div>
        </div>
    )
}
export const Msg = ({msg}) => {
    return (
        <div className='screen'>
            <div className='msg-alert msg f fcenter' style={{background:'#bbe9db'}} >
         <span style={done}></span> {msg}
        </div>
        </div>
    )
}



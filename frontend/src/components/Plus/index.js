import React from 'react'
const Plus = ({color}) => {

    const fr = {
        position: 'relative'
   }
   
    const g = {
       width: '30px',
       height: '4px',
       background: color
    }

    const v = {
        position: 'absolute',
        top:'0',
        left: '0',
        width: '30px',
        height: '4px',
        transform: 'rotate(90deg)',
        background: color
    }

    return (
        <div style={fr}>
            <div style={g}></div>
            <div style={v} ></div>
        </div>
    )
}

export default Plus

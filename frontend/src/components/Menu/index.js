import React from "react"
import './menu.css'
const Menu = ({setSts, sts}) => {

    return (
            <div  onClick={()=>setSts(e=>!e)} className={sts?'menu-btn close':'menu-btn'}>    
                <div className='menu-burg'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
    )
}
export default Menu
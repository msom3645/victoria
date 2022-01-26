import React from 'react'
import { NavLink } from 'react-router-dom'
import './map.css'
const MapComp = () => {
    return (
        <div className='map-fr'>
            <div className='map-caption f fcenter'>
            <NavLink to='/contacts' className={(navData)=>(navData.isActive?'nav-link x-active': 'map-link')} >Our Salons</NavLink>
            </div>
            <iframe className='map-adr' src="https://www.google.com/maps/d/u/0/embed?mid=1CJxUqAus_D8VOy4WhvxWQ9YliiM69CV5&ehbc=2E312F" ></iframe>
        </div>
    )
}

export default MapComp

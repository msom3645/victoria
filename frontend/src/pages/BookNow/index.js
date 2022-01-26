import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import {Err} from '../../components/Alerts'
import {timer} from '../../utils'
import './book.css'
const BookNow = () => {
    const [err, setErr] = useState()
    const [msg, setMsg] = useState()
    const [list, setList] = useState([])
    const [salon, setSalon] = useState()
    const [specs, setSpecs] = useState([])
    const [services, setServices] = useState([])
    const [datesNa, setDatesNA] = useState([])
    const [service, setService] = useState('')
    const [spec, setSpec] = useState('')
    const [phone, setPhone] = useState('_')
    const [name, setName] = useState('')
    const [hour, setHour] = useState('')
    const [day, setDay] = useState('')
    const [frame, setFrame] = useState(true)
    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const [booked, setBooked] = useState(false)

    
    const [hoursNA, setHoursNA] = useState([])
    const hours = ['10:00 AM', '11:00 AM', '12:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']   
    err && timer(setErr, 3000)
    msg && timer(setMsg, 2000)

    const chooseSalon = async(salon) =>{
        setFrame(false)
        setSalon(salon.location)
        try{
            const {data} = await axios.post('http://localhost:5000/api/admin/stylists', {salon:salon.location})
            setStep1(true)
        setSpecs(data)
      }catch(e){
          console.log(e)
      }
    }

    const backStep1 = () => {
        setStep1(false)
        setFrame(true)
    }
    const backStep2 = () => {
        setStep2(false)
        setStep1(true)
        setDay('')
        setHour('')
    }
    const backStep3 = () => {
        setStep3(false)
        setStep2(true)
    }

    const findDates = async() => {
        try{
            const {data} = await axios.post('http://localhost:5000/api/admin/book-dates',{salon, spec})
            setStep1(false)
            setStep2(true)
            setDatesNA(data)
          }catch(e){
              console.log(e)
          }
    }

    const toPerson = () => {
    setStep2(false)
    setStep3(true)
    }

    const dateHandler = (e) =>{       
        const hours = []
            setDay(e)
            datesNa.map(item=>{
                if(item.date[0] === e){
                    hours.push(item.date[1])
                    setHoursNA([...hoursNA, item.date[1]])
                                    }
            })
            setHoursNA(hours)
    }

    const bookNow = async () =>{
          try{
            const {data} = await axios.post('http://localhost:5000/api/admin/book', {name, phone, salon, date:[day, hour], spec, service})
            setBooked(true)
            setStep3(false)
        }catch(e){
            e.response && e.response.data.message?
                    setErr(e.response.data.message):
                    console.log(e.response)
        }
    }

    useEffect(()=>{
        const fetch = async()=>{
              try{
                  const {data} = await axios.get('http://localhost:5000/api/admin/contacts')
                  setList(data)
                }catch(e){
                    console.log(e.response)
                }
            }
            fetch()
        },[])

    useEffect(()=>{
        const fetch = async()=>{
              try{
                  const {data} = await axios.get('http://localhost:5000/api/admin/services')
                  setServices(data)
                }catch(e){
                    console.log(e)
                }
            }
            fetch()
        },[])    
    
    return (
        <div className='book-fr'>
            {err &&  <Err err={err}/>}
                     {frame?
                     <div className='f fc'>
                     <h2 className='page-cap'>CHOOSE A SALON</h2>
                     {list.map(item=> (
                         <div onClick={()=>chooseSalon(item)} className='adm-link f fcenter' key={item._id}> 
                         {item.location}
                     </div>
                     ))}    
                </div>
                : step1 ?
                <div className='book-serv f fcenter fc'>
                    <h2 style={{color:'var(--black)'}}>{salon}</h2>
                    <select onChange={e=>setService(e.target.value)}>
                    <option hidden >SERVICE</option>
                    {services.map(serv =>(
                        <option key={serv._id}>
                                {serv.title}
                            </option>
                        ))}
                    </select>
                    <select  onChange={e=>setSpec(e.target.value)}>
                     <option hidden >SPECIALIST</option>
                            {specs.map(e=>(
                            <option key={e._id}>{e.name}</option>
                            ))}
                    </select>
                    <div style={{gap:'30px'}} className='f fcenter'>
                    <button onClick={backStep1} className='book-btn-back'> <span className='book-arr-back'> <i className="fas fa-chevron-left"></i></span> BACK </button>
                    <button disabled={!service || !spec} onClick={findDates} className='book-btn'>NEXT <span className='book-arr'> <i className="fas fa-chevron-right"></i></span></button>
                    </div>
                </div>: step2?
                <div className='book-date f fc fcenter'>
                    <h2 style={{color:'var(--black)'}}>{salon}</h2>
                    
                    <input type='date' min={new Date().toISOString().split('T')[0]}
        className='book-date-inp' onChange={e=>dateHandler(e.target.value)} /> 
                 
                { day&& 
                    <div style={{width: '320px', gap:'16px'}} className='f fcenter'>
                        <h3 style={{width:'320px', color:'yellowGreen'}} className='f fcenter'>{new Date(day).toLocaleString('default', { month: 'long' })} {day.split('-').slice(-1)[0]}</h3>
                        <h4 style={{width:'320px', color:'var(--spray)'}} className='f fcenter'>CHOOSE TIME</h4>
                        
                        {hours.map((e,i)=>(
                    <div key={i} className={hoursNA && hoursNA.includes(e)?'book-hour f fcenter book-time-disable':hour && hour===e? 'book-hour f fcenter book-time-act': 'book-hour f fcenter'} onClick={e=>setHour(e.target.innerHTML)}>{e}</div>
                        ))}                        
                    </div>
                }
                <div style={{gap:'30px'}} className='f fcenter'>
                    <button onClick={backStep2} className='book-btn-back'> <span className='book-arr-back'> <i className="fas fa-chevron-left"></i></span> BACK </button>
                    <button disabled={!hour || !day} onClick={toPerson} className='book-btn'>NEXT <span className='book-arr'> <i className="fas fa-chevron-right"></i></span></button>
                    </div>
                </div>
            : step3?
                <div className='book-person f fc'>                   
                    <h2 style={{color:'var(--black)'}}>{salon}</h2>
                    
                    
                    <div>
                    <input defaultValue={name} type='text' onChange={e=>setName(e.target.value)} placeholder='Name'/>
                    </div>
        
        <NumberFormat defaultValue={phone} onChange={e=>setPhone(e.target.value)} allowEmptyFormatting format="+020 (###) ###-####" mask="_" />
                
        <div style={{gap:'30px'}} className='f fcenter'>
                    <button onClick={backStep3} className='book-btn-back '> <span className='book-arr-back'> <i className="fas fa-chevron-left"></i></span> BACK </button>
                    
                    <button disabled={!name || phone.slice(-1) === '_'} onClick={bookNow} className='book-now-btn'>BOOK NOW </button>
                    </div>
                    </div>: booked &&
                        <div className='book-booked f fc'>
                            <h2 style={{color:'var(--spray)'}}>Great, You`re booked!</h2>
                            <Link className='book-btn' to='/'>On Site</Link>
                            </div>
                    }
            </div>
            
    )
}

export default BookNow

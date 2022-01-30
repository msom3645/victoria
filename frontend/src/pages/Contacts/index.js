import React,{useState, useEffect} from 'react'
import './contacts.css'
import axios from 'axios'
const Contacts = () => {
    const [list, setList] = useState([])
    useEffect(()=>{
        const fetch = async()=>{
              try{
                  const {data} = await axios.get('/admin/contacts')
                  setList(data)
                }catch(e){
                    console.log(e)
                }
            }
            fetch()
        },[])
        
    return (
        <div className='contacts-fr f fc'>
            <h2 className='page-cap'>OUR SALONS</h2>
            <div className='f fcenter contacts-card'>
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3016.769979423842!2d-74.10842876850892!3d40.876921871562836!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f9443694da57%3A0xd553343092afdbb9!2s260%20Pierre%20Ave%2C%20Garfield%2C%20NJ%2007026%2C%20USA!5e0!3m2!1sen!2sru!4v1641286196090!5m2!1sen!2sru" 
width="340" height="240" style={{border:'0'}} allowFullScreen="" loading="lazy"></iframe>
                <div className='f fc feven contacts-data'>
                <div><span>LOCATION:</span> {list[0]?.location}</div>
                <div><span>PHONE:</span> {list[0]?.tel}</div>
                <div><span>SALON HOURS:</span> {list[0]?.period}</div>
                </div>
            </div>

            <div className='f fcenter contacts-card'>
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3016.593634813569!2d-74.09619789540105!3d40.880791304928884!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f966a23954a5%3A0x10ee36a25a290a7c!2s484%20MacDonald%20St%2C%20Garfield%2C%20NJ%2007026%2C%20USA!5e0!3m2!1sen!2sru!4v1641287115056!5m2!1sen!2sru" 
width="340" height="240" style={{border:'0'}} allowFullScreen="" loading="lazy"></iframe>
                <div className='f fc feven contacts-data'>
                <div><span>LOCATION:</span> {list[1]?.location}</div>
                <div><span>PHONE:</span> {list[1]?.tel}</div>
                <div><span>SALON HOURS:</span> {list[1]?.period}</div>
                </div>
            </div>

            <div className='f fcenter contacts-card'>
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3016.428377929183!2d-74.0830014270478!3d40.88441717240213!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2fbd556c203a9%3A0x1b78bf2300b4131!2s81%20Avenue%20E%2C%20Lodi%2C%20NJ%2007644%2C%20USA!5e0!3m2!1sen!2sru!4v1641287197104!5m2!1sen!2sru" 
                width="340" height="240" style={{border:'0'}} allowFullScreen="" loading="lazy"></iframe>
                <div className='f fc feven contacts-data'>
                <div><span>LOCATION:</span> {list[2]?.location}</div>
                <div><span>PHONE:</span> {list[2]?.tel}</div>
                <div><span>SALON HOURS:</span> {list[2]?.period}</div>
                </div>
            </div>


            
            </div>
    )
}

export default Contacts

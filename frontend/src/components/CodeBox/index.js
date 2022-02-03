import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import { timer } from '../../utils'
const main = {
    display:'flex',
    justifyContent: 'center',
    paddingTop:'20vh'
}

const mfr = {
    position: 'relative',

}

const fr = {
    background: 'var(--black)',
    width:'350px',
    gap:'18px',
    padding:'26px 8px',
    boxShadow: '0 0 10px var(--spray), 0 0 10px var(--spray)',
    borderRadius: '4px'
}

const inp = {
    width: '152px',
    letterSpacing: '12px',
    fontSize:'40px',
    background: 'var(--cream)'
}

const t = {
    fontSize: '12px',
    color: 'var(--cream)',
    gap: '6px'
}

const e = {
    maxWidth:'300px',
    color: 'var(--spray)'
}

const b = {
    padding: '1px 6px',
    fontSize: '12px',
    minWidth: '152px'
}

const done = {
    position: 'absolute',
    width: '100% ',
    height: '100%',
    background:'var(--black)',
    top:'0',
    left: '0',
    borderRadius:'4px'
}

const circ = {
    background: 'var(--cream)',
    borderRadius: '50%',
    height: '140px',
    width: '140px',
    boxShadow: '0px 0px 10px inset var(--spray), 0px 0px 10px inset var(--spray)'
}

const yes = {
    height: '40px',
    width: '70px',
    borderLeft: '10px solid var(--spray)',
    borderBottom: '10px solid var(--spray)',
    transform: 'translate(38px, 70px) rotate(-45deg)',
    transformOrigin: '0 0'
}

const CodeBox = ({rand, email, text, setErr, f, f2, ok}) => {
    const [rand2, setRand2] = useState('')
    const [limit, setLimit] = useState(0)
    const [count, setCount] = useState(0)
    const h = useNavigate()

    const compare = () => {
        if(rand === Number.parseInt(rand2)){
        f2()
        }else{
            setErr('Invalid OTP. Please check your code and try again.')
        }
    }
    

    count > 0  && timer(()=>setCount(count-1),1000)
    limit > 3 && timer(()=> h('/'),3000)
    
    const resend = () => {
        
        setCount(60)
        setLimit(0)
        setRand2('')
        f()
    }

    useEffect(()=>{
        if(rand2?.length === 4){
            setLimit(limit+1)
            if(limit<3){
                compare()
            }
        }
    }, [rand, rand2])
    return (
        <div style={main}>
            <div style={mfr}>
            <div className='f fc' style={fr} >
            <div className='f fc' style={t}>
                <p>{text} </p>
             <h4 style={e}>{email}</h4>
            <h3>Enter it below:</h3>
            </div>
            
            <input autoFocus='on' value={rand2} onChange={e=>setRand2(e.target.value)} style={inp} maxLength='4'/>
            {count>0? <button disabled className='send-btn' style={b}>Resend OTP <span style={{color:'red'}}>{count}</span></button>:
            <button onClick={resend} className='send-btn' style={b}>Resend OTP code</button>
            }
        </div>
        {ok && <div className='f fcenter' style={done}>
            <div style={circ}>
                <div style={yes}></div>
            </div>
        </div>}
        {limit>3 && <div className='f fcenter' style={done}>
            <h3 style={{color:'red'}}>
                To many trials, try later!
            </h3>
        </div>}
            </div>
        </div>
    )
}

export default CodeBox

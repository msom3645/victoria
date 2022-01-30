import axios from 'axios'
import imageCompression from 'browser-image-compression'
const user = JSON.parse(localStorage.getItem('Victoria_'))

export const timer = (f, time)=>{
    let t
   window.clearTimeout(t)
 
  t = window.setTimeout(
  f, time)
         }
   
export const emailValid = (email) => {

            if(email && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return 'Enter correct email address'
            }
        }
        

export const compressImg = async(img, setErr,setLoad, size, f) => {            
        if(img){
            const exts = ['image/png', 'image/jpeg', 'jpg']
            if(img.size > 1048576){
                setErr('Too large image size!')
                setLoad(false)
            }else if(!exts.includes(img.type)){
                setErr('JPEG, JPG, PNG files only!')
                setLoad(false)
            }else{
                console.log(`originalFile size ${img.size / 1024 / 1024} MB`);
                const options ={
                    maxSize: 0.06,
                    maxWidthOrHeight: size,
                    useWebWorker: true
                }
                try{
                    const compressed = await imageCompression(img, options)
                    console.log(`compressedFile size ${compressed.size / 1024 / 1024} MB`);
                    f(compressed)
                }catch(e){
                    setErr(e)
                    setLoad(false)
                }
            }
        }else{
            f()
        }
        }


export const removeItem = async(model, path, setLoad, setErr, setMsg, imgPath) => {
    setLoad(true)
    try{
        const {data} = await axios.delete(path, {
            headers: {
                authorization: `Bearer ${user.token}`
            },
            data: {
                model,
                imgPath
            }
        })
        setMsg(data.msg)
        setLoad(false)
    }catch(e){
        setErr(e)
        setLoad(false)
        console.log(e)
    }
}
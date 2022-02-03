import React,{lazy, Suspense} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AdminPage from './admin/AdminPage'
import RegPage from './auth/RegPage'
import LoginPage from './auth/LoginPage'
import ResetPass from './auth/ResetPass'
import {Loading} from './components/Loading'
import {Up, Back} from './components/Arrows'
import BookNow from './components/BookNow'
function App() {
  const Slider = lazy(()=>import('./admin/Slider/Slider'))
  const AddSlider = lazy(()=>import('./admin/Slider/AddSlider'))
  const EditSlider = lazy(()=> import('./admin/Slider/EditSlider'))
  const Services = lazy(()=>import('./admin/Services/Services'))
  const AddService = lazy(()=>import('./admin/Services/AddService'))
  const EditService = lazy(()=> import('./admin/Services/EditService'))
  const Stylists = lazy(()=>import('./admin/Stylists/Stylists'))
  const AddStylist =lazy(()=>import('./admin/Stylists/AddStylist'))
  const EditStylists =lazy(()=>import('./admin/Stylists/EditStylist'))
  const Contacts = lazy(()=> import('./admin/Contacts/Contacts'))
  const AddContact = lazy(()=>import('./admin/Contacts/AddContact'))
  const EditContact = lazy(()=> import('./admin/Contacts/EditContact'))
  const EditPhones = lazy(()=>import('./admin/Phone/Phone'))
  const EditAbout = lazy(()=>import('./admin/About/EditAbout'))
  const ClientsList = lazy(()=>import('./admin/Clients/ClientsList'))

  const Navbar = lazy(()=>import('./components/Navbar'))
  const Footer = lazy(()=>import('./components/Footer'))
  const ServicesComp = lazy(()=>import( './components/ServicesComp'))
  const SliderComp = lazy(()=>import( './components/SliderComp'))
  const StylistsComp = lazy(()=>import( './components/StylistsComp'))
  const MapComp = lazy(()=>import( './components/MapComp'))

  const AboutPage = lazy(()=>import('./pages/About'))
  const ContactsPage = lazy(()=>import('./pages/Contacts'))
  const StylistsPage = lazy(()=>import('./pages/Stylists'))
  const StylistPage = lazy(()=>import('./pages/Stylists/Stylist'))
  const BookNowPage = lazy(()=>import('./pages/BookNow'))
  const ServicesPage = lazy(()=>import('./pages/Services'))
  const ServicePage = lazy(()=>import('./pages/Services/Service'))
  const ProfilePage = lazy(()=>import('./pages/Profile'))
    
  return (

    <BrowserRouter>
    
        
      <Routes>
          <Route path='/reg' element={<RegPage/>} />      
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/reset-pass' element={<ResetPass/>} />
          <Route exact path='/admin-panel' element={<AdminPage/>} />

          <Route exact path='/admin-panel/slider' element={<Suspense fallback={<Loading/>}><Slider/></Suspense>}/>        
          
          <Route path='/admin-panel/slider/add' element={<Suspense fallback={<Loading/>}><AddSlider/></Suspense>} /> 

          <Route path='/admin-panel/slider/:id' element={<Suspense fallback={<Loading/>}> <EditSlider/></Suspense>} />
            
          <Route exact path='/admin-panel/services' element={<Suspense fallback={<Loading/>}><Services/></Suspense>}/>
            
          <Route path='/admin-panel/services/add' element={<Suspense fallback={<Loading/>}><AddService/></Suspense>} />
            
          <Route path='/admin-panel/services/:id' element={<Suspense fallback={<Loading/>}><EditService/></Suspense>} />
            
          <Route exact path='/admin-panel/stylists' element={<Suspense fallback={<Loading/>}><Stylists/></Suspense>} />
            
          <Route path='/admin-panel/stylists/add' element={<Suspense fallback={<Loading/>}><AddStylist/></Suspense>} />
            
          <Route path='/admin-panel/stylists/:id' element={<Suspense fallback={<Loading/>}><EditStylists/></Suspense>} />
            
          <Route exact path='/admin-panel/contacts' element={<Suspense fallback={<Loading/>}><Contacts/></Suspense>} />
            
          <Route path='/admin-panel/contacts/add' element={<Suspense fallback={<Loading/>}><AddContact/></Suspense>}/>

          <Route path='/admin-panel/contacts/:id' element={<Suspense fallback={<Loading/>}><EditContact/></Suspense>}/>
            
          <Route path ='/admin-panel/phone' element={<Suspense fallback={<Loading/>}><EditPhones/></Suspense>} />

          <Route path='/admin-panel/about' element={<Suspense fallback={<Loading/>}><EditAbout/></Suspense>}/>

          <Route path='/admin-panel/clients' element={<Suspense fallback={<Loading/>}><ClientsList/></Suspense>}/>
          
           <Route exact path='/' element={<Suspense fallback={<Loading/>}>
          <Navbar/> 
            <div style={{gap:'26px'}} className='f fc fcenter'>
             <SliderComp/>
            <ServicesComp/>
            <StylistsComp/>
            <MapComp/>
            <Footer/>
            <Up/>
            <BookNow/>
            </div>
          </Suspense>} />
          
            <Route path='/about' element={<Suspense fallback={<Loading/>}>
                <Navbar/>            
              <AboutPage/>
              <Footer/>
              <Up/>
              <BookNow/>
              <Back/>
              </Suspense>} />
              
              <Route exact path='/services' element={<Suspense fallback={<Loading/>}>
                <Navbar/>
                 <ServicesPage/>
              <Up/>
              <Back/>
              <BookNow/>
              <Footer/>
               </Suspense>}/>
              <Route exact path='/services/:id' element={<Suspense fallback={<Loading/>}>
                <Navbar/>
                 <ServicePage/>
              <Footer/>
              <Up/>
              <Back/>
              <BookNow/>
               </Suspense>}/>

            <Route path='/contacts' element={<Suspense fallback={<Loading/>}>
                <Navbar/>            
              <ContactsPage/>
              <Up/>
              <Back/>
              <BookNow/>
              <Footer/>
              </Suspense>} />
              
           <Route exact path='/stylists' element={<Suspense fallback={<Loading/>}>
          <Navbar/> 
            <StylistsPage/>
            <Footer/>
            <Up/>
            <Back/>
            <BookNow/>
          </Suspense>}/>

           <Route exact path='/stylists/:id' element={<Suspense fallback={<Loading/>}>
          <Navbar/> 
            <StylistPage/>
            <Back/>
            <BookNow/>
            <Footer/>
          </Suspense>}/>
          

           <Route exact path='/booknow' element={<Suspense fallback={<Loading/>}>
          <Navbar/> 
            <BookNowPage/>
            <Back/>
            <Footer/>
          </Suspense>}/>

           <Route path='/profile' element={<Suspense fallback={<Loading/>}>
          <Navbar/> 
          <ProfilePage/>
          <Back/>
          <Footer/>
          </Suspense>}/>

           

          
                                    
              <Route path='*' element={<div>Not Found</div>}/>

      </Routes>
      
    </BrowserRouter>
      
  );
}

export default App;

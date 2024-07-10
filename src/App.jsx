import React, { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNavigation from './components/MobileNavigation'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { setBannerData,setImageUrl } from './store/movieoSlice'

const App = () => {

  const dispatch = useDispatch()

  const fetchTrendingdata =async()=>{
    try {
      const response = await axios.get('/trending/all/week')
           dispatch(setBannerData(response.data.results))
    } catch (error) {
      console.log(err,"error")
    }
  }

  const fetchConfiguration = async()=>{
    try {
      const response = await axios.get('/configuration')

      dispatch(setImageUrl(response.data.images.secure_base_url+'original'))
    
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchTrendingdata()
    fetchConfiguration()
  },[])


  return (
    <main className='pb-14 lg:pb-0'>
    <Header/>
     <div className='min-h-[100vh]'>
     <Outlet/>
     </div>
      <Footer/>
      <MobileNavigation/>
    </main>
  )
}

export default App

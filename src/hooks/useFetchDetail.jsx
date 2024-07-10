import axios from "axios"
import { useEffect, useState } from "react"

const useFetchDeatail =(endpoint)=>{
  const [data,setData] =useState([])
  const [loading,setLoading] =useState(false)

  const fetchData = async()=>{
    try {
        setLoading(true)
        const response = await axios.get(endpoint)
        setLoading(false)
        setData(response.data)

    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchData()
  },[endpoint])

  return {data,loading}
}

export default useFetchDeatail;
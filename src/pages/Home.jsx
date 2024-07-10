import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'

import HorizontalScrollCard from '../components/HorizontalScrollCard'

import usefetch from '../hooks/usefetch'

const Home = () => {
  const trendingData = useSelector(state=> state.movieoData.bannerData)
  const {data : nowPlayingData} = usefetch("/movie/now_playing")
  const {data : topRatedData} = usefetch("/movie/top_rated")
  const {data : popularTvShowData} = usefetch("/tv/popular")
  const {data : onTheAirShowData} = usefetch("/tv/on_the_air")
  
  return (
    <div>
      <BannerHome/>
       <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
       <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"}/>
       <HorizontalScrollCard data={trendingData} heading={"Trending"} />
       <HorizontalScrollCard data={popularTvShowData} heading={"Popular Tv Show"} media_type={"tv"}/>
       <HorizontalScrollCard data={onTheAirShowData} heading={"On The Air"} media_type={"tv"}/>
    
    </div>
  )
}

export default Home

import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchDeatail from '../hooks/useFetchDetail'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divider from '../components/Divider'
import usefetch from '../hooks/usefetch'
import HorizontalScrollCard from '../components/HorizontalScrollCard'

const DetailPage = () => {
  const params = useParams()
  const imageURL = useSelector(state => state.movieoData.imageUrl)
  const {data} = useFetchDeatail(`/${params?.explore}/${params?.id}`)
  const {data :castData} = useFetchDeatail(`/${params?.explore}/${params?.id}/credits`)
  const { data:similarData} = usefetch(`/${params?.explore}/${params?.id}/similar`)
  const { data:recomData} = usefetch(`/${params?.explore}/${params?.id}/recommendations`)
  console.log('data',data)

  const duration = (data?.runtime/60)?.toFixed(1).split('.')

  return (
    <div>
      <div className='w-full h-[280px] relative hidden lg:block'>
        <div className='w-full h-full'>
        <img src={imageURL+data?.backdrop_path} alt="" className='h-full w-full object-cover' />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'>

        </div>
          </div>

          <div className='container mx-auto px-7 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
            <div className='lg:-mt-28 mx-auto relative  lg:mx-0 w-fit'>
              <img src={imageURL + data?.poster_path} alt="" className='h-80 w-60 object-cover rounded min-w-60'  />
            </div>

            <div>
              <h2 className='text-2xl lg:text-4xl font-bold'>{data.title || data.name}</h2>
              <p className='text-neutral-400'>{data.tagline}</p>
              <Divider/>
              <div className='flex items-center gap-3'>
                <p>
                 Rating : {Number(data.vote_average).toFixed(1)}+
                </p>
                <span>|</span>
                <p>
                  View : {Number(data.vote_count)}
                </p>
                <span>|</span>
                <p>Duration : {duration[0]}h {duration[1]}m</p>
              </div>
              
              <Divider/>
              <div>
                <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
                <p>{data?.overview}</p>
                <Divider/>
                <div className='flex items-center gap-3 my-3 text-center'>
                  <p> Status : {data?.status}</p>
                  <span>|</span>
                  <p>
                    Release Date : {moment(data?.release_date).format('MMM Do YYYY')}
                  </p>
                  <span>|</span>
                  <p>
                    Revenue : {Number(data?.revenue)}
                  </p>
                </div>

                <Divider/>
              </div>

              <div>
              <p>Director : {castData?.crew?.length > 1 ? castData.crew[1].name : "Director not available"}</p>
              </div>
              <Divider/>
              <h2 className='font-bold text-lg'>Cast:</h2>

              <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-6 justify-center lg:justify-start '>
                {
                  castData?.cast?.filter(el => el?.profile_path).map((starCast)=>{
                    return(
                      <div>
                        <div>
                          <img src={imageURL + starCast?.profile_path} alt="" className='w-24 h-24 object-cover rounded-full' />
                        </div>
                        <p className='font-bold text-center text-sm text-neutral-400 mt-2'>{starCast?.name}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

        <div>
          <HorizontalScrollCard data={similarData} heading={"Similar " + params?.explore} media_type={params?.explore}/>
        </div>
        <div>
          <HorizontalScrollCard data={recomData} heading={"Recommendation " + params?.explore} media_type={params?.explore}/>
        </div>
    </div>
  )
}

export default DetailPage

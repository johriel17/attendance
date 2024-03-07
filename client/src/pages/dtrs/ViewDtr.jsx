import React, {useState, useEffect}from 'react'
import ApiClient from '../../components/Api'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import Spinner from '../../components/Spinner'

const ViewDtr = () => {

  const [dtr, setDtr] = useState({})
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  const api = ApiClient()

  useEffect(() => {

    setLoading(true)
    api.get(`/dtrs/${id}`)
    .then((response) => {
      setDtr(response.data)
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
      console.log(error)
    })

  }, [])

  return (
    <div className="px-10 bg-slate-200 rounded-lg shadow-lg my-10">
      <BackButton destination={'/dtrs'}/>
      <div className="flex justify-center items-center">
          <h3 className="text-2xl my-8 font-extrabold">View Daily Time Record</h3>
      </div>
      {loading ? 

      (
        <Spinner/>
      )
      :
      (
        <div className='flex flex-col'>
          <div className='my-4'>
            <span className='text-xl mr-4 font-bold'>Dtr Number</span>
            <span className='font-semibold'>{dtr.dtrNum}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 font-bold'>Start Date</span>
            <span className='font-semibold'>{new Date(dtr.startDate).toLocaleDateString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 font-bold'>End Date</span>
            <span className='font-semibold'>{new Date(dtr.endDate).toLocaleDateString()}</span>
          </div>
        </div>
      )

      }
    </div>
  )
}

export default ViewDtr

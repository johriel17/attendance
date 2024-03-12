import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
// import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';
import ApiClient from '../../components/Api';
import { useNavigate } from 'react-router-dom';
const AddDtr = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dtrNum, setDtrNum] = useState('')
  const [departments, setDepartments] = useState(null)
  const [department, setDepartment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const api = ApiClient()

  useEffect(() => {

    const fetchDepartments = async () => {
      try{
        const res = await api.get("/departments")
        setDepartment(res.data[0])
        setDepartments(res.data)
      }catch(error){
        console.log(error)
      }
    }

    fetchDepartments()
    
  }, []);

  const handleSaveDtr = async () => {
    const data = {
      dtrNum,
      startDate,
      endDate,
      department,
    }

    try{
      await api.post('/dtrs', data)
      navigate('/dtrs')
    }catch(error){
      setErrors(error.response.data.errors)
    }

  }
  
  return (
    <div className="px-10 bg-slate-200 rounded-lg shadow-lg my-10">
      <BackButton destination={'/dtrs'}/>
      <div className="flex justify-center items-center">
          <h3 className="text-2xl my-8 font-extrabold">Add New Daily Time Record</h3>
      </div>
       
       {/* {loading && <Spinner/>} */}
          
        <form className="w-full mx-auto py-5">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 mb-5">
                <label htmlFor="dtrNo" className="block mb-2 text-sm font-medium text-gray-900">Dtr No. <span className="text-red-500">*</span></label>
                <input type="text" onChange={(e) => {setDtrNum(e.target.value)}} id="dtrNo" className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ${errors.dtrNum ? 'border-red-400' : 'border-gray-300'}`}/>
                {errors.dtrNum && <div className="text-red-600">{errors.dtrNum}</div>}
            </div>
            <div className="w-full md:w-1/2 mb-5">
              <label
              htmlFor="emp"
              className="block mb-2 text-sm font-medium text-gray-900">
              Department
              </label>
              <select
              id="emp"
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ">
              {departments?.map((department) => (
                  <option key={department._id} value={department._id}>{department.name}</option>
              ))

              }
              </select>
              {errors.department && (
              <div className="text-red-600">{errors.department}</div>
              )}
              </div>
            <div className="w-full md:w-1/2 mb-5">
                <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900">Start Date <span className="text-red-500">*</span></label>
                <DatePicker id='start' selected={startDate} onChange={(date) => setStartDate(date)} className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ${errors.startDate   ? 'border-red-400' : 'border-gray-300'}`} />
                {errors.startDate && <div className="text-red-600">{errors.startDate}</div>}
            </div>
            <div className="w-full md:w-1/2 mb-5">
                <label htmlFor="end" className="block mb-2 text-sm font-medium text-gray-900">End Date <span className="text-red-500">*</span></label>
                <DatePicker id="end" selected={endDate} onChange={(date) => setEndDate(date)} className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ${errors.endDate   ? 'border-red-400' : 'border-gray-300'}`} />
                {errors.endDate && <div className="text-red-600">{errors.endDate}</div>}
            </div>
          </div>
          <div className="flex justify-end items-center">
          <button type="button" onClick={handleSaveDtr} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 self-end">Save</button>
          </div>
        </form>

    </div>
  )
}

export default AddDtr
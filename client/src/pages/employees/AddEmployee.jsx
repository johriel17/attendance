import React, { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';
import ApiClient from '../../components/Api';
import { useNavigate } from 'react-router-dom';
const AddEmployee = () => {
  const [employeeNo, setEmployeeNo] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const api = ApiClient()

  const handleSaveEmployee = () => {
    const data = {
      employeeNo,
      firstName,
      middleName,
      lastName,
    }

    setLoading(true)

    api.post('/employees', data)
    .then(() =>{
      setLoading(false)
      navigate('/employees')
    })
    .catch((error) => {
      setLoading(false)
      setErrors(error.response.data.errors)
    })

  }
  
  return (
    <div className="px-10 bg-slate-200 rounded-lg shadow-lg my-10">
      <BackButton destination={'/employees'}/>
      <div className="flex justify-center items-center">
          <h3 className="text-2xl my-8 font-extrabold">Add New Employee</h3>
      </div>
       
       {loading && <Spinner/>}
          
        <form className="w-full mx-auto py-5">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 mb-5">
                <label htmlFor="empNo" className="block mb-2 text-sm font-medium text-gray-900">Employee No. <span className="text-red-500">*</span></label>
                <input type="text" onChange={(e) => {setEmployeeNo(e.target.value)}} id="empNo" className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ${errors.employeeNo ? 'border-red-400' : 'border-gray-300'}`}/>
                {errors.employeeNo && <div className="text-red-600">{errors.employeeNo}</div>}
            </div>
            <div className="w-full md:w-1/2 mb-5">
                <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900">First Name <span className="text-red-500">*</span></label>
                <input type="text" onChange={(e) => {setFirstName(e.target.value)}} id="fname" className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ${errors.firstName ? 'border-red-400' : 'border-gray-300'}`}/>
                {errors.firstName && <div className="text-red-600">{errors.firstName}</div>}
            </div>
            <div className="w-full md:w-1/2 mb-5">
                <label htmlFor="mname" className="block mb-2 text-sm font-medium text-gray-900">Middle Name</label>
                <input type="text" onChange={(e) => {setMiddleName(e.target.value)}} id="mname" className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ${errors.middleName ? 'border-red-400' : 'border-gray-300'}`}/>
                {errors.middleName && <div className="text-red-600">{errors.middleName}</div>}
            </div>
            <div className="w-full md:w-1/2 mb-5">
                <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900">Last Name <span className="text-red-500">*</span></label>
                <input type="text" onChange={(e) => {setLastName(e.target.value)}} id="lname" className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ${errors.lastName ? 'border-red-400' : 'border-gray-300'}`}/>
                {errors.lastName && <div className="text-red-600">{errors.lastName}</div>}
            </div>
          </div>
          <div className="flex justify-end items-center">
          <button type="button" onClick={handleSaveEmployee} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 self-end">Save</button>
          </div>
        </form>

    </div>
  )
}

export default AddEmployee
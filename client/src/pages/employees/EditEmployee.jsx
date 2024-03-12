import React, { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import BackButton from '../../components/BackButton';
import ApiClient from '../../components/Api';
import { useNavigate, useParams } from 'react-router-dom';
const EditEmployee = () => {
  const [employeeNo, setEmployeeNo] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [departments, setDepartments] = useState(null)
  const [department, setDepartment] = useState('')
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const {id} = useParams()
  const api = ApiClient()

  useEffect(() => {

    const fetchDepartments = async () => {
      try{
        const res = await api.get("/departments")
        setDepartments(res.data)
      }catch(error){
        console.log(error)
      }
    }

    const fetchData = async () => {
      try{
        const res = await api.get(`/employees/${id}`)
        setEmployeeNo(res.data.employeeNo)
        setFirstName(res.data.firstName)
        setMiddleName(res.data.middleName)
        setLastName(res.data.lastName)
        setDepartment(res.data.department ? res.data.department._id : '')
      }catch(error){
        console.log(error)
      }
      
    }

    
    fetchDepartments()
    fetchData()
    
  },[])

  const handleUpdateEmployee = async() => {
    const data = {
      employeeNo,
      firstName,
      middleName,
      lastName,
      department,
    }

    try{
      await api.put(`/employees/${id}`, data)
      navigate('/employees')
    }catch(error){
      setErrors(error.response.data.errors)
    }

  }
  
  return (
    <div className="px-10 bg-slate-200 rounded-lg shadow-lg my-10">
      <BackButton destination={'/employees'}/>
      <div className="flex justify-center items-center">
          <h3 className="text-2xl my-8 font-extrabold">Edit Employee</h3>
      </div>
       
       {/* {loading && <Spinner/>} */}
          
        <form className="w-full mx-auto py-5">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 mb-5">
                <label htmlFor="empNo" className="block mb-2 text-sm font-medium text-gray-900">Employee No. <span className="text-red-500">*</span></label>
                <input type="text" value={employeeNo} onChange={(e) => {setEmployeeNo(e.target.value)}} id="empNo" className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ${errors.employeeNo ? 'border-red-400' : 'border-gray-300'}`}/>
                {errors.employeeNo && <div className="text-red-600">{errors.employeeNo}</div>}
            </div>
            <div className="w-full md:w-1/2 mb-5">
                <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900">First Name <span className="text-red-500">*</span></label>
                <input type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} id="fname" className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ${errors.firstName ? 'border-red-400' : 'border-gray-300'}`}/>
                {errors.firstName && <div className="text-red-600">{errors.firstName}</div>}
            </div>
            <div className="w-full md:w-1/2 mb-5">
                <label htmlFor="mname" className="block mb-2 text-sm font-medium text-gray-900">Middle Name</label>
                <input type="text" value={middleName} onChange={(e) => {setMiddleName(e.target.value)}} id="mname" className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ${errors.middleName ? 'border-red-400' : 'border-gray-300'}`}/>
                {errors.middleName && <div className="text-red-600">{errors.middleName}</div>}
            </div>
            <div className="w-full md:w-1/2 mb-5">
                <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900">Last Name <span className="text-red-500">*</span></label>
                <input type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}} id="lname" className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ${errors.lastName ? 'border-red-400' : 'border-gray-300'}`}/>
                {errors.lastName && <div className="text-red-600">{errors.lastName}</div>}
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
                value={department}
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-11/12 p-2.5 ">
                {departments?.map((department) => (
                    <option key={department._id} value={department._id}>{department.name}</option>
                ))

                }
                </select>
                {errors.userType && (
                <div className="text-red-600">{errors.department}</div>
                )}
                </div>
          </div>
          <div className="flex justify-end items-center">
          <button type="button" onClick={handleUpdateEmployee} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 self-end">Update</button>
          </div>
        </form>

    </div>
  )
}

export default EditEmployee
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import  Home  from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/auth/Login'
import { useAuthContext } from './hooks/useAuthContext'
//dtr pages
import IndexDtr from './pages/dtrs/IndexDtr'
import EditDtr from './pages/dtrs/EditDtr'
import AddDtr from './pages/dtrs/AddDtr'
import ViewDtr from './pages/dtrs/ViewDtr'
//emplooyee pages
import IndexEmployee from './pages/employees/IndexEmployee'
import AddEmployee from './pages/employees/AddEmployee'
import EditEmployee from './pages/employees/EditEmployee'
import ViewEmployee from './pages/employees/ViewEmployee'
//users pages
import IndexUser from './pages/users/IndexUser'
import AddUser from './pages/users/AddUser'
// import EditUser from './pages/users/EditUser'
// import ViewUser from './pages/users/ViewUser'

function App() {
  // const [loggedIn, setLoggedIn] = useState(false)
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Navbar />}
        <div className="pages max-w-screen-xl mx-auto">
          <Routes>

            {/* <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <Login setLoggedIn={setLoggedIn} />} /> */}
            <Route path='/' element={user? <Home /> : <Navigate to='/login' />} />
            <Route path="/login" element={!user? <Login /> : <Navigate to='/' />} />

            {/* dtr routes */}
            <Route path='/dtrs' element={user? <IndexDtr /> : <Navigate to='/login' />} />
            <Route path='/dtrs/add' element={user? <AddDtr /> : <Navigate to='/login' />} />
            <Route path='/dtrs/edit/:id' element={user? <EditDtr /> : <Navigate to='/login' />} />
            <Route path='/dtrs/view/:id' element={user? <ViewDtr /> : <Navigate to='/login' />} />
            
            {/* employee routes */}
            <Route path='/employees' element={user? <IndexEmployee /> : <Navigate to='/login' />} />
            <Route path='/employees/add' element={user? <AddEmployee /> : <Navigate to='/login' />} />
            <Route path='/employees/edit/:id' element={user? <EditEmployee /> : <Navigate to='/login' />} />
            <Route path='/employees/view/:id' element={user? <ViewEmployee /> : <Navigate to='/login' />} />

            {/* user routes */}
            <Route path='/users' element={user? <IndexUser /> : <Navigate to='/login' />} />
            <Route path='/users/add' element={user? <AddUser /> : <Navigate to='/login' />} />
            {/* <Route path='/users/edit/:id' element={user? <EditEmployee /> : <Navigate to='/login' />} />
            <Route path='/users/view/:id' element={user? <ViewEmployee /> : <Navigate to='/login' />} /> */}
            

          </Routes>
        </div>
      </BrowserRouter>
    </div>

  )
}

export default App
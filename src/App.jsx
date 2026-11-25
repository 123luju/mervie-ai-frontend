import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function Protected({children}){ const {user}=useAuth(); return user?children:<Navigate to='/login' replace/> }
export default function App(){
  return <AuthProvider>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Protected><Dashboard/></Protected>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  </AuthProvider>
}

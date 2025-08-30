import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Users from './pages/Users/Users'
import UserDetails from './pages/UserDetails/UserDetails'
import AppLayout from './components/layout/AppLayout/AppLayout'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />}>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
export default App

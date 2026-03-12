import { Navigate, Outlet } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

const PrivateRoute = () => {
    const { user } = useAppStore()
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
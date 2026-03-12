import { Navigate, Outlet } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

const AdminRoute = () => {
    const { user, hasRole } = useAppStore()
    
    if (!user) return <Navigate to="/login" />
    return hasRole('admin') ? <Outlet /> : <Navigate to="/unauthorized" />
}
export default AdminRoute
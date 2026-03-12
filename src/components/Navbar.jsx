import { Link, useNavigate } from 'react-router-dom'
import { Film, LogOut, User, Home, Film as FilmIcon, History, Shield } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const Navbar = () => {
    const navigate = useNavigate()
    const { user, logout, hasRole } = useAppStore()
    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <nav className="bg-netflix-dark border-b border-gray-800 sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <Film className="w-8 h-8 text-netflix-red" />
                        <span className="text-xl font-bold text-white hidden sm:block">StreamFlix</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                            <Home className="w-4 h-4" />
                            <span>Inicio</span>
                        </Link>
                        
                        {user && (
                            <>
                                <Link to="/movies" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                                    <FilmIcon className="w-4 h-4" />
                                    <span>Películas</span>
                                </Link>
                                <Link to="/my-rentals" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                                    <History className="w-4 h-4" />
                                    <span>Mis Rentas</span>
                                </Link>
                            </>
                        )}
                        {hasRole('admin') && (
                            <Link to="/panel-admin" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                                <Shield className="w-4 h-4" />
                                <span>Panel Admin</span>
                            </Link>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                                    <User className="w-5 h-5" />
                                    <span className="hidden sm:block">{user.name}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar
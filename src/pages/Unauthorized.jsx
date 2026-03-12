import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'

const Unauthorized = () => {
    return (
        <div className="text-center py-20">
            <ShieldAlert className="w-20 h-20 text-netflix-red mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4 text-white">Acceso no autorizado</h1>
            <p className="text-gray-400 mb-8">
                No tienes permisos para acceder a esta página
            </p>
            <Link
                to="/"
                className="bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors inline-block">
            Volver al inicio
            </Link>
        </div>
    )
}
export default Unauthorized